import React from "react";
import { Outlet } from "react-router-dom";
import AppHeader from "./AppHeader";

const AppLayout = () => {
  return (
    <>
      <AppHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default AppLayout;
