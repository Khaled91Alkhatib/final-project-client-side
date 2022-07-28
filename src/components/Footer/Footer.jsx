import React from "react";
import { NavLink } from "react-router-dom";

import "../Footer/Footer.scss";


function Footer() {
  return (
    <div className="footer-bar">
      <div className="footer-buttons">
        <div className="all-footer-content">
          <div className="left-right-content">
            <button className="footer-buttons"><NavLink className="footer-navs" to="/about-us"> About Us </NavLink></button>
            <button className="footer-buttons"><NavLink className="footer-navs" to="/warranty"> Warranty</NavLink></button>
          </div>
          <img className='logo' src="../logo.png" alt="logo here" />
          <div className="left-right-content">
            <button className="footer-buttons"><NavLink className="footer-navs" to="/return"> Shipping</NavLink></button>
            <button className="footer-buttons"><NavLink className="footer-navs" to="/return"> Returns</NavLink></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
