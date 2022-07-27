import React, { useContext, useEffect, useState } from "react";
import { NavLink, useParams, useSearchParams } from "react-router-dom";

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
  const [description, setDescription] = useState([]);

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

      const descriptionArray = product.description
        .split("\n")
        .map((line, index) => {
          return <li key={index}>{line}</li>;
        });
      setDescription(descriptionArray);

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

  const addToCart = () => {
    // console.log("ADD");
    product.size = selectedSize.size;
    product.quantity = 1;
    product.availability = selectedSize.quantity;
    let cartItem = localStorage.getItem("cart-info");
    let cartObject = cartItem ? JSON.parse(cartItem) : [];
    console.log("cartItem", cartItem);
    console.log("cartObject", cartObject);
    const existingObjectInCart = cartObject.find((item) => {
      return item.sku === product.sku && selectedSize.size === item.size;
    });
    // console.log("exists", existingObjectInCart);
    if (!existingObjectInCart) {
      setCart([...cartObject, product]); // you can use prev here as well and spread it then add product
      localStorage.setItem(
        "cart-info",
        JSON.stringify([...cartObject, product])
      );
    } else {
      const foundItemInCart = cartObject.findIndex((item) => {
        return (
          item.sku === existingObjectInCart.sku &&
          item.size === existingObjectInCart.size
        );
      });
      const updatedItem = {
        ...cartObject[foundItemInCart],
        quantity: (cart[foundItemInCart].quantity += 1),
      };
      const updatedCart = [...cartObject];
      updatedCart[foundItemInCart] = updatedItem;
      setCart(updatedCart);
      localStorage.setItem("cart-info", JSON.stringify(updatedCart));

      // console.log("found", foundItemInCart);
    }
  };

  // console.log("counter", counter)
  console.log("👟", product); // 🚨🚨🚨
  // console.log('⚫️⚪️',colorsFamily);    // 🚨🚨🚨
  // console.log('🗾',images);            // 🚨🚨🚨
  console.log("◻️◾️", availableSizes); // 🚨🚨🚨
  console.log("💢", selectedSize); // 🚨🚨🚨

  return (
    <div className="single-product">
      <div className="single-box">
        <Image
          className="product-image"
          images={images}
          onLeft={rotateLeft}
          onRight={rotateRight}
        />
        <div className="item-details">
          <span className="product-name">{product.name}</span>
          <div>SKU #{product.sku} </div>
          <br />
          <span className="product-price">
            ${(product.price / 100).toFixed(2)}
          </span>
          <br />
          <br />
          <div className="product-color">
            <span>Color: {product.color}</span>
            <Colors colorsFamily={colorsFamily} onColor={changeColorHandler} />
          </div>
          <br />
          <br />
          <div className="product-size-title">Size:</div>
          <Sizes
            availableSizes={availableSizes}
            onSelectSize={onSelectSize}
            select={selectedSize} /*onAdd={onAdd}*/
          />
          <button
            className="add-to-cart"
            disabled={!selectedSize.id}
            onClick={addToCart}
          >
            Add To Cart
          </button>
          <br />
          {/* <span>{product.description}</span> */}
          <div>
            <ul className="list">
              <span className="Desc-title">DESCRIPTION</span>
              <br />
              <br />
              {description}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
