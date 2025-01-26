import React from "react";
import { FaMoneyBillWave } from "react-icons/fa";
import { MdPayment } from "react-icons/md";

const AdminHome = () => {
  return (
    <div className="mb-8">
      <h1 className="text-xl md:text-2xl lg:text-3xl text-green-500 font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-500 text-white p-4 rounded-md flex items-center">
          <FaMoneyBillWave className="text-4xl mr-4" />
          <div>
            <p>Total Sales Revenue</p>
            <p className="text-xl font-bold">$10,000</p>
          </div>
        </div>
        <div className="bg-yellow-500 text-white p-4 rounded-md flex items-center">
          <MdPayment className="text-4xl mr-4" />
          <div>
            <p>Paid Total</p>
            <p className="text-xl font-bold">$8,000</p>
          </div>
        </div>
        <div className="bg-red-500 text-white p-4 rounded-md flex items-center">
          <MdPayment className="text-4xl mr-4" />
          <div>
            <p>Pending Total</p>
            <p className="text-xl font-bold">$2,000</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
