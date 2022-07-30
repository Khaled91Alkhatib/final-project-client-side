import React, {useEffect, useState, useContext} from 'react';
import { Route, Routes, useSearchParams, useLocation } from 'react-router-dom';

import ProductsContext from "../../contexts/ProductsContext";

import './AdminProduct.scss';

const AdminProduct = (props) => {

  const { user } = useContext(ProductsContext);

  return (
    <div className='admin-product-page'>
      {user.name && 
      <h2>Admin Product</h2>}
    </div>
  );
};

export default AdminProduct;