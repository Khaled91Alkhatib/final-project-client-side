import React, {useState, useEffect, useContext} from 'react';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';

import "../styles/NavList.css";

const NavList = () => {
  const navigate = useNavigate();

  const onClickLogo = () => {
    navigate("/");
  };

  // <button><NavLink to="/products/men"> Shop for Men </NavLink></button>
  return (
    <div className="nav-bar">
      <div>
        <div className="name">Name Here</div>
        <img onClick={onClickLogo} alt="logo here" />
      </div>
      <div className="buttons">
        <button><NavLink to="/about"> about us </NavLink></button>
        <button><NavLink to="/collection/men"> Men's Collection</NavLink></button>
        <button><NavLink to="/collection/women"> Women's Collection</NavLink></button>
        <button>Contact Us</button>
        <div>
          <button className="sign-in">Sign In</button>
          <button>Admin Portal</button>
        </div>
      </div>
    </div>
  );
};

export default NavList;
