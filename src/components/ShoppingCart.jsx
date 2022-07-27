import React, { useContext, useEffect, useState } from "react";
import CartContext from "../contexts/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./ShoppingCart.scss";

const ShoppingCart = (props) => {
  const { cart, setCart } = useContext(CartContext);
  console.log("khaled", cart);

  useEffect(() => {
    const data = localStorage.getItem("cart-info");
    // console.log("check", data);
    if (data !== null) setCart(JSON.parse(data));
  }, []);

  const onRemoveClick = (sku, size) => {
    // console.log("sku", sku);
    let cartItem = localStorage.getItem("cart-info");
    let cartObject = JSON.parse(cartItem);
    console.log("cartObject", cartObject);

    const newCart = cartObject.filter(
      (item) => !(sku == item.sku && size == item.size)
    );
    console.log("newCart", newCart);
    localStorage.setItem("cart-info", JSON.stringify(newCart));
    // console.log('newCart', newCart);
    setCart(newCart);
  };

  const totalEndPrice = cart.reduce((total, item) => {
    // console.log('price price', item.price)
    const totalPriceOfEachProduct = (item.quantity / 100) * item.price;
    // console.log('all product prices', totalPriceOfEachProduct);
    return totalPriceOfEachProduct + total;
  }, 0);

  return (
    <div ref={props.modalRef} className="overlay-style">
      <div className="background">
        <h1 className="cart-title">Shopping Cart</h1>
        {cart.length === 0 ? (
          <div>
            <div>Cart is empty</div>
            <button
              onClick={() => {
                props.continueShopping(false);
              }}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="main-layout">
            <div className="item-number">{cart.length} items</div>
            <table>
              <thead>
                <tr className="headers">
                  <th style={{ paddingLeft: "30px" }}>Item Description</th>
                  <th style={{ textAlign: "center" }}>Quantity</th>
                  <th style={{ textAlign: "center" }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => {
                  const options = Array(item.availability)
                    .fill(0)
                    .map((e, index) => {
                      return <option value={index + 1}>{index + 1}</option>;
                    });
                  return (
                    <>
                      <tr key={item.id}>
                        <td className="image-to-data">
                          <div>
                            <img
                              src={item.image1}
                              alt="image"
                              width="220"
                              height="220"
                            />
                          </div>
                          <div>
                            <div className="item-name">{item.name}</div>
                            <div className="data-below-name">
                              <div>SKU: {item.sku}</div>
                              <div style={{ marginBottom: "10px" }}>
                                Size: {item.size}
                              </div>
                              <div style={{ marginBottom: "10px" }}>
                                Color: {item.color}
                              </div>
                            </div>
                            <button
                              onClick={() => onRemoveClick(item.sku, item.size)}
                              className="remove-button"
                            >
                              <FontAwesomeIcon
                                icon="fa-solid fa-trash-can"
                                style={{ paddingRight: "5px" }}
                              />
                              Remove Item
                            </button>
                          </div>
                        </td>
                        <td className="quantity-and-price">
                          <select
                            onChange={(e) => {
                              setCart((prev) => {
                                const updatedCart = [
                                  ...prev.map((cartItem) => {
                                    if (cartItem.id === item.id && cartItem.size === item.size) {
                                      cartItem.quantity = e.target.value;
                                    }
                                    return cartItem;
                                  }),
                                ];
                                localStorage.setItem("cart-info", JSON.stringify(updatedCart));
                                return updatedCart;
                              });
                            }}
                            defaultValue={item.quantity}
                          >
                            {options}
                          </select>
                        </td>
                        <td className="quantity-and-price">
                          CAD {(item.price / 100) * item.quantity}
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
            <div className="total">
              <h3>Total: &nbsp;CAD {totalEndPrice}</h3>
              <button
                onClick={() => {
                  props.continueShopping(false);
                }}
              >
                Continue Shopping
              </button>
              <button>Checkout</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
