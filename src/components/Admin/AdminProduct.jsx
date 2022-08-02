import React, {useEffect, useState, useContext} from 'react';
import { Route, Routes, useSearchParams, useLocation } from 'react-router-dom';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ProductsContext from "../../contexts/ProductsContext";
import { findProductBySku } from '../../helper/findProductBySku';
import LoadProductForEdit from './LoadProductForEdit';
import LoadAddForm from './LoadAddForm';

import './AdminProduct.scss';

// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';

const AdminProduct = (props) => {

  const { user, products, productSpec } = useContext(ProductsContext);
  const [sku, setSku] = useState("");
  const [product, setProduct] = useState({});
  const [availableSizes, setAvailableSizes] = useState([]);

  function onSearch(event) {
    event.preventDefault();
    const productFound = findProductBySku(products, sku);
    if (productFound) {
      axios.get(`http://localhost:8100/api/products/${productFound.id}`).then((response) => {
        setProduct((prev) => response.data.product);
        setAvailableSizes((prev) => response.data.availableSizes);
      });
      toast("Item found, you can start editing.", {type: 'success'})
      } else {
      setProduct({sku});
      toast("New Product, Start Inserting Data", {type: 'info'})
    }
  };

  function onResetSearch(event) {
    setSku("");
    setProduct({});
    setAvailableSizes([])
  };

  console.log('SKU: ', sku);
  console.log('Product: ', product);
  console.log('Available: ', availableSizes);

  return (
    <div className='admin-product-page-main'>
      <ToastContainer />
      {
        user.name && 
        <div className='admin-product-page'>
          <h3>Input SKU in order to Edit or Add new product!</h3>
          <div className='search-sku'>
            <form onSubmit={onSearch} className='search-sku-form'>
              <div>
                <FormControl className='input-feild'>
                  <div className='input-feild'>
                    <TextField
                      required
                      label="SKU"
                      id="sku"
                      name="sku"
                      value={sku}
                      onChange={(event) => setSku(event.target.value)}
                      variant="standard"
                      disabled={Object.keys(product).length !== 0}
                    />
                  </div>
                </FormControl>
              </div>
              <button type="submit" className='button-edit-page'><FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /> Search</button>
            </form>
            <div>
              <button onClick={onResetSearch} className='button-edit-page'>Reset</button>
            </div>
          </div>
          { product.sku && !product.name &&  <LoadAddForm onSubmit={props.onAdd} onReset={onResetSearch} sku={sku}/>}
          { product.name && <LoadProductForEdit product={product} onSubmit={props.onEdit} onReset={onResetSearch} availableSizes={availableSizes}/>}
        </div>
      }
    </div>
  );
};

export default AdminProduct;