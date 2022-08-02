import React, { useContext, useEffect, useState } from "react";
import CartContext from "../contexts/CartContext";
import StripeCheckout from "react-stripe-checkout";
import { toast } from 'react-toastify';
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./ShoppingCart.scss";
import "react-toastify/dist/ReactToastify.css";


const ShoppingCart = (props) => {
  toast.configure();

  const { cart, setCart } = useContext(CartContext);
  // console.log("khaled", cart);

  const onRemoveClick = (barcode) => {
    setCart(pre => pre.filter(item => !(barcode === item.barcode)));
  };

  const totalEndPrice = cart.reduce((total, item) => {
    // console.log('price price', item.price)
    const totalPriceOfEachProduct = (item.quantity / 100) * item.price;
    // console.log('all product prices', totalPriceOfEachProduct);
    return totalPriceOfEachProduct + total;
  }, 0);

  const cartItemsNumber = cart.reduce((pre, cur) => pre + cur.quantity, 0);

  async function handleToken(token, addresses) {
    let response;
    try {
      response = await axios.post("http://localhost:8100/checkout", { token, cart });
      console.log('stripe response', response);

    } catch (error) {
      // console.log('stripe response error', error);

    }
    // console.log('stripe response', response)
    if (response.status === 200) {
      toast("Successful Payment", { type: "success" });
      setCart([]);
    } else {
      toast("Payment is not successful", { type: "error" });
    }
  }

  // console.log('stripe', process.env.REACT_APP_STRIPE_KEY);

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
            <div className="item-number">
              {cartItemsNumber === 1 ? '1 item' : `${cartItemsNumber} items`}
            </div>
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
                  // console.log(item);
                  const options = Array(item.availability)
                    .fill(0)
                    .map((e, index) => {
                      return <option value={index + 1} key={index}>{index + 1}</option>;
                    });
                  return (
                    <tr key={item.barcode}>
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
                            <div># {item.barcode}</div>
                            <div style={{ marginBottom: "10px" }}>
                              Size: {item.size}
                            </div>
                            <div style={{ marginBottom: "10px" }}>
                              Color: {item.color}
                            </div>
                          </div>
                          <button
                            onClick={() => onRemoveClick(item.barcode)}
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
                            const newCart = cart.map(row => {
                              if (row.barcode === item.barcode) {
                                return { ...row, quantity: Number(e.target.value) };
                              } else {
                                return { ...row };
                              }
                            });
                            setCart(newCart);
                          }}
                          value={item.quantity}
                        >
                          {options}
                        </select>
                      </td>
                      <td className="quantity-and-price">
                        CAD {(item.price / 100) * item.quantity}
                      </td>
                    </tr>
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
              {/* <button>Checkout</button> */}
              <StripeCheckout
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
                token={handleToken}
                amount={totalEndPrice * 100}
                billingAddress
                shippingAddress
                label="Checkout"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
