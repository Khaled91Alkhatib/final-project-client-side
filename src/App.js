import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';

import ProductsContext from './contexts/ProductsContext';

import NavList from './components/NavList';
import Collection from './components/Collection';

function App() {

  const [products, setProducts] = useState([]);

  useEffect( () => {
    
    axios.get('http://localhost:8100/api/products')
    .then((response) => {
      console.log(response.data);
      // handle success
      // const categories = response.data.categories;
      // const styles = response.data.styles;
      // const colors = response.data.colors;
      // const sizes = response.data.sizes;
      setProducts(prev => response.data.products);
      // setProductSpec({...productSpec ,categories,styles, colors, sizes});
    }) 
    
  },[])

  return (
    <div>
      <ProductsContext.Provider value={{ products}}>

        <BrowserRouter>
          <NavList />
          <Routes>
            <Route path="/collection/:id" element={<Collection />}/>
          </Routes>
        </BrowserRouter>

      </ProductsContext.Provider>
    </div>
  );
}

export default App;
