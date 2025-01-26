import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { axiosSecure } from "../../hooks/useAxiosSecure";

const UserHome = () => {
  // Fetch orders data using React Query
  const {
    data: orders = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/order-details`);
      return res?.data;
    },
  });

  // Map payment history from orders data
  const payments = orders.flatMap((order) =>
    order.medicineItem.map((item) => ({
      medicine: item.itemName,
      buyer: order.buyer,
      quantity: item.quantity,
      totalPrice: item.totalPrice,
      status: order.status ? "Paid" : "Pending",
    }))
  );

  return (
    <div>
      <Helmet>
        <title>PharmaWorld | Payment History</title>
      </Helmet>
      <h2 className="text-xl md:text-2xl lg:text-3xl text-blue-600 font-bold mb-4">
        Payment History
      </h2>
      <table className="w-full border-collapse border border-gray-300 text-center">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Medicine</th>
            <th className="border border-gray-300 p-2">Buyer Email</th>
            <th className="border border-gray-300 p-2">Quantity</th>
            <th className="border border-gray-300 p-2">Total Price</th>
            <th className="border border-gray-300 p-2">Payment Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td className="border border-gray-300 p-2">{payment.medicine}</td>
              <td className="border border-gray-300 p-2">{payment.buyer}</td>
              <td className="border border-gray-300 p-2">{payment.quantity}</td>
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
  );
};

export default UserHome;
