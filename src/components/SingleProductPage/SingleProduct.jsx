import React, {useContext, useEffect, useState} from 'react';
import { NavLink, useParams, useSearchParams } from 'react-router-dom';

import axios from 'axios';

import ProductsContext from '../../contexts/ProductsContext';
import Image from './Image';
import Colors from './Colors';
import Sizes from './Sizes';

import './SingleProduct.scss';

const SingleProduct = (props) => {

  const [id, setId] = useState(Number(useParams().id));
  const [product, setProduct] = useState({});
  const [availableSizes, setAvailableSizes] = useState([]);
  const [images, setImages] = useState([]);
  const [colorsFamily, setColorsFamily] = useState([]);
  const [selectedSize, setSelectedSize] = useState({});
  
  const {products} = useContext(ProductsContext);

  useEffect(() => {
    if (products) {
      getProductById(id);
    }
  },[]);

  useEffect(() => {
    if (product.sku) {
      // find and set colorsFamily
      // specify which product's color is selected
      const productFamily = product.sku.slice(0, 4);
      const allColors = products.filter(product => product.sku.slice(0,4) === productFamily).map(row => {
        return (row.id === product.id) ? {...row, selected: true} : {...row, selected: false}
      });
      setColorsFamily(allColors);

      // make images array ready
      const imagesArray = [];
      if (product.image1) imagesArray.push(product.image1);
      if (product.image2) imagesArray.push(product.image2);
      if (product.image3) imagesArray.push(product.image3);
      setImages(imagesArray);
      
      // update the address bar when product has been changed
      window.history.replaceState('', '',`/collection/${product.category}/${id}`);

      // reset selected size when product has been changed
      setSelectedSize({});
    }
  },[products, product, id]);


  const getProductById = (id) => {
    axios.get(`http://localhost:8100/api/products/${id}`)
    .then((response) => {
      // handle success
      setProduct(prev => response.data.product);
      setAvailableSizes(prev => (response.data.availableSizes));
    }) 
  };

  // image click left
  const rotateLeft = () => {
    const singleImage = images.shift();
    setImages(prev => [...prev, singleImage] );
  };

  // image click right
  const rotateRight = () => {
    const singleImag = images.pop();
    setImages(prev => [singleImag, ...prev] );
  };

  const changeColorHandler = (id) => {
    setId(id);
    getProductById(id);
  };

  const onSelectSize = (data) => {
    setSelectedSize(prev => (data));
  };

  const onAdd = () => {
    if (selectedSize.id)
      console.log('ADD');
      // addToCart([{barcode: selectedSize.barcode, id: selectedSize.id, qty: 1, name: product.name, color: product.color, price: product.price, img: product.image1, size: selectedSize.size}])
  }

  // console.log('👟',product);           // 🚨🚨🚨
  // console.log('⚫️⚪️',colorsFamily);    // 🚨🚨🚨
  // console.log('🗾',images);            // 🚨🚨🚨
  // console.log('◻️◾️',availableSizes);   // 🚨🚨🚨
  // console.log('💢',selectedSize);     // 🚨🚨🚨

  return (
    <div className='single-product'>
      <div className='single-box'>
        <Image images={images} onLeft={rotateLeft} onRight={rotateRight}/>
        <div className='item-details'>
          <h2>SKU #{product.sku} </h2>
          <span>{product.name}</span>
          <br />
          <span>${(product.price / 100).toFixed(2)}</span>
          <br />
          <Sizes availableSizes={availableSizes} onSelectSize={onSelectSize} select={selectedSize} onAdd={onAdd}/>
          <br />
          <span>color : {product.color}</span>
          <Colors colorsFamily={colorsFamily} onColor={changeColorHandler}/>
          <span>{product.description}</span>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;