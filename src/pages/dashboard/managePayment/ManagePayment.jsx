import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaCheckCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../components/loadingSpinner/LoadingSpinner";
import { Helmet } from "react-helmet";

const ManagePayment = () => {
  const axiosSecure = useAxiosSecure();
  // Get order data 
  const {
    data: orders = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/orders");
      return res?.data;
    },
  });

  // status update
  const handleAccept = async (orderId) => {
    try {
      const response = await axiosSecure.patch(`/orders/${orderId}`, {
        status: true,
      });
      console.log(response);
      if (response.data.modifiedCount > 0) {
        refetch();
        toast.success("Order status updated to Paid!");
      }
    } catch (error) {
      toast.error("Failed to update order status!");
    }
  };

  // Function to conditionally apply text color based on status
  const getStatusClass = (status) => {
    return status === false ? "text-red-500" : "text-green-500";
  };

  if(isLoading) return <LoadingSpinner></LoadingSpinner>
  return (
    <div className="p-6 min-h-screen bg-gray-100 rounded-lg">
      <Helmet>
        <title>PharmaWorld | Payment Management</title>
      </Helmet>
      <h2 className="text-xl md:text-2xl lg:text-3xl text-blue-600 font-bold mb-4">Payment Management</h2>
      <table className="w-full border-collapse border border-gray-300 text-center">
        <thead className="bg-green-500 text-white">
          <tr>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Amount</th>
            <th className="border border-gray-300 p-2">Buyer</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td
                className={`border border-gray-300 p-2 ${getStatusClass(
                  order.status
                )}`}
              >
                {order.status === false ? "Pending" : "Paid"}
              </td>
              <td className="border border-gray-300 p-2 text-gray-800">
               ${order.totalAmount}
              </td>
              <td className="border border-gray-300 p-2 text-gray-800"> {order.buyer}</td>
              <td className="border border-gray-300 p-2">
                {order.status === false ? (
                  <button
                    onClick={() => handleAccept(order._id)}
                    className="bg-green-500 text-white px-2 py-1 rounded-md"
                  >
                    Accept
                  </button>
                ) : (
                  <span className="text-green-500 flex items-center justify-center">
                    Paid <FaCheckCircle className="ml-2 text-green-500" />
                  </span>
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
