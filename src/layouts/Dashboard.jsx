import { BiCategory } from "react-icons/bi";
import { FaBars, FaHistory, FaHome, FaUsers } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { RiAdvertisementFill } from "react-icons/ri";
import { TbReport } from "react-icons/tb";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import useSeller from "../hooks/useSeller";
import useAdmin from "../hooks/useAdmin";
import { Helmet } from "react-helmet";
import { CgProfile } from "react-icons/cg";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const [isSeller] = useSeller();

  return (
    <div className="drawer lg:drawer-open">
      <Helmet>
        <title>PharmaWorld | Dashboard</title>
      </Helmet>
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content flex flex-col md:flex-row justify-between items-stretch">
        {/* Hamburger Menu for Small Devices */}
        <label
          htmlFor="my-drawer-2"
          className="mt-5 ml-5 drawer-button lg:hidden"
        >
          <FaBars size={24} />
        </label>

        {/* Content Container */}
        <div className="container mx-auto px-4 md:px-8 py-5">
          <div className="bg-white rounded-lg p-5 overflow-x-auto flex-grow">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          className="drawer-overlay lg:hidden"
        ></label>
        <div className="menu bg-neutral text-white min-h-full w-60 p-5">
          {/* Sidebar Items */}
          {isAdmin && (
            <>
              <NavLink
                to="/dashboard/adminHome"
                className={({ isActive }) =>
                  `flex items-center gap-2 py-2 font-bold ${
                    isActive ? "text-yellow-400" : ""
                  }`
                }
              >
                <FaHome size={15} /> Admin Home
              </NavLink>
              <NavLink
                to="/dashboard/salesReport"
                className={({ isActive }) =>
                  `flex items-center gap-2 py-2 font-bold ${
                    isActive ? "text-yellow-400" : ""
                  }`
                }
              >
                <TbReport size={15} /> Sales Report
              </NavLink>
              <NavLink
                to="/dashboard/manageUser"
                className={({ isActive }) =>
                  `flex items-center gap-2 py-2 font-bold ${
                    isActive ? "text-yellow-400" : ""
                  }`
                }
              >
                <FaUsers size={15} /> Manage User
              </NavLink>
              <NavLink
                to="/dashboard/manageCategory"
                className={({ isActive }) =>
                  `flex items-center gap-2 py-2 font-bold ${
                    isActive ? "text-yellow-400" : ""
                  }`
                }
              >
                <BiCategory size={15} /> Manage Category
              </NavLink>
              <NavLink
                to="/dashboard/paymentManagement"
                className={({ isActive }) =>
                  `flex items-center gap-2 py-2 font-bold ${
                    isActive ? "text-yellow-400" : ""
                  }`
                }
              >
                <MdPayment size={15} /> Payment Management
              </NavLink>
              <NavLink
                to="/dashboard/manageAdvertise"
                className={({ isActive }) =>
                  `flex items-center gap-2 py-2 font-bold ${
                    isActive ? "text-yellow-400" : ""
                  }`
                }
              >
                <RiAdvertisementFill size={15} /> Manage Advertisement
              </NavLink>
              <NavLink
                to="/dashboard/updateProfile"
                className={({ isActive }) =>
                  `flex items-center gap-2 py-2 font-bold ${
                    isActive ? "text-yellow-400" : ""
                  }`
                }
              >
                <CgProfile size={15} /> Profile
              </NavLink>
            </>
          )}

          {isSeller && !isAdmin && (
            <>
              <NavLink
                to="/dashboard/sellerHome"
                className={({ isActive }) =>
                  `flex items-center gap-2 ${isActive ? "text-yellow-400" : ""}`
                }
              >
                <FaHome /> Seller Home
              </NavLink>
              <NavLink
                to="/dashboard/manageMedicines"
                className={({ isActive }) =>
                  `flex items-center gap-2 ${isActive ? "text-yellow-400" : ""}`
                }
              >
                <FaHome /> Manage Medicines
              </NavLink>
              <NavLink
                to="/dashboard/paymentHistory"
                className={({ isActive }) =>
                  `flex items-center gap-2 ${isActive ? "text-yellow-400" : ""}`
                }
              >
                <FaHistory /> Payment History
              </NavLink>
              <NavLink
                to="/dashboard/askForAdvertisement"
                className={({ isActive }) =>
                  `flex items-center gap-2 ${isActive ? "text-yellow-400" : ""}`
                }
              >
                <RiAdvertisementFill /> Ask For Advertisement
              </NavLink>
            </>
          )}

          {!isAdmin && !isSeller && (
            <>
              <NavLink
                to="/dashboard/userHome"
                className={({ isActive }) =>
                  `flex items-center gap-2 py-2 ${
                    isActive ? "text-yellow-400" : ""
                  }`
                }
              >
                <FaHome /> User Home
              </NavLink>
              <NavLink
                to="/dashboard/updateProfile"
                className={({ isActive }) =>
                  `flex items-center gap-2 py-2  ${
                    isActive ? "text-yellow-400" : ""
                  }`
                }
              >
                <CgProfile /> Profile
              </NavLink>
            </>
          )}

          {/* Home Link for All */}
          <div className="border-t border-gray-700 mt-5 pt-3">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-2 py-2 font-bold ${
                  isActive ? "text-yellow-400" : ""
                }`
              }
            >
              <FaHome size={15} /> Home
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
