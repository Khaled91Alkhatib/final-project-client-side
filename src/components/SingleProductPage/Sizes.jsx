import React, {useState, useEffect} from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './Sizes.scss';

const Sizes = (props) => {
  
  const [lowStock, setLowStock] = useState(false)
  
  useEffect(() => {
    setLowStock(false);
  }, [props.availableSizes])

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
          setLowStock(false);
          if (item.quantity < 3 && item.quantity !== 0) {
            setLowStock(true)
          }
        }}
      >
        {item.size}
      </button>
    )
  })

  return (
    <div className='size-component'>
      <div>
        {lowStock && <span className='lowStockMsg'><FontAwesomeIcon icon="fa-solid fa-arrow-trend-down" /> Just a few left. Order soon.</span>}
      </div>
      <div className='size-list'>
        {sizeArray}
      </div>
      {/* <button onClick={() => props.onAdd()}>add to cart</button> */}
    </div>
  );
};

export default Sizes;