import React, {useEffect, useState, useContext, useRef} from 'react';

import './AdminInventory.scss';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const InventoryList = ({inventoryData, product}) => {

  const barcodesRef = useRef([]);

  // console.log(inventoryData);
  // console.log(product);

  useEffect(() => {
    const productIndex = inventoryData.indexOf(product);
    productIndex === -1 ? scroll(0) : scroll(productIndex);
  }, [product]);

  const scroll = (index) =>
    barcodesRef && barcodesRef.current[index] && barcodesRef.current[index].scrollIntoView({ behavior: "smooth", block: "center"});

  useEffect(() => {
    barcodesRef.current = barcodesRef.current.slice(0, inventoryData.length);
  }, [inventoryData]);

  const columns = [
    { id: 'row', label: '#', minWidth: 100, align: 'left' },
    { id: 'barcode', label: 'Barcode', minWidth: 100, align: 'left' },
    { id: 'size', label: 'Size', minWidth: 100, align: 'left' },
    { id: 'sku', label: 'SKU', minWidth: 170, align: 'left' },
    { id: 'name', label: 'Name', minWidth: 200, align: 'left' },
    { id: 'qty', label: 'Quantity', minWidth: 100, align: 'left' },
  ];

  const columnsArray = columns.map((column) => {
    return (
      <TableCell
        key={column.id}
        align={column.align}
        style={{ minWidth: column.minWidth }}
      >
        {column.label}
      </TableCell>
    )
  })

  const inventoryDataArray = inventoryData.map((row, index) => {

    const classSelect = row.select ? "select" : "";
      
    return (
      <TableRow hover role="checkbox" tabIndex={-1} key={row.barcode} ref={el => barcodesRef.current[index] = el} >
        <TableCell align='left' className={classSelect} >{index + 1}</TableCell>
        <TableCell align='left' className={classSelect} >{row.barcode}</TableCell>
        <TableCell align='left' className={classSelect} >{row.size}</TableCell>
        <TableCell align='left' className={classSelect} >{row.sku}</TableCell>
        <TableCell align='left' className={classSelect} >{row.name}</TableCell>
        <TableCell align='left' className={classSelect} >{row.qty}</TableCell>
      </TableRow>
    );
  })

  return (
    <div className='inventory-section'>
      <hr />
      <h2>Inventory List</h2>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columnsArray}
              </TableRow>
            </TableHead>
            <TableBody>
              {inventoryDataArray}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  )
};

export default InventoryList;