import React, { useContext, useEffect, useState } from "react";
import { NavLink, useParams, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import axios from "axios";

import ProductsContext from "../../contexts/ProductsContext";
import Image from "./Image";
import Colors from "./Colors";
import Sizes from "./Sizes";

import "./SingleProduct.scss";
import CartContext from "../../contexts/CartContext";

const SingleProduct = (props) => {
  const [id, setId] = useState(Number(useParams().id));
  const [product, setProduct] = useState({});
  const [availableSizes, setAvailableSizes] = useState([]);
  const [images, setImages] = useState([]);
  const [colorsFamily, setColorsFamily] = useState([]);
  const [selectedSize, setSelectedSize] = useState({});
  const [counter, setCounter] = useState(1);

  const { products } = useContext(ProductsContext);
  const { setCart, cart } = useContext(CartContext);

  useEffect(() => {
    if (products) {
      getProductById(id);
    }
  }, []);

  useEffect(() => {
    if (product.sku) {
      // find and set colorsFamily
      // specify which product's color is selected
      const productFamily = product.sku.slice(0, 4);
      const allColors = products
        .filter((product) => product.sku.slice(0, 4) === productFamily)
        .map((row) => {
          return row.id === product.id
            ? { ...row, selected: true }
            : { ...row, selected: false };
        });
      setColorsFamily(allColors);

      // make images array ready
      const imagesArray = [];
      if (product.image1) imagesArray.push(product.image1);
      if (product.image2) imagesArray.push(product.image2);
      if (product.image3) imagesArray.push(product.image3);
      setImages(imagesArray);

      // update the address bar when product has been changed
      window.history.replaceState(
        "",
        "",
        `/collection/${product.category}/${id}`
      );

      // reset selected size when product has been changed
      setSelectedSize({});
    }
  }, [products, product, id]);

  const getProductById = (id) => {
    axios.get(`http://localhost:8100/api/products/${id}`).then((response) => {
      // handle success
      setProduct((prev) => response.data.product);
      setAvailableSizes((prev) => response.data.availableSizes);
    });
  };

  // image click left
  const rotateLeft = () => {
    const singleImage = images.shift();
    setImages((prev) => [...prev, singleImage]);
  };

  // image click right
  const rotateRight = () => {
    const singleImag = images.pop();
    setImages((prev) => [singleImag, ...prev]);
  };

  const changeColorHandler = (pro) => {
    setId(pro.id);
    getProductById(pro.id);
  };

  const onSelectSize = (data) => {
    setSelectedSize((prev) => data);
  };

  const onPlusClick = () => {
    setCounter(counter + 1);
  };
  const onMinusClick = () => {
    if (counter > 1) {
      setCounter(counter - 1);
    }
  };


  const addToCart = () => {
    // console.log("ADD");
    product.size = selectedSize.size;
    product.quantity = counter;
    const existingObjectInCart = cart.find((item) => {
      return (item.sku === product.sku && selectedSize.size === item.size)
    })
    if (!existingObjectInCart){
      setCart([...cart, product]);
    } else {
      const foundItemInCart = cart.findIndex((item) => {
        return item.sku === existingObjectInCart.sku && item.size === existingObjectInCart.size
      })
      const updatedItem = {...cart[foundItemInCart], quantity: cart[foundItemInCart].quantity += counter}
      const updatedCart = [...cart]
      updatedCart[foundItemInCart] = updatedItem
      setCart(updatedCart)

      console.log('found', foundItemInCart);
      console.log("exists", existingObjectInCart)
    }
  };

  // console.log("counter", counter)
  console.log("👟", product); // 🚨🚨🚨
  // console.log('⚫️⚪️',colorsFamily);    // 🚨🚨🚨
  // console.log('🗾',images);            // 🚨🚨🚨
  console.log('◻️◾️',availableSizes);   // 🚨🚨🚨
  console.log("💢", selectedSize); // 🚨🚨🚨

  return (
    <div className="single-product">
      <div className="single-box">
        <Image images={images} onLeft={rotateLeft} onRight={rotateRight} />
        <div className="item-details">
          <h2>SKU #{product.sku} </h2>
          <span>{product.name}</span>
          <br />
          <span>${(product.price / 100).toFixed(2)}</span>
          <br />
          <Sizes
            availableSizes={availableSizes}
            onSelectSize={onSelectSize}
            select={selectedSize} /*onAdd={onAdd}*/
          />
          <div className="plus-counter-minus">
            <button className="plus-minus" onClick={onMinusClick}><FontAwesomeIcon icon="fa-solid fa-circle-minus" /></button>
            <div>{counter}</div>
            <button className="plus-minus" onClick={onPlusClick}><FontAwesomeIcon icon="fa-solid fa-circle-plus" /></button>
          </div>
          <button disabled={!selectedSize.id} onClick={addToCart}>
            Add To Cart
          </button>
          <br />
          <span>color : {product.color}</span>
          <Colors colorsFamily={colorsFamily} onColor={changeColorHandler} />
          <span>{product.description}</span>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
