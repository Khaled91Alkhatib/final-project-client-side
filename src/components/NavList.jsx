import React from "react";
import { useNavigate } from "react-router-dom";

import "../styles/NavList.css";

const NavList = () => {
  const navigate = useNavigate();

  const onClickLogo = () => {
    navigate("/");
  };

  const onClickMensCollection = () => {
    navigate("/MensCollection");
  };

  const onClickWomensCollection = () => {
    navigate("/WomensCollection");
  };

  return (
    <div className="nav-bar">
      <div>
        <div className="name">Name Here</div>
        <img onClick={onClickLogo} alt="logo here" />
      </div>
      <div className="buttons">
        <button>About Us</button>
        <button onClick={onClickMensCollection}>Men's Collection</button>
        <button onClick={onClickWomensCollection}>Women's Collection</button>
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
