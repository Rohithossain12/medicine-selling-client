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
import SellerHome from "../layouts/sellerHome/SellerHome";
import ManageMedicines from "../pages/dashboard/sellerDashboard/manageMedicines/ManageMedicines";
import PaymentHistory from "../pages/dashboard/salesReport/paymentHistory/PaymentHistory";
import Advertisement from "../pages/dashboard/sellerAdvertisement/Advertisement";
import UserHome from "../layouts/userHome/UserHome";
import CategoryDetails from "../pages/home/category/CategoryDetails";
import CartPage from "../pages/CartPage/CartPage";
import UpdateProfile from "../components/updateProfile/UpdateProfile";

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
        path: "/cartPage",
        element: <CartPage></CartPage>,
      },
      {
        path: "/categoryDetails/:categoryName",
        element: <CategoryDetails></CategoryDetails>,
      },
      {
        path: "/updateProfile",
        element: <UpdateProfile></UpdateProfile>,
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

      // seller only routes
      {
        path: "sellerHome",
        element: <SellerHome></SellerHome>,
      },
      {
        path: "manageMedicines",
        element: <ManageMedicines></ManageMedicines>,
      },
      {
        path: "manageMedicines",
        element: <ManageMedicines></ManageMedicines>,
      },
      {
        path: "paymentHistory",
        element: <PaymentHistory></PaymentHistory>,
      },
      {
        path: "askForAdvertisement",
        element: <Advertisement></Advertisement>,
      },
      {
        path: "userHome",
        element: <UserHome></UserHome>,
      },
    ],
  },
]);
