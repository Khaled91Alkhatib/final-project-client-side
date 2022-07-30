import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import "../Footer/Footer.scss";


function Footer() {

  const navigate = useNavigate();

  const onClickLogo = () => {
    navigate("/");
  };

  return (
    <div className="footer-bar">
      <div className="footer-buttons">
        <div className="all-footer-content">
          <div className="left-right-content">
            <button className="footer-buttons"><NavLink className="footer-navs" to="/about-us"> About Us </NavLink></button>
            <button className="footer-buttons"><NavLink className="footer-navs" to="/warranty"> Warranty</NavLink></button>
          </div>
          <img className='logo' onClick={onClickLogo} src="../logo.png" alt="logo here" />
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