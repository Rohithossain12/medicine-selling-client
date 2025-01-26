import { useState } from "react";
import { Helmet } from "react-helmet";

const PaymentHistory = () => {
  const [paymentHistory, setPaymentHistory] = useState([
    {
      id: 1,
      medicine: "Paracetamol",
      buyer: "hablu1@gmail.com",
      totalPrice: 100,
      paymentStatus: "Paid",
    },
    {
      id: 2,
      medicine: "Amoxicillin",
      buyer: "hablu2@gmail.com",
      totalPrice: 150,
      paymentStatus: "Pending",
    },
  ]);
  return (
    <div className="container mx-auto p-4">
      <Helmet>
        <title>PharmaWorld | Payment History</title>
      </Helmet>
      <h1 className="text-xl md:text-2xl lg:text-3xl text-blue-600 font-bold mb-4">Payment History</h1>
      <table className="table-auto w-full border-collapse border border-gray-300 text-center">
        <thead>
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
