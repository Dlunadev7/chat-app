import React from "react";
import { Outlet } from "react-router-dom";

import { Header } from "../components/header/Header";
import { BothNavbar } from "../components/both/BothNavbar";
import { PanelOptions } from "../components/panel/Options";

export const HomeScreen = () => {
  return (
    <>
      <Header />
      <main className="main">
        <div className="main__container">
          <PanelOptions />
          <Outlet />
          <BothNavbar />
        </div>
      </main>
    </>
  );
};
