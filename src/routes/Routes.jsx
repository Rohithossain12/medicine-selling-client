import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/login/Register";
import Shop from "../components/shop/Shop";
import ErrorPage from "../pages/errorPage/ErrorPage";
import PrivateRoute from "./privateRoute/PrivateRoute";
import Dashboard from "../layouts/Dashboard";
import AdminHome from "../layouts/adminHome/AdminHome";
import ManageUser from "../pages/dashboard/manageUser/ManageUser";
import ManageCategory from "../pages/dashboard/manageCategory/ManageCategory";
import ManagePayment from "../pages/dashboard/managePayment/ManagePayment";
import ManageAdvertise from "../pages/dashboard/manageAdvertise/ManageAdvertise";
import SalesReport from "../pages/dashboard/salesReport/SalesReport";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/shop",
        element: (
          <PrivateRoute>
            <Shop></Shop>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      // admin only routes

      {
        path: "adminHome",
        element: <AdminHome></AdminHome>,
      },
      {
        path: "manageUser",
        element: <ManageUser></ManageUser>,
      },
      {
        path: "manageCategory",
        element: <ManageCategory></ManageCategory>,
      },
      {
        path: "paymentManagement",
        element: <ManagePayment></ManagePayment>,
      },
      {
        path: "manageAdvertise",
        element: <ManageAdvertise></ManageAdvertise>,
      },
      {
        path: "salesReport",
        element: <SalesReport></SalesReport>,
      },
    ],
  },
]);
