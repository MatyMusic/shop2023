import React from "react";
import { useSelector } from "react-redux";
import { Outlet, NavLink } from "react-router-dom";

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo ? <Outlet /> : <NavLink to="/login" replace />;
};

export default PrivateRoute;
