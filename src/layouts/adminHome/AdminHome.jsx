import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaMoneyBillWave } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { axiosSecure } from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";
import useAuth from "../../hooks/useAuth";

const AdminHome = () => {
  const { user } = useAuth();
  // Fetch orders data using React Query
  const {
    data: salesData = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["salesData"],
    queryFn: async () => {
      const res = await axiosSecure.get("/order-details");
      return res?.data;
    },
  });

  const paymentHistory = salesData.flatMap((order) =>
    order.medicineItem.map((item) => ({
      totalPrice: item.totalPrice,
      paymentStatus: order.status ? "Paid" : "Pending",
    }))
  );

  // Calculate total revenue for Paid and Pending items
  const paidTotal = paymentHistory
    .filter((sale) => sale.paymentStatus === "Paid")
    .reduce((sum, sale) => sum + sale.totalPrice, 0);

  const pendingTotal = paymentHistory
    .filter((sale) => sale.paymentStatus === "Pending")
    .reduce((sum, sale) => sum + sale.totalPrice, 0);

  const totalSalesRevenue = paidTotal + pendingTotal;

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen rounded-lg">
      <div className="text-center mb-6">
        <h2 className="text-xl md:text-2xl lg:text-3xl text-blue-600 font-bold">
          Welcome, {user?.displayName}!
        </h2>
      </div>
      <h2 className="text-xl md:text-2xl lg:text-3xl text-blue-600 font-bold mb-4">
        Admin Dashboard
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Total Sales Revenue */}
        <div className="bg-blue-500 text-white p-4 rounded-md flex items-center">
          <FaMoneyBillWave className="text-4xl mr-4" />
          <div>
            <p>Total Sales Revenue</p>
            <p className="text-xl font-bold">${totalSalesRevenue}</p>
          </div>
        </div>

        {/* Paid Total */}
        <div className="bg-yellow-500 text-white p-4 rounded-md flex items-center">
          <MdPayment className="text-4xl mr-4" />
          <div>
            <p>Paid Total</p>
            <p className="text-xl font-bold">${paidTotal}</p>
          </div>
        </div>

        {/* Pending Total */}
        <div className="bg-red-500 text-white p-4 rounded-md flex items-center">
          <MdPayment className="text-4xl mr-4" />
          <div>
            <p>Pending Total</p>
            <p className="text-xl font-bold">${pendingTotal}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
