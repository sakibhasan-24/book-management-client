import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function PrivateRoutes({ children }) {
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

  return children;
}
