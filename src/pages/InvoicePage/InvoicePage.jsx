import React from "react";
import { useLocation } from "react-router-dom";

const InvoicePage = () => {
  const location = useLocation();
  const { state } = location;
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Invoice</h1>
      <p className="text-xl">Thank you for your purchase!</p>
      <p className="mt-4">Total Paid: ${state?.grandTotal?.toFixed(2)}</p>
    </div>
  );
};

export default InvoicePage;
