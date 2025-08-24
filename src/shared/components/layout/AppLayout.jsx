import React from "react";
import { Outlet } from "react-router-dom";
import { AppHeader } from "./AppHeader.jsx";

export function AppLayout() {
  return (
    <>
      <AppHeader />
      <Outlet />
    </>
  );
}
