import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ProductsContext from './contexts/ProductsContext';
import CartContext from './contexts/CartContext';

import Homepage from './components/Homepage';
import NavList from './components/NavList';
import Collection from './components/Collection';
import NotExistPage from './components/NotExistPage';
import SingleProduct from './components/SingleProductPage/SingleProduct';
import Footer from './components/Footer/Footer';
import AboutUs from './components/Footer/AboutUs';
import Warranty from './components/Footer/Warranty';

import NavbarAdminPortal from './components/Admin/NavbarAdminPortal';
import Dashboard from './components/Admin/Dashboard';
import AdminProduct from './components/Admin/AdminProduct';
import AdminOrders from './components/Admin/AdminOrders';
import LoginModal from "./components/Admin/LoginModal";

function App() {

  const [cart, setCart] = useState([]);
  const [user, setUser] = useState({});
  const [products, setProducts] = useState([]);
  // const [productSpec, setProductSpec] = useState({
  //   categories: [],
  //   styles: [],
  //   sizes: [],
  //   colors: []
  // });
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {

    // at first mount - get local storage cart info
    const cart = JSON.parse(localStorage.getItem('cart-info'));
    if (cart) {
     setCart(cart);
    }

    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
     setUser(user);
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

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));

    // in /dashboard url, pop up modal, if there is no admin user
    if (window.location.pathname.slice(0, 10) === "/dashboard" && !user.name) {
      setModalIsOpen(true);
    } else {
      setModalIsOpen(false)
    }
  }, [user]);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  function onLogin(inputUser) {
    console.log(inputUser);
    if (inputUser.name === 'admin' && inputUser.password === '123') {
      setUser(inputUser);
      closeModal();
    } else {
      toast("Login info is not correct!", {type: 'error'})
    }
  }


  // console.log('👟👞🥾', products);    // 🚨🚨🚨
  // console.log('🔧🪛',productSpec)   // 🚨🚨🚨
  // console.log('🧺',cart) // 🚨🚨🚨
  console.log('👤',user) // 🚨🚨🚨

  return (
    <div>
      <ProductsContext.Provider value={{ products, user, setUser }}>
        <CartContext.Provider value={{ setCart, cart }}>
          <BrowserRouter>
            {(window.location.pathname.slice(0, 10) === "/dashboard")? 
          <NavbarAdminPortal user={user} /> : <NavList/>}

            { modalIsOpen && 
              <Modal isOpen={modalIsOpen} 
                className="modal" 
                appElement={document.getElementById('root')}
              > 
                {window.location.pathname.slice(0, 10) === "/dashboard" && !user.name &&
                <LoginModal onLogin={onLogin}/>}
              </Modal>
              }
            <ToastContainer />
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/collection/:id" element={<Collection />} />
              <Route path="/*" element={<NotExistPage />} />
              <Route path="/collection/men/:id" element={<SingleProduct />} />
              <Route path="/collection/women/:id" element={<SingleProduct />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="warranty" element={<Warranty />} />
              <Route path="/dashboard" element={<Dashboard user={user} setUser={setUser}/>} />
              <Route path="/dashboard/product" element={<AdminProduct />} />
              <Route path="/dashboard/orders" element={<AdminOrders />} />
            </Routes>
            <Footer />
          </BrowserRouter>

        </CartContext.Provider>
      </ProductsContext.Provider>
    </div>
  );
}

export default App;
