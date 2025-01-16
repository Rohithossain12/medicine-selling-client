import React, { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (user && user?.email) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace="true" />;
};

export default PrivateRoute;
