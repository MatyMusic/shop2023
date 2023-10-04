import React from "react";
import { useSelector } from "react-redux";
import { Outlet, NavLink } from "react-router-dom";

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo && userInfo.isAdmin ? (
    <Outlet />
  ) : (
    <NavLink to="/login" replace />
  );
};

export default AdminRoute;
