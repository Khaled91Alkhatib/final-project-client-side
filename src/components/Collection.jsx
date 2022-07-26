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


const Collection = () => {

  const [selection, setSelection] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const category = useParams().id;
  const { products } = useContext(ProductsContext);

  const style = searchParams.get("searchedStyle");

  useEffect(() => {
    setSelection((prev) => getProducts(products, category, style));
  }, [products, category, style]);

  const productsLinkArray =
    selection && selection.map((product) => {
      // pass colors family of product to it's component.
      const colorsFamily = products.filter(row => row.sku.slice(0,4) === product.sku.slice(0,4))
      return <Product key={product.id} product={product} colorOptions={colorsFamily}/>;
    });

  const stylesButtonsArray = getStyles(getProducts(products, category)).map(
    (style, index) => {
      return (
        <button
          className="style-buttons"
          key={index}
          onClick={() => setSearchParams({ searchedStyle: style })}
        >
          {style}
        </button>
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
