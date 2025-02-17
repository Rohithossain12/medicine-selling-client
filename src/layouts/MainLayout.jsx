import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";

const MainLayout = () => {
  const location = useLocation();
  const noHeaderFooter =
    location.pathname.includes("login") ||
    location.pathname.includes("register");
  return (
    <div>
      {/* Navbar */}
      {noHeaderFooter || <Navbar></Navbar>}
      <div className="min-h-[calc(100vh-180px)] container mx-auto px-5">
        <Outlet></Outlet>
      </div>
      {/* Footer */}
      {noHeaderFooter || <Footer></Footer>}
    </div>
  );
};

export default MainLayout;
