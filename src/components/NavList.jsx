import React, {useState, useEffect, useContext} from 'react';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';

import "../styles/NavList.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBagShopping, faPhone } from "@fortawesome/free-solid-svg-icons";
library.add(faBagShopping, faPhone);

const NavList = () => {
  const navigate = useNavigate();

  const onClickLogo = () => {
    navigate("/");
  };

  // <button><NavLink to="/products/men"> Shop for Men </NavLink></button>
  return (
    <div className="nav-bar">
      <img className='logo' onClick={onClickLogo} src="../logo.png" alt="logo here" />
      <div className="buttons">
      <button className='nav-buttons'><NavLink to="/about"> About Us </NavLink></button>
      <button className='nav-buttons'><NavLink to="/collection/men"> Men's Collection</NavLink></button>
      <button className='nav-buttons'><NavLink to="/collection/women"> Women's Collection</NavLink></button>
      <button className='nav-buttons'><FontAwesomeIcon icon="fa-solid fa-phone" />&nbsp;Contact Us</button>
      <button className='nav-buttons'><FontAwesomeIcon icon="fa-solid fa-bag-shopping" />&nbsp; Shopping Cart</button>
      </div>
    </div>
  );
};

export default NavList;
