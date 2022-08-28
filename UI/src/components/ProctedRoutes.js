import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contextPage/Context";

function ProctedRoutes() {
  const { currentUser } = useAuth();
  console.log(currentUser);
  //   const navigate = useNavigate();

  return <div>{currentUser ? <Outlet /> : <Navigate to="/login" />}</div>;
}

export default ProctedRoutes;
