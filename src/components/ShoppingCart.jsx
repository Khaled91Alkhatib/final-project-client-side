import React, { useContext, useEffect } from "react";
import CartContext from "../contexts/CartContext";

import "./ShoppingCart.scss"

const ShoppingCart = (props) => {
  const { cart, setCart } = useContext(CartContext);
  console.log("khaled", cart);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart-info', JSON.stringify(cart));
      console.log("show", cart);
    }
  }, [cart]);

  useEffect(() => {
    const data = localStorage.getItem('cart-info');
    console.log("check", data)
    if ( data !== null ) setCart(JSON.parse(data));
  }, []);

  return (
    <div className="overlay-style">
      <div ref={props.modalRef} className="background">
        <h1>Cart</h1>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Size</th>
              <th>Color</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => {
              return (
                <>
                <tr key={item.id}>
                  <td>
                    <img
                      src={item.image1}
                      alt="image"
                      width="120"
                      height="120"
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.size}</td>
                  <td>{item.color}</td>
                  <td>{item.quantity}</td>
                  <td>CAD {item.price/100 * item.quantity}</td>
                </tr>
                </>
              );
            })}
          </tbody>
          <h3>Total</h3>
        </table>
      </div>
    </div>
  );
};

export default ShoppingCart;
