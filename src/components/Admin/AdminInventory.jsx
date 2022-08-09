import React, {useEffect, useState, useContext, useRef} from 'react';
import { Route, Routes, useSearchParams, useLocation } from 'react-router-dom';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LinearProgress from "@mui/material/LinearProgress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ProductsContext from "../../contexts/ProductsContext";
import {findProductByBarcode} from '../../helper/findProductByBarcode';
import InventoryList from './InventoryList';

import './AdminInventory.scss';

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';

const AdminInventory = ({inventoryData, onAdd, onGetInventory, setInventoryData}) => {

  const { user } = useContext(ProductsContext);

  const [barcode, setBarcode] = useState("");
  const [product, setProduct] = useState({});
  const [newQty, setNewQty] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // console.log(product);
  // console.log(inventoryData);

  useEffect(() => {
    onGetInventory();
  }, [])

  useEffect(() => {
    setInventoryData(pre => pre.map(row => {
      return row.barcode === product.barcode ? ({...row, select: true}) : ({...row, select: false});
    }))
  }, [product])

  function onSearch(event) {
    event.preventDefault();
    const productFound = findProductByBarcode(inventoryData, barcode);
    if (productFound) {
      setProduct(productFound);
    } else {
      toast("Barcode not exist", {type: 'error'})
    }
  };

  function onResetSearch(event) {
    setBarcode("");
    setProduct({});
  };

  const handleChange = (event) => {
    setNewQty(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const regex =  /^[1-9]\d*$/ ;
    if (!regex.test(newQty)) {
      setErrorMsg("*Input valid quantity")
    } else {
      setErrorMsg("");
      setProduct({});
      onAdd(barcode, newQty);
      setNewQty("");
      setBarcode("");
    };
  };

  const onClickHandler = (barcode) => {
    setProduct(findProductByBarcode(inventoryData, barcode))
    setBarcode(barcode);
  }

  return (
    <div className='admin-inventory-page-main'>
      {user.name && 
        <div className='admin-inventory-page'>
          <h3>Enter product's barcode or select by clicking on it's row to Update Inventory!</h3>
          <div className='search-barcode-set-qty'>
            <div className='search-barcode'>
              <form onSubmit={onSearch} className='search-barcode-form'>
                <div className='barcode-input'>
                  <TextField
                    required
                    label="Barcode"
                    id="barcode"
                    name="barcode"
                    value={barcode.trim()}
                    onChange={(event) => setBarcode(event.target.value)}
                    variant="standard"
                    disabled={Object.keys(product).length !== 0}
                    margin="normal"
                    sx={{ m: 0, width: '18ch' }}
                  />
                </div>
                <button type="submit" className='btn-admin-page'><FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /> Search</button>
              </form>
              <div>
                <button onClick={onResetSearch} className='btn-admin-page'>Reset</button>
              </div>
            </div>
            {product.barcode && 
              <form onSubmit={handleSubmit} >
                <div className='set-qty-form'>
                  <TextField 
                    required
                    label="quantity"
                    id="quantity"
                    type="number"
                    min="1"
                    name="quantity"
                    value={newQty}
                    onChange={handleChange}
                    variant="standard"
                    margin="normal"
                    sx={{ m: 0, width: '18ch' }}
                  />
                  {errorMsg &&
                  <FormHelperText style={{color: 'red'}}>{errorMsg}</FormHelperText>}
                  <button type="submit" className='btn-admin-page btn-add-qty'> Add To Quantity </button>
                </div>
              </form>
            }
          </div>
          { inventoryData.length === 0 ?
            <div className="page-loading">
              <LinearProgress color="secondary" />
            </div> :
            <InventoryList inventoryData={inventoryData} product={product} onClickHandler={onClickHandler}/>
          }
        </div>
      }
    </div>
  );
};

export default AdminInventory;