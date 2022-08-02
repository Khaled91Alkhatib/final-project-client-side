import React, {useEffect, useState, useContext} from 'react';
import { Route, Routes, useSearchParams } from 'react-router-dom';
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


const LoadProductForEdit = ({product, onSubmit, onReset, availableSizes}) => {

  const {productSpec} = useContext(ProductsContext);

  const newSizes = productSpec.sizes.filter(row => !availableSizes.find(rowData => rowData.size_id === row.id));
  const baseSize = newSizes.map(row => {
    return (
      {
        barcode: "",
        size_id: row.id,
        sku: product.sku,
        size: row.size,
      }
    )
  })

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

 
  const baseFormData = { ...product, price: product.price / 100};
  
  const { formData, handleChange, handleSubmit, errorMsg, handleCheckBoxChange, formSize, handleChangeBarcode} = useFormAdminProduct(baseFormData, onSubmit, onReset, baseSize);

  // console.log('🚨🚨🚨',formData);
  // console.log('🚨🚨🚨',formSize);

  const newSizeArray = baseSize.map((row, index) => {
    return (
      <div className='edit-size-row' key={index}>
        <div className='size-feild'>
          <TextField
            id="filled-size"
            label="Size"
            defaultValue={row.size}
            InputProps={{
              readOnly: true,
            }}
            variant="standard"
          />
        </div>
        <FormControl>
          <div className='barcode-feild'>
            <TextField 
              label="barcode"
              id={index.toString()}
              name="barcode"
              value={formSize.barcode}
              onChange={handleChangeBarcode}
              variant="standard"
            />
          </div>
        </FormControl>
      </div>
    )
  })

  const oldSizeArray = availableSizes.map((row, index) => {
    return (
      <div className='edit-size-row' key={index}>
        <div className='size-feild'>
          <TextField
            id="filled-size"
            label="Size"
            defaultValue={row.size}
            InputProps={{
              readOnly: true,
            }}
            variant="standard"
          />
        </div>
        <div className='barcode-feild'>
          <TextField
            id="filled-barcode"
            label="barcode"
            defaultValue={row.barcode}
            InputProps={{
              readOnly: true,
            }}
            variant="standard"
          />
        </div>
      </div>
    )
  });
  
  return (
    <div className='add-item-section'>
      <hr />
      <h2>Edit Product</h2>
      <div className='add-item-form'>
        <form onSubmit={handleSubmit}>
          <div className='name-price'>
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

            <button type="submit" className='button-edit-page save-edit-item'>Save</button>
          </div>

          <div className='category-style-color'>
            <FormControl>
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
              </div>
            </FormControl>

            <FormControl>
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
              </div>
            </FormControl>

            <FormControl>
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
              </div>
            </FormControl>

            <FormControlLabel control={
              <Checkbox
                checked={formData.disp}
                onChange={handleCheckBoxChange}
                inputProps={{ 'aria-label': 'controlled' }}
              />} label="Display In Collection Page" 
            />
          </div>
          
          <div className='add-item-image-group'>
            <div className='image-select'>
              <span>
                Saved Image 1: 
              </span>
              <img
                src={formData.image1}
                alt="image"
                width="80"
                height="80"
              />
              <label htmlFor="image1" > &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Change Image 1:&nbsp;&nbsp;&nbsp;</label>
              <input
                id="image1"
                name="image1"
                type={"file"}
                accept={'image/*'} 
                value={undefined}
                onChange={handleChange}
              />
            </div>

            <div className='image-select'>
              <span>
                Saved Image 2: 
              </span>
              <img
                src={formData.image2}
                alt="image"
                width="80"
                height="80"
              />
              <label htmlFor="image2" > &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Change Image 2:&nbsp;&nbsp;&nbsp;</label>
              <input
                id="image2"
                name="image2"
                type={"file"}
                accept={'image/*'}
                value={undefined}
                onChange={handleChange}
              />
            </div>

            <div className='image-select'>
              <span>
                Saved Image 3: 
              </span>
              <img
                src={formData.image3}
                alt="image"
                width="80"
                height="80"
              />
              <label htmlFor="image3" > &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Change Image 3:&nbsp;&nbsp;&nbsp;</label>
              <input
                id="image3"
                name="image3"
                type={"file"}
                accept={'image/*'}
                value={undefined}
                onChange={handleChange}
              />
            </div>
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

          <div className='size-table'>
            { newSizeArray.length !== 0 &&
              <div className='new-sizes'>
                <h3><li>Define unique barcode for these sizes.</li></h3> 
                {newSizeArray}
              </div>
            }
            { oldSizeArray.length !== 0 &&
              <div className='old-sizes'>
                <h3><li>Already defined sizes.</li></h3> 
                {oldSizeArray}
              </div>
            }
          </div>
        </form>
      </div>
    </div>        
  );
};

export default LoadProductForEdit;