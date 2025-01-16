import jsPDF from "jspdf";
import "jspdf-autotable";
import React, { useState } from "react";

const SalesReport = () => {
  const [salesData, setSalesData] = useState([
    {
      id: 1,
      medicineName: "Paracetamol",
      sellerEmail: "hablu@gmail.com",
      buyerEmail: "hablu1@gmail.com",
      totalPrice: 100,
    },
    {
      id: 2,
      medicineName: "Amoxicillin",
      sellerEmail: "hablu2@example.com",
      buyerEmail: "hablu3@example.com",
      totalPrice: 200,
    },
  ]);

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Sales Report", 14, 20);

    doc.setFontSize(12);
    doc.text("Generated on: " + new Date().toLocaleDateString(), 14, 30);

    const headers = [
      ["Medicine Name", "Seller Email", "Buyer Email", "Total Price"],
    ];

    const data = salesData.map((row) => [
      row.medicineName,
      row.sellerEmail,
      row.buyerEmail,
      `$${row.totalPrice}`,
    ]);

    // Adding table
    doc.autoTable({
      startY: 40,
      head: headers,
      body: data,
    });

    doc.save("Sales_Report.pdf");
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Sales Report</h2>

      <table className="table-auto w-full border-collapse border border-gray-300 mb-4">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Medicine Name</th>
            <th className="border border-gray-300 p-2">Seller Email</th>
            <th className="border border-gray-300 p-2">Buyer Email</th>
            <th className="border border-gray-300 p-2">Total Price</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map((sale) => (
            <tr key={sale.id}>
              <td className="border border-gray-300 p-2">
                {sale.medicineName}
              </td>
              <td className="border border-gray-300 p-2">{sale.sellerEmail}</td>
              <td className="border border-gray-300 p-2">{sale.buyerEmail}</td>
              <td className="border border-gray-300 p-2">${sale.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={downloadPDF}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Download PDF
      </button>
    </div>
  );
};

export default SalesReport;
