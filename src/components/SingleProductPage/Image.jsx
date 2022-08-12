import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './Image.scss';

const Image = ({images, onLeft, onRight}) => {

  return (  
    <div className='image-box'>
      <button className='arrow-b' onClick={onLeft}>
        <FontAwesomeIcon icon="fa-solid fa-angle-left" />
      </button>
      <img src={`${images[0]}`} alt="pro" className='image'/>
      <button className='arrow-b' onClick={onRight}>
        <FontAwesomeIcon icon="fa-solid fa-angle-right" />
      </button>
    </div>
  );
};

export default Image;