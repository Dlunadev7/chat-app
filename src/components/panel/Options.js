import React from "react";
import { Link } from "react-router-dom";

import "./options.css";
import { Logout } from "../logout/Logout";
import { ButtonStyled } from "../button/ButtonStyled";

export const PanelOptions = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__container">
        <div className="sidebar__buttons">
          <Link to="/home" className="button__container">
            <ButtonStyled
              title="Chat"
              count={true}
              image="./assets/messages.svg"
            />
          </Link>
          <Link to="/home/complaints" className="button__container">
            <ButtonStyled title="Complaints" image="./assets/red-flag.png" />
          </Link>
        </div>
        <Logout />
      </div>
    </div>
  );
};
