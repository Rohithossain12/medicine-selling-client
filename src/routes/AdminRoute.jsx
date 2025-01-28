import React from "react";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();

  if (loading || isAdminLoading) return <LoadingSpinner />;

  if (user && isAdmin) return children;
  console.log({ user });

  // Redirect non-admins to the home page
  return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminRoute;
