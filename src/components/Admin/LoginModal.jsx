import React, {useEffect, useState, useContext} from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

import useForm from "../../hooks/useForm";

import './modal.scss';

const LoginModal = (props) => {


  const baseFormData = { name: "", password: "" };
  const { formData, handleChange, handleSubmit } = useForm(baseFormData, props.onLogin);

  return (
    <div className='login-modal'>
      <h3>Please Login First</h3>
      <form onSubmit={handleSubmit} >
        <div className='login-form'>
          <div className='input-login-form'>
            <div>
              <FormControl>
                <TextField 
                  required 
                  variant="standard"
                  label="name"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <FormHelperText>Required</FormHelperText>
              </FormControl>
            </div>
            <div>
              <FormControl>
                <TextField 
                  required 
                  variant="standard"
                  label="password"
                  id="password"
                  name="password"
                  type="password" 
                  value={formData.password}
                  onChange={handleChange}
                />
                <FormHelperText>Required</FormHelperText>
              </FormControl>
            </div>
          </div>
          <button type="submit"> Login </button>
        </div>
      </form>

    </div>
  );
};

export default LoginModal;