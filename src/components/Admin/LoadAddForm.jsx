import React, {useEffect, useState, useContext} from 'react';
import useFormAdminProduct from "../../hooks/useFormAdminProduct";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
import CircularProgress from '@mui/material/CircularProgress';


const LoadAddForm = ({onSubmit, onReset, sku}) => {

  const {productSpec} = useContext(ProductsContext);

  const baseSize = productSpec.sizes.map(row => {
    return (
      {
        barcode: "",
        size_id: row.id,
        sku,
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
  
  const baseFormData = { sku, category_id: "", style_id: "",
    color_id: "", name: "", description: "", image1: "", image2: "", image3: "", price: "", disp:false};
    
  const {formData, formSize, errorMsg, loading, handleChange, uploadImage, handleCheckBoxChange, handleChangeBarcode, handleSubmit, deleteImage} = useFormAdminProduct(baseFormData, onSubmit, onReset, baseSize);

  // console.log('👀', formData);
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
  
  return (
    <div className='add-item-page'>
      <hr />
      <h2>Add New Main Product</h2>
      <div className='add-item-form'>
        <form onSubmit={handleSubmit} >
          <div className='name-price'>
            <div>
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

            <div className='add-item-price'>
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
                    className='price-feild'
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                  />
                  <FormHelperText>Required</FormHelperText>
                </div>
              </FormControl>
            </div>

            <div className='checkbox-display'>
              <FormControlLabel control=
              {
                <Checkbox
                  checked={formData.disp}
                  onChange={handleCheckBoxChange}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              } label="Display In Collection Page"
              />
            </div>

            <div className='button-error'>
              <button type="submit" className='button-edit-page save-edit-item'> Add Item</button>
              {errorMsg &&
                <FormHelperText style={{color: 'red'}}>{errorMsg}</FormHelperText>}
            </div>
          </div>

          <div className='images-category-style-color'>
            <div className='category-style-color'>
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
            </div>

            <div className='image-loading'>
              <div className='add-item-image-group'>
                <div className='image-select'>
                  <div>
                    <label htmlFor="file-upload-image1" className="custom-file-upload">
                      Select & Upload Image 1
                    </label>
                    <input 
                      id="file-upload-image1" 
                      type="file"
                      name="image1"
                      accept={'image/*'} 
                      onChange={uploadImage}
                    />
                  </div>
                  {formData.image1 &&
                    <div className='img-preview-part'>
                      <span> preview:</span>
                      <div className='img-preview'>
                        <img
                          src={formData.image1}
                          alt="image1"
                          width="80"
                          height="80"
                        />
                      </div>
                      <div id='image1' onClick={deleteImage}>
                        <FontAwesomeIcon icon="fa-solid fa-eraser" className='erase-image'/>
                      </div>
                    </div>
                  }
                  {!formData.image1 && 
                    <FormHelperText>Required</FormHelperText>
                  }
                </div> 
                
                <div className='image-select'>
                  <div>
                    <label htmlFor="file-upload-image2" className="custom-file-upload">
                      Select & Upload Image 2
                    </label>
                    <input 
                      id="file-upload-image2" 
                      type="file"
                      name="image2"
                      accept={'image/*'} 
                      onChange={uploadImage}
                    />
                  </div>
                  {formData.image2 &&
                    <div className='img-preview-part'>
                      <span> preview:</span>
                      <div className='img-preview'>
                        <img
                          src={formData.image2}
                          alt="image"
                          width="80"
                          height="80"
                        />
                      </div>
                      <div id='image2' onClick={deleteImage}>
                        <FontAwesomeIcon icon="fa-solid fa-eraser" className='erase-image'/>
                      </div>
                    </div>
                  }     
                </div>
                
                <div className='image-select'>
                  <div>
                    <label htmlFor="file-upload-image3" className="custom-file-upload">
                      Select & Upload Image 3
                    </label>
                    <input 
                      id="file-upload-image3" 
                      type="file"
                      name="image3"
                      accept={'image/*'} 
                      onChange={uploadImage}
                    />
                  </div>
                  {formData.image3 &&
                    <div className='img-preview-part'>
                      <span> preview:</span>
                      <div className='img-preview'>
                        <img
                          src={formData.image3}
                          alt="image"
                          width="80"
                          height="80"
                        />
                      </div>
                      <div id='image3' onClick={deleteImage}>
                        <FontAwesomeIcon icon="fa-solid fa-eraser" className='erase-image'/>
                      </div>
                    </div>
                  }     
                </div>
              </div>

              <div className='loading-image-sign'>
                {loading && <CircularProgress />}
              </div>
            </div>

            <div className='description-section'>
              <FormControl>
                <div className='input-feild'>
                  <TextField
                    id="description"
                    label="Description"
                    multiline
                    maxRows={10}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    variant="standard"
                    className='description-feild'
                  />
                </div>
              </FormControl>
            </div>
          </div>

          <div className='size-table'>
            <div className='new-sizes'>
              <h3><li>Define unique barcode for these sizes.</li></h3> 
              {newSizeArray}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoadAddForm;