import React, { useState } from "react";

const ManagePayment = () => {
  const [payments, setPayments] = useState([
    { id: 1, status: "pending", amount: "$200", buyer: "hablu@.com" },
    { id: 2, status: "paid", amount: "$500", buyer: "hablu2@.com" },
  ]);
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Payment Management</h2>
      <table className="w-full border-collapse border border-gray-300 text-center">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Amount</th>
            <th className="border border-gray-300 p-2">Buyer</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((pay) => (
            <tr key={pay.id}>
              <td className="border border-gray-300 p-2">{pay.status}</td>
              <td className="border border-gray-300 p-2">{pay.amount}</td>
              <td className="border border-gray-300 p-2">{pay.buyer}</td>
              <td className="border border-gray-300 p-2">
                {pay.status === "pending" && (
                  <button className="bg-green-500 text-white px-2 py-1 rounded-md">
                    Accept
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagePayment;
