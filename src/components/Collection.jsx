import React, { useContext, useEffect, useState } from "react";
import { NavLink, useParams, useSearchParams } from "react-router-dom";

import LinearProgress from "@mui/material/LinearProgress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../styles/Collection.scss";

import ProductsContext from "../contexts/ProductsContext";
import Product from "./Product";
import NotExistPage from "./NotExistPage";

import { getProducts } from "../helper/getProducts";
import { getStyles } from "../helper/getStyles";
import { getColors } from "../helper/getColors";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Collection = () => {

  const [selection, setSelection] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const category = useParams().id;
  const { products } = useContext(ProductsContext);

  const style = searchParams.get("searchedStyle");
  const color = searchParams.get("searchedColor");

  useEffect(() => {
    setSelection((prev) => getProducts(products, category, style, color));
  }, [products, category, style, color]);

  const productsLinkArray =
    selection && selection.map((product) => {
      // pass colors family of product to it's component.
      const colorsFamily = products.filter(row => row.sku.slice(0,4) === product.sku.slice(0,4))
      return <Product key={product.id} product={product} colorOptions={colorsFamily}/>;
    });

  // Filter by Style
  const stylesButtonsArray = getStyles(getProducts(products, category)).map(
    (style, index) => {
      return (
        <button
          className="style-buttons"
          key={index}
          onClick={() => {
            searchParams.set("searchedStyle", style)
            setSearchParams(searchParams)
          }}
        >
          {style}
        </button>
      );
    }
  );

  // Filter by Color
  const colorsButtonsArray = getColors(getProducts(products, category)).map(
    (color, index) => {
      return (
        <MenuItem value={color} key={index}>
          <button
            className={`btn2 ${color.toLowerCase()}`} 
            key={index}
            onClick={() => {
              searchParams.set("searchedColor", color)
              setSearchParams(searchParams)
            }}
          />
        </MenuItem>
      );
    }
  );

  return (
    <div>
      <div className="filters">
        <div className="filter-to-buttons">
          <div>Filter:</div>
          <div>
            <FontAwesomeIcon icon="fa-solid fa-filter" />
          </div>
        </div>
        <div className="buttons">{stylesButtonsArray}</div>
      </div>

      {/* set color filter */}
        <div>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 10 }}>
            <Select value="" displayEmpty>
              <MenuItem value=""><em>Color</em></MenuItem>
              {colorsButtonsArray}
            </Select>
          </FormControl>
        </div>

    {/* clear style filter */}
      {style && <button
        onClick={() => {searchParams.delete("searchedStyle")
        setSearchParams(searchParams)}} >{style} <FontAwesomeIcon icon="fa-solid fa-xmark" /></button>}

    {/* clear color filter */}
      {color && <button
        onClick={() => {searchParams.delete("searchedColor")
        setSearchParams(searchParams)}}>{color} <FontAwesomeIcon icon="fa-solid fa-xmark" /></button>}

      <div className="products">{productsLinkArray}</div>

      {products && selection.length === 0 && <NotExistPage />}

      {(!products || products.length === 0) && (
        <div className="page-loading">
          <LinearProgress color="secondary" />
        </div>
      )}
    </div>
  );
};

export default Collection;
