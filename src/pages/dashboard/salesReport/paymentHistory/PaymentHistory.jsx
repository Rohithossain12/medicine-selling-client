import { useState } from "react";
import { Helmet } from "react-helmet";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../../components/loadingSpinner/LoadingSpinner";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  // Fetch orders data using React Query
  const {
    data: orders = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orders",user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/order-details-seller?email=${user?.email}`);
      return res?.data;
    },
  });

  const paymentHistory = orders.flatMap((order) =>
    order.medicineItem.map((item) => ({
      medicine: item.itemName,
      buyer: order.buyer,
      totalPrice: item.totalPrice,
      paymentStatus: order.status ? "Paid" : "Pending",
    }))
  );


  if(isLoading) return <LoadingSpinner></LoadingSpinner>
  return (
    <div className="container mx-auto p-4">
      <Helmet>
        <title>PharmaWorld | Payment History</title>
      </Helmet>
      <h1 className="text-xl md:text-2xl lg:text-3xl text-blue-600 font-bold mb-4">
        Payment History
      </h1>
      <table className="table-auto w-full border-collapse border border-gray-300 text-center">
        <thead className="bg-orange-300">
          <tr>
            <th className="border border-gray-300 p-2">Medicine</th>
            <th className="border border-gray-300 p-2">Buyer</th>
            <th className="border border-gray-300 p-2">Total Price</th>
            <th className="border border-gray-300 p-2">Payment Status</th>
          </tr>
        </thead>
        <tbody>
          {paymentHistory.map((payment) => (
            <tr key={payment.id}>
              <td className="border border-gray-300 p-2">{payment.medicine}</td>
              <td className="border border-gray-300 p-2">{payment.buyer}</td>
              <td className="border border-gray-300 p-2">
                ${payment.totalPrice}
              </td>
              <td className="border border-gray-300 p-2">
                <span
                  className={`${
                    payment.paymentStatus === "Paid"
                      ? "bg-green-500 text-white px-2 py-1 rounded"
                      : "bg-yellow-500 text-black px-2 py-1 rounded"
                  }`}
                >
                  {payment.paymentStatus}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
