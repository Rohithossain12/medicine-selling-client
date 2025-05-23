import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const CartPage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const email = user?.email;

  // Get add to cart data
  const {
    data: carts = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["cart", email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/cart/${email}`);
      return res?.data;
    },
  });

  // Calculate total price
  const getTotalPrice = () => {
    return carts.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const handleQuantityChange = async (itemId, quantity) => {
    try {
      const res = await axiosSecure.put(`/cart/${itemId}`, { quantity });
      if (res.data.success) {
        toast.success("Quantity updated successfully!");
        refetch(); 
      }
    } catch (error) {
      toast.error("Failed to update quantity. Please try again.");
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      const res = await axiosSecure.delete(`/cart/${id}`);
      if (res.data.deletedCount > 0) {
        toast.success("Item removed from cart!");
        refetch();
      }
    } catch (error) {
      toast.error("Failed to remove item. Please try again.");
    }
  };

  const handleClearCart = async () => {
    try {
      const res = await axiosSecure.delete(`/cart`);
      console.log(res);
      if (res.data.deletedCount > 0) {
        toast.success("All items cleared from cart!");
        refetch();
      }
    } catch (error) {
      toast.error("Failed to clear cart. Please try again.");
    }
  };

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="p-6 mt-10 bg-gray-100 rounded-lg mb-10 min-h-screen ">
      <Helmet>
        <title>PharmaWorld | Cart</title>
      </Helmet>
      <h1 className="text-xl md:text-2xl lg:text-3xl text-blue-600 font-bold mb-6 text-center">
        My Cart
      </h1>
      {carts.length === 0 ? (
        <p className="text-center text-xl md:text-2xl lg:text-2xl ">
          MY cart is empty..!
        </p>
      ) : (
        <div>
          <div className="overflow-x-auto text-center">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-green-500 text-white">
                  <th className="border border-gray-300 px-4 py-2">
                    Medicine Name
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Company</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Price per Unit
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Quantity</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Total Price
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {carts.map((item) => (
                  <tr key={item._id} className="text-gray-800">
                    <td className="border border-gray-300 px-4 py-2">
                      {item.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {item.company}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      $ {item.price}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() =>
                            handleQuantityChange(item._id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                          className="text-gray-700"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            handleQuantityChange(item._id, item.quantity + 1)
                          }
                          className="text-gray-700"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      ${item.price * item.quantity}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        onClick={() => handleRemoveItem(item._id)}
                        className="text-red-600 hover:underline"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex justify-between items-center">
            <button
              onClick={handleClearCart}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Clear Cart
            </button>
            <button
              onClick={() =>
                navigate("/checkout", {
                  state: {
                    grandTotal: getTotalPrice(),
                    medicineItems: carts.map((item) => ({
                      id: item.medicineId,
                      quantity: item.quantity,
                    })),
                  },
                })
              }
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
