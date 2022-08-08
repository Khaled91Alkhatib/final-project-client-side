import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './Reviews.scss';

const ThanksModal = ({onClose}) => {


  return (  
    <div className='thanks-page'>
      <button onClick={onClose} className="btn-close-modal"><FontAwesomeIcon icon="fa-solid fa-xmark" /></button>
      <h2>THANK YOU!</h2>
      <h3>WE WILL PROCESS YOUR REVIEW AND PUBLISH IT WITHIN 3-7 BUSINESS DAYS.</h3>
    </div>
  );
};

export default ThanksModal;