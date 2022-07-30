import React, {useEffect, useState, useContext} from 'react';
import { Route, Routes, useSearchParams, useLocation } from 'react-router-dom';

import ProductsContext from "../../contexts/ProductsContext";

import './AdminOrders.scss';

const AdminOrders = (props) => {

  const { user } = useContext(ProductsContext);

  return (
    <div className='admin-orders-page'>
      {user.name && 
      <h2>Admin Orders</h2>}
    </div>
  );
};

export default AdminOrders;