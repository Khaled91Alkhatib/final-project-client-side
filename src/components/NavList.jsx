import React, { useState, useRef, useEffect, useContext } from 'react';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';

import "../styles/NavList.scss";

import ProductsContext from "../contexts/ProductsContext";
import CartContext from '../contexts/CartContext';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBagShopping, faPhone } from "@fortawesome/free-solid-svg-icons";
import ShoppingCart from './ShoppingCart';
import { useSlotProps } from '@mui/base';
library.add(faBagShopping, faPhone);


const NavList = (props) => {

  const { cart } = useContext(CartContext);
  const { user, setUser } = useContext(ProductsContext);

  // console.log("in here", cart);

  const ref = useRef();

  const navigate = useNavigate();

  const onClickLogo = () => {
    navigate("/");
  };

  const [cartClick, setCartClick] = useState(false);

  useEffect(() => {
    const checkIfClickedOutside = e => {
      // If the modal is open and the clicked target is not within the modal, then close the modal
      if (cartClick && ref.current && !ref.current.contains(e.target)) {
        setCartClick(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [cartClick]);

  const numberOfItemsInCart = cart.reduce((pre, cur) => pre + cur.quantity, 0);

  return (
    <div className="nav-bar">
      {!props.user.name &&
        <div className="all-buttons">
          <div className='left-and-right-navs'>
            <button className='nav-buttons'><NavLink className="navlink" to="/collection/men"> Men's Collection</NavLink></button>
            <button className='nav-buttons'><NavLink className="navlink" to="/collection/women"> Women's Collection</NavLink></button>
          </div>
          <img className='logo' onClick={onClickLogo} src="../logo.png" alt="logo here" />
          <div className='left-and-right-navs'>
            <button className='nav-buttons'><FontAwesomeIcon icon="fa-solid fa-phone" size='lg' />&nbsp; Contact Us</button>
            <button onClick={() => { setCartClick(true); }} className='nav-buttons'><FontAwesomeIcon icon="fa-solid fa-bag-shopping" size='lg' /><span className='badge badge-warning' id='lblCartCount'> {numberOfItemsInCart} </span>&nbsp; Shopping Cart</button>
            {cartClick && <ShoppingCart continueShopping={setCartClick} modalRef={ref} />}
          </div>
        </div>
      }
      {props.user.name &&

        <div>
          <img className='logo' src="../logo.png" alt="logo" />
          <button 
            className='nav-buttons'
            onClick={() => setUser({})}
          >
            Logout
          </button>
        </div>
      }
    </div>
  );
};

export default NavList;
