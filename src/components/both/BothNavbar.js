import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import { toast } from "react-toastify";
import { GlobalContext } from "../../context/Auth";
import { types } from "../../types/types";

import "./bothNavbar.css";

export const BothNavbar = () => {
  const { dispatch } = useContext(GlobalContext);

  const handleLogout = () => {
    dispatch({ type: types.logout });

    sessionStorage.clear();

    toast.success("Sesion cerrada con exito!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <nav className="both__navbar">
      <ul className="both__navbar__container">
        <li className="both__navbar__item">
          <Link to="/home">
            <button className="both__navbar__item__button">Chat</button>
          </Link>
        </li>
        <li className="both__navbar__item">
          <Link to="complaints">
            <button className="both__navbar__item__button">Complaints</button>
          </Link>
        </li>
        <li className="both__navbar__item">
          <button className="both__navbar__item__button" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};
