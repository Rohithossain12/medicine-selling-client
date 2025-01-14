import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [language, setLanguage] = useState("EN");

  const user = {
    isLoggedIn: true,
    profilePicture:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEL3-iNvrv_DpFuJ_4qX1fcz5CVXeOhi_udg&s",
  };
  console.log(language);

  return (
    <nav className="bg-gray-800 text-white px-4 py-3">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and Website Name */}
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

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-gray-400">
            Home
          </Link>
          <Link to="/shop" className="hover:text-gray-400">
            Shop
          </Link>
          <div className="relative cursor-pointer">
            <FaShoppingCart className="text-xl hover:text-gray-400" />
            <p className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              0
            </p>
          </div>

          {/* Language Dropdown */}
          <div className="relative">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-gray-700 text-white rounded px-2 py-1"
            >
              <option value="EN">EN</option>
              <option value="FR">FR</option>
              <option value="ES">ES</option>
            </select>
          </div>

          {/* Conditional Rendering for User */}
          {user.isLoggedIn ? (
            <div className="relative">
              <img
                src={user.profilePicture}
                alt="Profile"
                className="h-8 w-8 rounded-full cursor-pointer"
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              />
              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 bg-white text-gray-800 rounded shadow-lg w-48">
                  <Link className="block px-4 py-2 hover:bg-gray-100">
                    Update Profile
                  </Link>
                  <Link className="block px-4 py-2 hover:bg-gray-100">
                    Dashboard
                  </Link>
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white"
            >
              Join Us
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
          >
            &#9776;
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {profileMenuOpen && (
        <div className="md:hidden mt-3 space-y-3 bg-gray-700 p-4 rounded">
          <Link to="/" className="block hover:text-gray-400">
            Home
          </Link>
          <Link to="/shop" className="block hover:text-gray-400">
            Shop
          </Link>
          <div className="flex items-center space-x-2">
            <div className="relative cursor-pointer">
              <FaShoppingCart className="text-xl hover:text-gray-400" />
              <p className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </p>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-gray-600 text-white rounded px-2 py-1"
            >
              <option value="EN">EN</option>
              <option value="FR">FR</option>
              <option value="ES">ES</option>
            </select>
          </div>
          {user.isLoggedIn ? (
            <>
              <Link className="block hover:text-gray-400">Update Profile</Link>
              <Link href="/dashboard" className="block hover:text-gray-400">
                Dashboard
              </Link>
              <button className="block text-left w-full hover:text-gray-400">
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
