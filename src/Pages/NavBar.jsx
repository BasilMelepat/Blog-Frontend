import React from "react";
import Nav from "../components/nav";
import { Outlet } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};

export default NavBar;
