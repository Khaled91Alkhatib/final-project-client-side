import React, { useState, useContext} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import GeneralContext from "../../contexts/GeneralContext";
import OrderList from "./OrderList";

import './AdminOrders.scss';

import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

const AdminOrders = (props) => {

  const { user } = useContext(GeneralContext);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [ordersData, setOrdersData] = useState([]);

  // console.log('🍎🍎', ordersData);

  function onDisplay(event) {

    event.preventDefault();

    // get date from calender in this format: yyyy-mm-dd
    const startDate = new Date(fromDate).toLocaleDateString().slice(0, 10);
    const endDate = new Date(toDate).toLocaleDateString().slice(0, 10);

    axios.get(`http://localhost:8100/orders`, {
      params: { fromDate: startDate, toDate: endDate}
    })
    .then((response) => {
      const ordersInfo = response.data.ordersInfo;
      const orderDetails = response.data.orderDetails;
      // attach each order detail to it's parent (order info)
      const allData = ordersInfo.map(order => {
        const details = orderDetails.filter(line => line.order_id === order.id);
        return ({...order, details})
      })
      setOrdersData(allData);
    })
    .catch(error => {
      toast(`${error.message}`, {type: 'error'});
    })
  };

  const onChangeFromDate = (newDate) => {
    // make sure from-date is always smaller that to-date
    if (newDate > toDate) {
      setToDate(newDate);
    }
    setFromDate(newDate);
  }

  const onChangeToDate = (newDate) => {
    if (newDate < fromDate) {
      setFromDate(newDate);
    }
    setToDate(newDate);
  }


  return (
    <div className='admin-orders-page-main'>
      {user.name && 
        <div className='admin-orders-page'>
        <h2>Orders Detail!</h2>
          <div className=''>
            <form onSubmit={onDisplay} className='search-sku-form'>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
               <DesktopDatePicker
                 label="From"
                 value={fromDate}
                 minDate={new Date('2017-01-01')}
                 onChange={onChangeFromDate}
                 renderInput={(params) => <TextField {...params} />}
               />
               <div className='date-picker-to'>
                <DesktopDatePicker
                  label="To"
                  value={toDate}
                  minDate={new Date('2017-01-01')}
                  onChange={onChangeToDate}
                  renderInput={(params) => <TextField {...params} />}
                />
               </div>
              </LocalizationProvider>
              <button type="submit" className='btn-admin-page btn-display'>Display</button>
            </form>
          </div>
          {ordersData.length !== 0 && 
            <OrderList ordersData={ordersData} /> 
          }
        </div>
      }
    </div>
  );
};

export default AdminOrders;