import { useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet";

const InvoicePage = () => {
  const location = useLocation();
  const { state } = location;
  const { orderId } = location.state || {};

  console.log(orderId);

  return (
    <div className="p-8">
      <Helmet>
        <title>PharmaWorld | Invoice</title>
      </Helmet>
      <h1 className="text-2xl font-bold mb-6">Invoice</h1>
      <p className="text-xl">Thank you for your purchase!</p>
      <p className="mt-4">Total Paid: ${state?.grandTotal?.toFixed(2)}</p>
      <p className="mt-4">Transaction ID: {state?.transactionId}</p>
    </div>
  );
};

export default InvoicePage;
