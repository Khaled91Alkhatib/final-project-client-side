//  This componet is for product that shows in list of products
import React, {useContext, useEffect, useState} from 'react';
import { NavLink, useParams, useSearchParams } from 'react-router-dom';

import '../styles/Product.scss';

const Product = (props) => {
  
  console.log('🥾', props.product);
  return (

    <div className='item'>
      <NavLink  to={`${props.product.id}`}>

      <p>
        <img src={`${props.product.image1}`} alt="pro" width="200" height="200"/>
      </p>
      <span>{props.product.name}</span>
      <br />
      <br />
      <span>${props.product.price / 100}</span>
      </NavLink>
    </div>
  );
};

export default Product;