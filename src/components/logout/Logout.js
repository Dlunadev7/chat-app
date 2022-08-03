import React, { useContext } from "react";

import { GlobalContext } from "../../context/Auth";
import { types } from "../../types/types";

import { toast } from "react-toastify";

import "./logout.css";

export const Logout = () => {
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
    <div className="main__sidebar__logout" onClick={handleLogout}>
      <div className="main__sidebar__logout__container">
        <img
          className="main__sidebar__icon__logout"
          src="./assets/logout.svg"
          alt="logout icon"
        />
        <p className="main__sidebar__logout__paragraph">Logout</p>
      </div>
    </div>
  );
};
