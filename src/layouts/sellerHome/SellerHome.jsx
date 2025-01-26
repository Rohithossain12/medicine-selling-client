import React, { useState } from "react";
import { Helmet } from "react-helmet";

const SellerHome = () => {
  const [salesData] = useState([
    { id: 1, medicine: "Paracetamol", price: 100, status: "Paid" },
    { id: 2, medicine: "Ibuprofen", price: 150, status: "Pending" },
    { id: 3, medicine: "Amoxicillin", price: 200, status: "Paid" },
    { id: 4, medicine: "Ciprofloxacin", price: 120, status: "Pending" },
  ]);
  // Calculate total revenue
  const paidTotal = salesData
    .filter((sale) => sale.status === "Paid")
    .reduce((sum, sale) => sum + sale.price, 0);

  const pendingTotal = salesData
    .filter((sale) => sale.status === "Pending")
    .reduce((sum, sale) => sum + sale.price, 0);
  return (
    <div className="container mx-auto p-4">
      <Helmet>
        <title>PharmaWorld | Seller Home</title>
      </Helmet>
      <h1 className="text-xl md:text-2xl lg:text-3xl text-blue-600 font-bold mb-4">Seller Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
        <div className="p-4 bg-green-100 border border-green-500 rounded">
          <h2 className="text-xl font-semibold">Paid Total</h2>
          <p className="text-2xl font-bold text-green-600">${paidTotal}</p>
        </div>
        <div className="p-4 bg-yellow-100 border border-yellow-500 rounded">
          <h2 className="text-xl font-semibold">Pending Total</h2>
          <p className="text-2xl font-bold text-yellow-600">${pendingTotal}</p>
        </div>
      </div>
      <h2 className="text-xl text-green-500 font-bold mt-6 mb-4">Sales Details</h2>
      <table className="table-auto w-full border-collapse border border-gray-300 text-center">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Medicine</th>
            <th className="border border-gray-300 p-2">Price</th>
            <th className="border border-gray-300 p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map((sale) => (
            <tr key={sale.id}>
              <td className="border border-gray-300 p-2">{sale.medicine}</td>
              <td className="border border-gray-300 p-2">${sale.price}</td>
              <td
                className={`border border-gray-300 p-2 ${
                  sale.status === "Paid" ? "text-green-600" : "text-yellow-600"
                }`}
              >
                {sale.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SellerHome;
