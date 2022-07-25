import React, {useState, useEffect} from 'react';

import './Sizes.scss';

const Sizes = (props) => {

  const availableSizes = props.availableSizes;
  
  const sizeArray = availableSizes.map(item => {
    let class_name = item.size_id === props.select.size_id ? "size-box selected" : "size-box"
    return (
      <button 
        className={class_name}
        key={item.size_id}
        disabled={item.quantity === 0}
        onClick={() => {
          props.onSelectSize(item);
        }}
      >
        {item.size}
      </button>
    )
  })

  return (
    <div>
      <div className='size-list'>
        {sizeArray}
      </div>
      <button onClick={() => props.onAdd()}>add to cart</button>
    </div>
  );
};

export default Sizes;