import React, {useEffect, useState, useContext} from 'react';
import useFormAdminProduct from "../../hooks/useFormAdminProduct";

import './AdminProduct.scss';
import ProductsContext from '../../contexts/ProductsContext';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


const LoadAddForm = ({onSubmit, onReset}) => {

  const {productSpec} = useContext(ProductsContext);

  const categories = productSpec.categories.map(row => {
    return (
      <MenuItem key={row.id} value={row.id} >{row.cat}</MenuItem>
    )
  });

  const styles = productSpec.styles.map(row => {
    return (
      <MenuItem key={row.id} value={row.id} >{row.style}</MenuItem>
    )
  });

  const colors = productSpec.colors.map(row => {
    return (
      <MenuItem key={row.id} value={row.id} >{row.color}</MenuItem>
    )
  });
  
  const baseFormData = { sku: "", category_id: "", style_id: "",
    color_id: "", name: "", description: "", image1: "", image2: "", image3: "", price: "", disp:false};
    
  const { formData, handleChange, handleSubmit, errorMsg, handleCheckBoxChange} = useFormAdminProduct(baseFormData, onSubmit, onReset);
  
  console.log('👀', formData);
  
  
  return (
    <div className='add-item-page'>
      <hr />
      <h2>Add New Main Product</h2>
      <div className='add-item-form'>
        <form onSubmit={handleSubmit} >
          <div className='cat-style-color-name'>
            <FormControl required>
              <div className='input-feild'>
                <InputLabel id="select-category-label" className='category-feild'>Category</InputLabel>
                <Select
                  labelId="select-category-label"
                  id="select-category"
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  variant="standard"
                  className='category-feild'
                >
                  {categories}
                </Select>
                <FormHelperText>Required</FormHelperText>
              </div>
            </FormControl>

            <FormControl required>
              <div className='input-feild'>
                <InputLabel id="select-style-label">Style</InputLabel>
                <Select
                  labelId="select-style-label"
                  id="select-style"
                  name="style_id"
                  value={formData.style_id}
                  onChange={handleChange}
                  variant="standard"
                  className='style-feild'
                >
                  {styles}
                </Select>
                <FormHelperText>Required</FormHelperText>
              </div>
            </FormControl>

            <FormControl required>
              <div className='input-feild'>
                <InputLabel id="select-color-label">Color</InputLabel>
                <Select
                  labelId="select-color-label"
                  id="select-color"
                  name="color_id"
                  value={formData.color_id}
                  onChange={handleChange}
                  variant="standard"
                  className='color-feild'
                >
                  {colors}
                </Select>
                <FormHelperText>Required</FormHelperText>
              </div>
            </FormControl>

            <FormControl>
              <div className='input-feild'>
                <TextField
                  required
                  id="name"
                  label="Product's Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  variant="standard"
                  className='name-feild'
                />
                <FormHelperText>Required</FormHelperText>
              </div>
            </FormControl>
          </div>

          <FormControl>
            <div className='input-feild'>
              <TextField
                id="description"
                label="Description"
                multiline
                maxRows={6}
                name="description"
                value={formData.description}
                onChange={handleChange}
                variant="standard"
                className='description-feild'
              />
            </div>
          </FormControl>

          <div className='add-item-image-group'>
            <div className='image-select'>
              <label htmlFor="image1" >Select Image 1:&nbsp;&nbsp;&nbsp;</label>
              <input
                required 
                id="image1"
                name="image1"
                type={"file"}
                accept={'image/*'} 
                value={undefined}
                onChange={handleChange}
              />
              {
                formData.image1  &&
                <img
                  src={formData.image1}
                  alt="image"
                  width="80"
                  height="80"
                />
              }
              <FormHelperText>Required</FormHelperText>
            </div>

            <div className='image-select'>
              <label htmlFor="image2" >Select Image 2:&nbsp;&nbsp;&nbsp;</label>
              <input
                id="image2"
                name="image2"
                type={"file"}
                accept={'image/*'} 
                value={undefined}
                onChange={handleChange}
              />
              {
                formData.image2  &&
                <img
                  src={formData.image2}
                  alt="image"
                  width="80"
                  height="80"
                />
              }
            </div>

            <div className='image-select'>
              <label htmlFor="image3" >Select Image 3:&nbsp;&nbsp;&nbsp;</label>
              <input
                id="image3"
                name="image3"
                type={"file"}
                accept={'image/*'} 
                value={undefined}
                onChange={handleChange}
              />
              {
                formData.image3  &&
                <img
                  src={formData.image3}
                  alt="image"
                  width="80"
                  height="80"
                />
              }
            </div>
          </div>

          <div>
            <FormControl required >
              <div className='input-feild'>
                <InputLabel htmlFor="input-price">Price</InputLabel>
                <Input
                  id="input-price"
                  label="Price"
                  name="price"
                  type='number'
                  value={formData.price}
                  onChange={handleChange}
                  variant="standard"
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                />
                {errorMsg ?
                <FormHelperText style={{color: 'red'}}>{errorMsg}</FormHelperText> :
                <FormHelperText>Required</FormHelperText>
                }
              </div>
            </FormControl>

            <FormControlLabel control={
              <Checkbox
                checked={formData.disp}
                onChange={handleCheckBoxChange}
                inputProps={{ 'aria-label': 'controlled' }}
              />} label="Display In Collection Page"
            />

            <button type="submit" className='button-edit-page save-edit-item'> Add Item</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoadAddForm;