import React from "react";
import { Outlet } from "react-router-dom";

import { useAppSelector } from "../src/redux/hooks/hooks";
import Login from "./components/login/Login";

const ProtectedRoutes = (props: any) => {
  const { isAuthenticated } = useAppSelector((state) => state.loginUser);
  return isAuthenticated ? <Outlet /> : <Login />;
};

export default ProtectedRoutes;
