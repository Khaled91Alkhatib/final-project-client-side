import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';

import ProductsContext from './contexts/ProductsContext';
import CartContext from './contexts/CartContext';

import Homepage from './components/Homepage';
import NavList from './components/NavList';
import Collection from './components/Collection';
import NotExistPage from './components/NotExistPage';
import SingleProduct from './components/SingleProductPage/SingleProduct';

function App() {

  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  // const [productSpec, setProductSpec] = useState({
  //   categories: [],
  //   styles: [],
  //   sizes: [],
  //   colors: []
  // });

  useEffect(() => {

    // at first mount - get local storage cart info
    const cart = JSON.parse(localStorage.getItem('cart-info'));
    if (cart) {
     setCart(cart);
    }

    const f1 = axios.get('http://localhost:8100/api/products');
    // const f2 = axios.get('http://localhost:8100/api/specification')

    Promise.all([f1])
      .then(([r1]) => {
        // handle success
        // const categories = r2.data.categories;
        // const styles = r2.data.styles;
        // const colors = r2.data.colors;
        // const sizes = r2.data.sizes;
        setProducts(prev => r1.data.products);
        // setProductSpec({categories,styles, colors, sizes});
      });

  }, []);

  // set local storage when cart state changed!
  useEffect(() => {
    localStorage.setItem('cart-info', JSON.stringify(cart));
  }, [cart]);


  console.log('👟👞🥾', products);    // 🚨🚨🚨
  // console.log('🔧🪛',productSpec)   // 🚨🚨🚨
  console.log('🧺',cart) // 🚨🚨🚨

  return (
    <div>
      <ProductsContext.Provider value={{ products }}>
        <CartContext.Provider value={{ setCart, cart }}>
          <BrowserRouter>
            <NavList />
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/collection/:id" element={<Collection />} />
              <Route path="/*" element={<NotExistPage />} />
              <Route path="/collection/men/:id" element={<SingleProduct />} />
              <Route path="/collection/women/:id" element={<SingleProduct />} />
            </Routes>
          </BrowserRouter>

        </CartContext.Provider>
      </ProductsContext.Provider>
    </div>
  );
}

export default App;
