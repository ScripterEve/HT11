import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/authContext";

const ProtectedRoutes = () => {
  const { isAuthenticated } = useContext(AuthContext);

  console.log(isAuthenticated);
  return isAuthenticated ? <Outlet/> : <Navigate to="/login" />
};

export default ProtectedRoutes;