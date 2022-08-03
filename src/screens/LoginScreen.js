import React from "react";
import { Outlet } from "react-router-dom";

export const LoginScreen = () => {
  return (
    <div className="loginScreen">
      <div className="loginScreen__container">
        <div className="loginScreen__title__container">
          <h1>Novateva chat</h1>
        </div>
        <Outlet />
      </div>
    </div>
  );
};
