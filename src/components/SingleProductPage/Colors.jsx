import React, {useState, useEffect} from 'react';
import './Colors.scss';

const Colors = (props) => {

  const colorsArry = props.colorsFamily.map(product => {
    let myClass = "";
    if (product.selected) myClass = "color-selected";
    return (
      <div className={myClass} key={product.id}>
        <button 
          className={`${product.color.toLowerCase()} , btn`} 
          onClick={() => props.onColor(product)}
        />
      </div>
    )
  })
  
  return (
    <div className='color-list'>
      {colorsArry}
    </div>
  );
};

export default Colors;