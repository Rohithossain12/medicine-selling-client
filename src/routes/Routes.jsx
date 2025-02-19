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
import CheckoutPage from "../pages/checkoutPage/CheckoutPage";
import InvoicePage from "../pages/InvoicePage/InvoicePage";
import AdminRoute from "./AdminRoute";
import SellerRoute from "./SellerRoute";

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
        element: <Shop></Shop>,
      },
      {
        path: "/checkout",
        element: <CheckoutPage></CheckoutPage>,
      },
      {
        path: "/invoice",
        element: <InvoicePage></InvoicePage>,
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
        element: (
          <AdminRoute>
            <AdminHome></AdminHome>
          </AdminRoute>
        ),
      },
      {
        path: "manageUser",
        element: (
          <AdminRoute>
            <ManageUser></ManageUser>
          </AdminRoute>
        ),
      },
      {
        path: "manageCategory",
        element: (
          <AdminRoute>
            <ManageCategory></ManageCategory>
          </AdminRoute>
        ),
      },
      {
        path: "paymentManagement",
        element: (
          <AdminRoute>
            <ManagePayment></ManagePayment>
          </AdminRoute>
        ),
      },
      {
        path: "manageAdvertise",
        element: (
          <AdminRoute>
            <ManageAdvertise></ManageAdvertise>
          </AdminRoute>
        ),
      },
      {
        path: "salesReport",
        element: (
          <AdminRoute>
            <SalesReport></SalesReport>
          </AdminRoute>
        ),

      
      },
      {
        path:"updateProfile",
        element:<UpdateProfile></UpdateProfile>
      },

      // seller only routes
      {
        path: "sellerHome",
        element: (
          <SellerRoute>
            <SellerHome></SellerHome>
          </SellerRoute>
        ),
      },
      {
        path: "manageMedicines",
        element: (
          <SellerRoute>
            <ManageMedicines></ManageMedicines>
          </SellerRoute>
        ),
      },
      {
        path: "manageMedicines",
        element: (
          <SellerRoute>
            <ManageMedicines></ManageMedicines>
          </SellerRoute>
        ),
      },
      {
        path: "paymentHistory",
        element: (
          <SellerRoute>
            <PaymentHistory></PaymentHistory>
          </SellerRoute>
        ),
      },
      {
        path: "askForAdvertisement",
        element: (
          <SellerRoute>
            <Advertisement></Advertisement>
          </SellerRoute>
        ),
      },
      {
        path: "userHome",
        element: <UserHome></UserHome>,
      },
      {
        path:"updateProfile",
        element:<UpdateProfile></UpdateProfile>
      }
    ],
  },
]);
