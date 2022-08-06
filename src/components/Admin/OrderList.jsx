import React, {useEffect, useState, useContext, useRef} from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';


const OrderList = ({ordersData}) => {

  function Row(props) {
    const { order } = props;
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <FontAwesomeIcon icon="fa-solid fa-angle-up" /> : <FontAwesomeIcon icon="fa-solid fa-angle-down" />}
            </IconButton>
          </TableCell>
          <TableCell align="center">{order.id}</TableCell>
          <TableCell align="center">{order.date}</TableCell>
          <TableCell align="left">{order.customer}</TableCell>
          <TableCell align="left">{order.address} - {order.city}</TableCell>
          <TableCell align="left">{order.email}</TableCell>
          <TableCell align="right">${order.total / 100}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 1, paddingTop: 1 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 2, color:"rgba(96, 96, 96)"}}>
                {/* <Typography variant="h6" gutterBottom component="div"> */}
                  <h4>Details</h4>
                {/* </Typography> */}
                <Table size="small" aria-label="details">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{color: "DarkMagenta"}}>Barcode</TableCell>
                      <TableCell sx={{color: "DarkMagenta"}}>Name</TableCell>
                      <TableCell sx={{color: "DarkMagenta"}}>Color</TableCell>
                      <TableCell sx={{color: "DarkMagenta"}} align="right">Size</TableCell>
                      <TableCell sx={{color: "DarkMagenta"}} align="right">Qty</TableCell>
                      <TableCell sx={{color: "DarkMagenta"}} align="right">Price</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {order.details.map(orderLine => (
                    <TableRow key={orderLine.barcode}>
                      <TableCell sx={{color: "DarkOliveGreen"}}>{orderLine.barcode}</TableCell>
                      <TableCell sx={{color: "DarkOliveGreen"}}>{orderLine.name}</TableCell>
                      <TableCell sx={{color: "DarkOliveGreen"}}>{orderLine.color}</TableCell>
                      <TableCell sx={{color: "DarkOliveGreen"}} align="right">{orderLine.size}</TableCell>
                      <TableCell sx={{color: "DarkOliveGreen"}} align="right">{orderLine.qty}</TableCell>
                      <TableCell sx={{color: "DarkOliveGreen"}} align="right">${orderLine.price / 100}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  return (
    <div className='orders-section'>
      <hr />
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell sx={{fontSize: "1em"}} align='center'minwidth='100'># Order</TableCell>
                <TableCell sx={{fontSize: "1em"}} align='center' minwidth='100' >Date</TableCell>
                <TableCell sx={{fontSize: "1em"}} align='left' minwidth='150' >Customer</TableCell>
                <TableCell sx={{fontSize: "1em"}} align='left' minwidth='200' >Address</TableCell>
                <TableCell sx={{fontSize: "1em"}} align='left' minwidth='150' >e-mail</TableCell>
                <TableCell sx={{fontSize: "1em"}} align='right' minwidth='100' >Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ordersData.map(order => (
                <Row key={order.id} order={order} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  )
};

export default OrderList;