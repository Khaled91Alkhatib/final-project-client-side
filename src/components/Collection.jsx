import React, {useContext, useEffect, useState} from 'react';
import { NavLink, useParams, useSearchParams } from 'react-router-dom';

import ProductsContext from '../contexts/ProductsContext';
import Product from './Product';

import {getProducts} from '../helper/getProducts'

const Collection = () => {

  const {products} = useContext(ProductsContext)
  const [selection, setSelection] = useState([]);
  const category = useParams().id;

  
  useEffect(() => {
    setSelection(prev => getProducts(products, category))
    // setValidCat(validCategory(productSpec.categories, category))
  }, [products, category])

  const productsLinkArray = selection && selection.map(product => {

    return (
      <Product key={product.id} product={product} />
    )
  }) 
  
  console.log('⭕️', products, category);
  console.log('⭕️⭕️', selection);

  return (
    <div>
      <h1>Collection</h1>
      {productsLinkArray}
    </div>
  )
}

export default Collection