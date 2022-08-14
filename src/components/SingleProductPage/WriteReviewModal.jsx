import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

import useForm from "../../hooks/useForm";

import './Reviews.scss';

const WriteReviewModal = ({product, onClose, onSubmit}) => {

  const id = product.id;
  const sku = product.sku;
  const baseFormData = { id, sku, nickname: "", email:"", headline:"", comments:"", rating:0.5};
  const {formData, handleChange, handleSubmit} = useForm(baseFormData, onSubmit);

  // console.log('🎃', formData);

  return (  
    <div className='write-review-page'>
      <button onClick={onClose} className="btn-close-modal"><FontAwesomeIcon icon="fa-solid fa-xmark" /></button>
      <div className='item-info'>
        <div>
          <img src={product.image1} alt="image1" className='r-item-image' />
        </div>
        <div>
          <div className="data-title">WRITE A REVIEW</div>
          <span className='r-item-name'>{product.name}</span>
        </div>
      </div>
      <div className='add-review-form'>
        <form onSubmit={handleSubmit}>
          <Typography component="legend">Your Rating</Typography>
          <Rating
            name="rating"
            value={Number(formData.rating)}
            onChange={handleChange}
            precision={0.5}
          />
          <div className='personal-info'>
            <div className='review-input'>
              <TextField
                required
                id="nickname"
                label="Nickname"
                name="nickname"
                value={formData.nickname}
                onChange={handleChange}
                size="small"
                variant="standard"
                margin="dense"
                sx={{ m: 0, width: '20ch' }}
              />
              <FormHelperText>Required</FormHelperText>
            </div>
            <div className='review-input'>
              <TextField
                required
                id="name"
                label="e-mail"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                variant="standard"
                size="small"
                margin="dense"
                sx={{ m: 0, width: '36ch' }}
              />
              <FormHelperText>Required</FormHelperText>
            </div>
          </div>
          <div className='review-input'>
            <TextField
              id="headline"
              label="Headline"
              placeholder="I would buy this product again"
              name="headline"
              value={formData.headline}
              onChange={handleChange}
              variant="standard"
              inputProps={{
                maxLength: 40
              }}
              helperText={`${formData.headline.length}/${40}`}
              margin="dense"
              sx={{ m: 0, width: '60ch' }}
            />
          </div>
          <div className='review-input'>
            <TextField
              id="comments"
              label="Comments"
              placeholder="How you use the product. Things that are great about it. Things that aren't great about it."
              multiline
              maxRows={3}
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              variant="standard"
              inputProps={{
                minLength: 20,
                maxLength: 300
              }}
              // style ={{width: 500}}
              sx={{ m: 0, width: '60ch' }}
              helperText={`(min characters: 20) - ${formData.comments.length}/${300}`}
              margin="dense"
            />
          </div>
          <div className='comment-button'>
            <button type="submit" className='btn-send-review'>Send</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WriteReviewModal;