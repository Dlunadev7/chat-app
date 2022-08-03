import React from "react";

import { Bell } from "../bell/Bell";
import { Search } from "../search/Search";
import { User } from "../user/User";
import "./header.css";

export const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <Search />
        <div className="header__user__section">
          <User />
          <Bell />
        </div>
      </div>
    </header>
  );
};
