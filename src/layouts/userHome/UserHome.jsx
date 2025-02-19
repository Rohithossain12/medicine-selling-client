import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { axiosSecure } from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";
import useAuth from "../../hooks/useAuth";

const UserHome = () => {
  const { user } = useAuth();
  // Fetch orders data using React Query
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/order-details?email=${user?.email}`);
      return res?.data;
    },
  });

  // Map payment history from orders data
  const payments = orders.flatMap((order) =>
    order.medicineItem.map((item) => ({
      medicine: item.itemName,
      buyer: order.buyer,
      transactionId: order.transactionId,
      quantity: item.quantity,
      totalPrice: item.totalPrice,
      status: order.status ? "Paid" : "Pending",
    }))
  );
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen rounded-lg">
      <Helmet>
        <title>PharmaWorld | Payment History</title>
      </Helmet>
      <div className="text-center mb-6">
        <h2 className="text-xl md:text-2xl lg:text-3xl text-blue-600 font-bold">
          Welcome, {user?.displayName}!
        </h2>
      </div>
      <h2 className="text-xl md:text-2xl lg:text-3xl text-blue-600 font-bold mb-4">
        Payment History
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-center bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-green-400 text-white">
            <tr>
              <th className="border border-gray-300 p-2">Medicine</th>
              <th className="border border-gray-300 p-2">Buyer Email</th>
              <th className="border border-gray-300 p-2">Quantity</th>
              <th className="border border-gray-300 p-2">Transaction ID</th>
              <th className="border border-gray-300 p-2">Price</th>
              <th className="border border-gray-300 p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={index} className="hover:bg-gray-100 text-gray-800">
                <td className="border border-gray-300 p-2">
                  {payment.medicine}
                </td>
                <td className="border border-gray-300 p-2">{payment.buyer}</td>
                <td className="border border-gray-300 p-2">
                  {payment.quantity}
                </td>
                <td className="border border-gray-300 p-2">
                  {payment.transactionId}
                </td>
                <td className="border border-gray-300 p-2">
                  ${payment.totalPrice}
                </td>
                <td className="border border-gray-300 p-2">
                  <span
                    className={`${
                      payment.status === "Paid" ? "bg-green-500" : "bg-red-500"
                    } text-white px-2 py-1 rounded-md`}
                  >
                    {payment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserHome;
