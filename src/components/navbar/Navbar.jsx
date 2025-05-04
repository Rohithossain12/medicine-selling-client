import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import useAdmin from "../../hooks/useAdmin";
import useSeller from "../../hooks/useSeller";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isAdmin] = useAdmin();
  const [isSeller] = useSeller();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const email = user?.email;

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("You have successfully logged out.");
    } catch (error) {
      toast.error("Failed to log out. Please try again.");
    }
  };

  const dashboardRoute = isAdmin
    ? "/dashboard/adminHome"
    : isSeller
    ? "/dashboard/sellerHome"
    : "/dashboard/userHome";

  const { data: carts = [],refetch } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/cart/${email}`);
      return res?.data;
    },
  });
  

  return (
    <nav className="bg-gray-900 text-white px-4 py-3 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo and Brand Name */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="https://i.ibb.co/307FPxy/Fd0-Dp-VFXo-AM3-TXX-removebg-preview.png"
            alt="Logo"
            className="h-10 w-10"
          />
          <span className="text-xl font-bold">PharmaWorld</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 items-center">
          <Link
            to="/"
            className={`px-3 py-2 rounded-md ${
              location.pathname === "/"
                ? "text-yellow-400 bg-gray-800"
                : "hover:bg-gray-700"
            }`}
          >
            Home
          </Link>
          <Link
            to="/shop"
            className={`px-3 py-2 rounded-md ${
              location.pathname === "/shop"
                ? "text-yellow-400 bg-gray-800"
                : "hover:bg-gray-700"
            }`}
          >
            Shop
          </Link>
          <Link
            to="/cartPage"
            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-700 rounded-md"
          >
            <FaShoppingCart className="text-xl" />
            <span>Cart</span>
            <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {carts.length}
            </span>
          </Link>
          {user?.email ? (
            <>
              <Link
                to="/updateProfile"
                className={`px-3 py-2 rounded-md ${
                  location.pathname === "/updateProfile"
                    ? "text-yellow-400 bg-gray-800"
                    : "hover:bg-gray-700"
                }`}
              >
                Profile
              </Link>
              <Link
                to={dashboardRoute}
                className={`px-3 py-2 rounded-md ${
                  location.pathname.includes("/dashboard")
                    ? "text-yellow-400 bg-gray-800"
                    : "hover:bg-gray-700"
                }`}
              >
                Dashboard
              </Link>

                 {user?.photoURL && (
                <img
                  src={user?.photoURL}
                  alt="Profile"
                  className="h-10 w-10 rounded-full border border-gray-400"
                />
              )}
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
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Join Us
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 px-4 py-2 space-y-3 bg-gray-900 rounded-xl shadow-lg">
          <Link
            to="/"
            className={`flex items-center gap-2 px-3 py-2 rounded-md ${
              location.pathname === "/"
                ? "text-yellow-400 bg-gray-800"
                : "hover:bg-gray-700"
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            🏠 Home
          </Link>
          <Link
            to="/shop"
            className={`flex items-center gap-2 px-3 py-2 rounded-md ${
              location.pathname === "/shop"
                ? "text-yellow-400 bg-gray-800"
                : "hover:bg-gray-700"
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            🛒 Shop
          </Link>
          <Link
            to="/cartPage"
            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-700 rounded-md"
            onClick={() => setMobileMenuOpen(false)}
          >
            <FaShoppingCart className="text-xl" />
            <span>Cart</span>
            <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {carts.length}
            </span>
          </Link>
          {user?.email ? (
            <>
              <Link
                to="/updateProfile"
                className={`flex items-center gap-2 px-3 py-2 rounded-md ${
                  location.pathname === "/updateProfile"
                    ? "text-yellow-400 bg-gray-800"
                    : "hover:bg-gray-700"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                👤 Profile
              </Link>
              <Link
                to={dashboardRoute}
                className={`flex items-center gap-2 px-3 py-2 rounded-md ${
                  location.pathname.includes("/dashboard")
                    ? "text-yellow-400 bg-gray-800"
                    : "hover:bg-gray-700"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                📊 Dashboard
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="bg-blue-500 hover:bg-blue-600 w-full text-center px-4 py-2 rounded text-white font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-blue-500 hover:bg-blue-600 w-full text-center px-4 py-2 rounded text-white font-medium block"
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
