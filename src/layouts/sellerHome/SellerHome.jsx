import { useQuery } from "@tanstack/react-query";

import { Helmet } from "react-helmet";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";
import useAuth from "../../hooks/useAuth";
const SellerHome = () => {
  const axiosSecure = useAxiosSecure();
  const {user}=useAuth()
  // Fetch orders data using React Query
  const {
    data: salesData = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["salesData",user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/order-details-seller?email=${user.email}`);
      return res?.data;
    },
  });

  console.log(salesData)

  const paymentHistory = salesData.flatMap((order) =>
    order.medicineItem.map((item) => ({
      medicine: item.itemName,
      buyer: order.buyer,
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

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Helmet>
        <title>PharmaWorld | Seller Home</title>
      </Helmet>
      <div className="text-center mb-6">
        <h2 className="text-xl md:text-2xl lg:text-3xl text-blue-600 font-bold">
          Welcome, {user?.displayName}!
        </h2>
      </div>

      <h1 className="text-xl md:text-2xl lg:text-3xl text-blue-600 font-bold mb-4">
        Seller Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
        <div className="p-4 bg-green-100 border border-green-500 rounded">
          <h2 className="text-xl font-semibold text-gray-800">Paid Total</h2>
          <p className="text-2xl font-bold text-green-600">${paidTotal}</p>
        </div>
        <div className="p-4 bg-yellow-100 border border-yellow-500 rounded">
          <h2 className="text-xl font-semibold text-gray-800">Pending Total</h2>
          <p className="text-2xl font-bold text-yellow-600">${pendingTotal}</p>
        </div>
      </div>
      <h2 className="text-xl text-green-500 font-bold mt-6 mb-4">
        Sales Details
      </h2>
      <table className="table-auto w-full border-collapse border border-gray-300 text-center">
        <thead className="bg-green-500 text-white">
          <tr>
            <th className="border border-gray-300 p-2">Medicine</th>
            <th className="border border-gray-300 p-2">Price</th>
            <th className="border border-gray-300 p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {paymentHistory.map((sale, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2 text-gray-800">{sale.medicine}</td>
              <td className="border border-gray-300 p-2 text-gray-800">${sale.totalPrice}</td>
              <td
                className={`border border-gray-300 p-2 ${
                  sale.paymentStatus === "Paid"
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                {sale.paymentStatus}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SellerHome;
