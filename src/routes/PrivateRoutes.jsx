import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function PrivateRoutes({ children }) {
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const deliveryManAccessiblePages = [
    "/dashboard/profile",
    "/dashboard/assigned-orders",
  ];

  if (!currentUser) {
    return (
      <Navigate
        to="/user-credentials/login"
        state={{ from: location }}
        replace
      />
    );
  }
  if (
    currentUser?.user?.role === "deliveryMan" &&
    !deliveryManAccessiblePages.includes(location.pathname)
  ) {
    return (
      <Navigate to="/dashboard/profile" state={{ from: location }} replace />
    );
  }
  return children;
}
