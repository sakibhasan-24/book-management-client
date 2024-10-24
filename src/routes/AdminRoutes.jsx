import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function AdminRoutes({ children }) {
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  if (!currentUser) {
    return (
      <Navigate
        to="/user-credentials/login"
        state={{ from: location }}
        replace
      />
    );
  }
  if (!currentUser.user?.isAdmin) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
}
