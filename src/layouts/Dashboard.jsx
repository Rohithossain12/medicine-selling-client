import { BiCategory } from "react-icons/bi";
import { FaHistory, FaHome, FaUsers } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { RiAdvertisementFill } from "react-icons/ri";
import { TbReport } from "react-icons/tb";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex container mx-auto px-5 mt-10 gap-5">
      {/* dashboard Side bar */}
      <div className="w-60 min-h-screen bg-gray-200">
        <ul className="menu p-3">
          {/* Admin */}
          <li>
            <NavLink to="/dashboard/adminHome">
              <FaHome></FaHome>
              Admin Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/manageUser">
              <FaUsers></FaUsers>
              Manage User
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/salesReport">
              <TbReport></TbReport>
              Sales Report
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/manageCategory">
              <BiCategory></BiCategory>
              Manage Category
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/paymentManagement">
              <MdPayment></MdPayment>
              Payment Management
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/manageAdvertise">
              <RiAdvertisementFill></RiAdvertisementFill>
              Manage Advertise
            </NavLink>
          </li>
          {/* Seller */}
          <li>
            <NavLink to="/dashboard/sellerHome">
              <FaHome></FaHome>
              Seller Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/manageMedicines">
              <FaHome></FaHome>
              Manage Medicines
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/paymentHistory">
              <FaHistory></FaHistory>
              Payment History
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/askForAdvertisement">
              <RiAdvertisementFill></RiAdvertisementFill>
              Ask For Advertisement
            </NavLink>
          </li>
          {/* User */}
          <li>
            <NavLink to="/dashboard/userHome">
              <FaHome></FaHome>
              User Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/userPaymentHistory">
              <FaHome></FaHome>
              Payment History
            </NavLink>
          </li>
        </ul>
      </div>
      {/* Dashboard Content */}
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
