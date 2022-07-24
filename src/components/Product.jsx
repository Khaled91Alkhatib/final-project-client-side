//  This componet is for product that shows in list of products
import React, {useContext, useEffect, useState} from 'react';
import { NavLink, useParams, useSearchParams } from 'react-router-dom';

import '../styles/Product.scss';

const Product = (props) => {
  
  console.log('🥾', props.product);
  return (

    <div className='product'>
      <NavLink  to={`${props.product.id}`}>

      <p>
        <img className='product-image' src={`${props.product.image1}`} alt="pro" width="300" height="300"/>
      </p>
      <div className='name-and-price'>
        <div className='name-only'>{props.product.name}</div>
        <div className='price-only'>CAD {props.product.price / 100}</div>
      </div>
      </NavLink>
    </div>
  );
};

export default Product;