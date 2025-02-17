import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import useAdmin from "../../hooks/useAdmin";
import useSeller from "../../hooks/useSeller";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isAdmin] = useAdmin();
  const [isSeller] = useSeller();
  const [currentTime, setCurrentTime] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const location = useLocation();

  const email = user?.email;

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("You have successfully logged out.");
    } catch (error) {
      toast.error("Failed to log out. Please try again.");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const dashboardRoute = isAdmin
    ? "/dashboard/adminHome"
    : isSeller
    ? "/dashboard/sellerHome"
    : "/dashboard/userHome";

  const { data: carts = [] } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/cart/${email}`);
      return res?.data;
    },
  });

  return (
    <nav className="bg-gray-800 text-white px-4 py-3">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <div className="flex items-center">
            <img
              src="https://i.ibb.co.com/307FPxy/Fd0-Dp-VFXo-AM3-TXX-removebg-preview.png"
              alt="Logo"
              className="h-10 w-10 mr-2"
            />
            <span className="text-xl font-bold">PharmaWorld</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center text-gray-300 text-lg font-semibold">
          {currentTime}
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className={`${
              location.pathname === "/"
                ? "text-yellow-400"
                : "hover:text-gray-400"
            }`}
          >
            Home
          </Link>
          <Link
            to="/shop"
            className={`${
              location.pathname === "/shop"
                ? "text-yellow-400"
                : "hover:text-gray-400"
            }`}
          >
            Shop
          </Link>
          <Link to="/cartPage" className="relative cursor-pointer">
            <FaShoppingCart className="text-xl hover:text-gray-400" />
            <p className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {carts.length}
            </p>
          </Link>

          {user?.email ? (
            <>
              <Link
                to="/updateProfile"
                className={`hover:text-gray-400 ${
                  location.pathname === "/updateProfile"
                    ? "text-yellow-400"
                    : ""
                }`}
              >
                Profile
              </Link>
              <Link
                to={dashboardRoute}
                className={`hover:text-gray-400 ${
                  location.pathname.includes("/dashboard")
                    ? "text-yellow-400"
                    : ""
                }`}
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white"
            >
              Join Us
            </Link>
          )}
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          &#9776;
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-700 p-4 rounded mt-3 space-y-3 flex flex-col">
          <div className="text-center text-gray-300 text-lg font-semibold">
            {currentTime}
          </div>
          <Link
            to="/"
            className={`${
              location.pathname === "/"
                ? "text-yellow-400"
                : "hover:text-gray-400"
            }`}
          >
            Home
          </Link>
          <Link
            to="/shop"
            className={`${
              location.pathname === "/shop"
                ? "text-yellow-400"
                : "hover:text-gray-400"
            }`}
          >
            Shop
          </Link>
          <Link
            to="/cartPage"
            className={`${
              location.pathname === "/cartPage"
                ? "text-yellow-400"
                : "hover:text-gray-400"
            } block`}
          >
            Cart ({carts.length})
          </Link>
          {user?.email ? (
            <>
              <Link
                to="/updateProfile"
                className={`block hover:text-gray-400 ${
                  location.pathname === "/updateProfile"
                    ? "text-yellow-400"
                    : ""
                }`}
              >
                Profile
              </Link>
              <Link
                to={dashboardRoute}
                className={`block hover:text-gray-400 ${
                  location.pathname.includes("/dashboard")
                    ? "text-yellow-400"
                    : ""
                }`}
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="block text-left w-full hover:text-gray-400"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="block bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white"
            >
              Join Us
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
