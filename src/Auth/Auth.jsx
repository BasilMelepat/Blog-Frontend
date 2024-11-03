import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export function InnerAuth() {
  const token = (localStorage.getItem("token")||localStorage.getItem("Admintoken"));
  return token ? <Outlet /> : <Navigate to="signin" />;
}

export function OuterAuth() {
  const token = (localStorage.getItem("token")||localStorage.getItem("Admintoken"));
  return token ? <Navigate to="/" /> : <Outlet />;
}

export function AdminInnerAuth() {
  const token = localStorage.getItem("Admintoken");

  return token ? <Outlet/> : <Navigate to="/adminLogin" />;
}

export function AdminOuterAuth() {
  const token = localStorage.getItem("Admintoken");
  return token ? <Navigate to="/adminDashboard" /> : <Outlet />;
}
