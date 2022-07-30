import React, { useState, useRef, useEffect, useContext } from 'react';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';

import "./NavbarAdminPortal.scss";

import ProductsContext from "../../contexts/ProductsContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';



const NavbarAdminPortal = (props) => {

  const { user, setUser } = useContext(ProductsContext);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    setAnchorEl(null);
  }, [user])

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="nav-bar-admin">
      <NavLink to="#" className='menu-bar'>
        
      </NavLink>
      <img className='logo-admin' src="../logo2.png" alt="logo" />
      {user.name && <div>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <FontAwesomeIcon icon="fa-solid fa-user" />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => {
            setUser({})
            handleClose()}}>Logout</MenuItem>
        </Menu>
      </div>}
    </div>
  );
};

export default NavbarAdminPortal;
