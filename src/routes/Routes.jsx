import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/login/Register";
import Shop from "../components/shop/Shop";

export const router = createBrowserRouter([
    {
      path: "/",
      element:<MainLayout></MainLayout>,
      children:[
        {
          path:'/',
          element:<Home></Home>
        },
        {
          path:'/login',
          element:<Login></Login>
        },
        {
          path:'/register',
          element:<Register></Register>
        },
        {
          path:'/shop',
          element:<Shop></Shop>
        }
      ]
    },
  ]);