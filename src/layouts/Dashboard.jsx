import { useState } from "react";
import { BiCategory } from "react-icons/bi";
import { FaHistory, FaHome, FaUsers } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { RiAdvertisementFill } from "react-icons/ri";
import { TbReport } from "react-icons/tb";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex flex-col md:flex-row min-h-screen relative">
    {/* Toggle Button for Small Screens */}
    <button
      onClick={() => setIsSidebarOpen(true)}
      className="md:hidden bg-gray-700 text-white p-3 fixed top-5 left-5 z-50"
    >
      ☰ Menu
    </button>

    {/* Sidebar */}
    <div
      className={`fixed inset-y-0 left-0 bg-gray-800 text-white w-60 p-5 transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 md:translate-x-0 md:relative z-40`}
    >
      {/* Close Button for Small Screens */}
      <button
        onClick={() => setIsSidebarOpen(false)}
        className="md:hidden bg-gray-700 text-white p-2 absolute top-4 right-4"
      >
        ✖
      </button>

      <ul className="space-y-3 overflow-auto h-[calc(100vh-2rem)]">
        {/* Admin */}
        <li>
          <NavLink to="/dashboard/adminHome" className="flex items-center gap-2">
            <FaHome />
            Admin Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/manageUser" className="flex items-center gap-2">
            <FaUsers />
            Manage User
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/salesReport" className="flex items-center gap-2">
            <TbReport />
            Sales Report
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/manageCategory" className="flex items-center gap-2">
            <BiCategory />
            Manage Category
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/paymentManagement" className="flex items-center gap-2">
            <MdPayment />
            Payment Management
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/manageAdvertise" className="flex items-center gap-2">
            <RiAdvertisementFill />
            Manage Advertise
          </NavLink>
        </li>

        {/* Seller */}
        <li>
          <NavLink to="/dashboard/sellerHome" className="flex items-center gap-2">
            <FaHome />
            Seller Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/manageMedicines" className="flex items-center gap-2">
            <FaHome />
            Manage Medicines
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/paymentHistory" className="flex items-center gap-2">
            <FaHistory />
            Payment History
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/askForAdvertisement" className="flex items-center gap-2">
            <RiAdvertisementFill />
            Ask For Advertisement
          </NavLink>
        </li>

        {/* User */}
        <li>
          <NavLink to="/dashboard/userHome" className="flex items-center gap-2">
            <FaHome />
            User Home
          </NavLink>
        </li>

        {/* Home */}
        <div className="border-t border-gray-700 mt-5 pt-3">
          <li>
            <NavLink to="/" className="flex items-center gap-2">
              <FaHome />
              Home
            </NavLink>
          </li>
        </div>
      </ul>
    </div>

    {/* Main Content */}
    <div
      className={`flex-1 p-5 bg-gray-100 transition-transform duration-300 ${
        isSidebarOpen && "opacity-50 md:opacity-100"
      }`}
      onClick={() => setIsSidebarOpen(false)}
    >
      <Outlet />
    </div>
  </div>
  );
};

export default Dashboard;
