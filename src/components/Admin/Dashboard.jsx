import React, { useContext, useEffect, useState } from "react";
import { NavLink, useParams, useSearchParams } from "react-router-dom";
// import Modal from 'react-modal';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import LinearProgress from "@mui/material/LinearProgress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ProductsContext from "../../contexts/ProductsContext";

import "./Dashboard.scss";

// import NotExistPage from "./NotExistPage";

const Dashboard = () => {

  const { user } = useContext(ProductsContext);

  return (
    <div className="dashboard">
      {user.name &&
        <h1>Admin</h1>}
    </div>
  );
};

export default Dashboard;
