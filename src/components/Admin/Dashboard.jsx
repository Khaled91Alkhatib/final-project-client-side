import React, { useContext, useEffect, useState } from "react";
import { NavLink, useParams, useSearchParams } from "react-router-dom";
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LinearProgress from "@mui/material/LinearProgress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ProductsContext from "../../contexts/ProductsContext";
import LoginModal from "./LoginModal";

import "./Dashboard.scss";

// import NotExistPage from "./NotExistPage";

const Dashboard = () => {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { user, setUser } = useContext(ProductsContext);

  useEffect(() => {
    if (!user.name) {
      setModalIsOpen(true);
    } else {
      setModalIsOpen(false)
    }
  }, [user])

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


  return (
    <div className="dashboard">
      { modalIsOpen && 
        <Modal isOpen={modalIsOpen} 
          className="modal" 
          appElement={document.getElementById('root')}
        > 
        <LoginModal onLogin={onLogin}/>
        </Modal>
      }
      <ToastContainer />
      <h1>Admin</h1>
    </div>
  );
};

export default Dashboard;
