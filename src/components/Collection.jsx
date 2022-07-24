import React, {useContext, useEffect, useState} from 'react';
import { NavLink, useParams, useSearchParams } from 'react-router-dom';

import LinearProgress from '@mui/material/LinearProgress';

import '../styles/Collection.scss';

import ProductsContext from '../contexts/ProductsContext';
import Product from './Product';
import NotExistPage from './NotExistPage';

import {getProducts} from '../helper/getProducts'
import {getStyles} from '../helper/getStyles'

const Collection = () => {

  const {products} = useContext(ProductsContext)
  const [selection, setSelection] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const category = useParams().id;

  const style = searchParams.get("searchedStyle");
  
  useEffect(() => {
    setSelection(prev => getProducts(products, category, style))
    // setValidCat(validCategory(productSpec.categories, category))
  }, [products, category, style])

  const productsLinkArray = selection && selection.map(product => {
    return (
      <Product key={product.id} product={product} />
    )
  }) 

  const stylesButtonsArray = getStyles(getProducts(products, category)).map((style, index) => {
    return (
      <button key={index} onClick={()=>setSearchParams({searchedStyle : style})} >{style}</button>
    )
  })
  
  // console.log('collection⭕️', products);
  // console.log('selection⭕️⭕️', selection);
  console.log(getStyles(selection));
  console.log('search ⭕️',style);

  return (
    <div>
      {stylesButtonsArray}

      {productsLinkArray}
      { ( products && selection.length === 0 ) &&
        <NotExistPage />
      }

      { ( !products || products.length === 0 ) &&
          <div className="page-loading">
            <LinearProgress color="secondary" />
          </div>
      }
    </div>
  )
}

export default Collection