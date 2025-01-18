import { BiCategory } from "react-icons/bi";
import { FaBars, FaHistory, FaHome, FaUsers } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { RiAdvertisementFill } from "react-icons/ri";
import { TbReport } from "react-icons/tb";
import { NavLink, Outlet } from "react-router-dom";
import useSeller from "../hooks/useSeller";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const [isSeller] = useSeller();
  return (
    <div className="drawer lg:drawer-open">
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
        <ul className="menu bg-neutral text-white min-h-full w-60 p-5">
          {/* Sidebar Items */}
          {isAdmin && (
            <>
              {/* Admin Menu */}
              <li>
                <NavLink
                  to="/dashboard/adminHome"
                  className="flex items-center gap-2"
                >
                  <FaHome />
                  Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/salesReport"
                  className="flex items-center gap-2"
                >
                  <TbReport />
                  Sales Report
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/manageUser"
                  className="flex items-center gap-2"
                >
                  <FaUsers />
                  Manage User
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/manageCategory"
                  className="flex items-center gap-2"
                >
                  <BiCategory />
                  Manage Category
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/paymentManagement"
                  className="flex items-center gap-2"
                >
                  <MdPayment />
                  Payment Management
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/manageAdvertise"
                  className="flex items-center gap-2"
                >
                  <RiAdvertisementFill />
                  Manage Advertisement
                </NavLink>
              </li>
            </>
          )}

          {isSeller && !isAdmin && (
            <>
              {/* Seller Menu */}
              <li>
                <NavLink
                  to="/dashboard/sellerHome"
                  className="flex items-center gap-2"
                >
                  <FaHome />
                  Seller Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/manageMedicines"
                  className="flex items-center gap-2"
                >
                  <FaHome />
                  Manage Medicines
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/paymentHistory"
                  className="flex items-center gap-2"
                >
                  <FaHistory />
                  Payment History
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/askForAdvertisement"
                  className="flex items-center gap-2"
                >
                  <RiAdvertisementFill />
                  Ask For Advertisement
                </NavLink>
              </li>
            </>
          )}

          {!isAdmin && !isSeller && (
            <>
              {/* User Menu */}
              <li>
                <NavLink
                  to="/dashboard/userHome"
                  className="flex items-center gap-2"
                >
                  <FaHome />
                  User Home
                </NavLink>
              </li>
            </>
          )}

          {/* Home Link for All */}
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
    </div>
  );
};

export default Dashboard;
