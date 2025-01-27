import { useState } from "react";
import LoadingSpinner from "../../../components/loadingSpinner/LoadingSpinner";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const CategoryDetails = () => {
  const { categoryName } = useParams();
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [disabledProducts, setDisabledProducts] = useState([]);

  // Get category data
  const {
    data: medicines = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["medicines", categoryName],
    queryFn: async () => {
      const res = await axiosPublic.get(`/medicines?category=${categoryName}`);
      return res?.data;
    },
  });

  const handleAddToCart = async (medicine) => {
    try {
      // Assuming you have a POST API for adding to the cart
      await axiosSecure.post("/cart", {
        userId: user?.id,
        medicineId: medicine._id,
        name: medicine.itemName,
        company: medicine.company,
        quantity: 1,
        price: medicine.perUnitPrice,
        email: user.email,
      });

      // Update the state to disable the button for this product
      setDisabledProducts((prev) => [...prev, medicine._id]);

      // Show success toast
      toast.success(`${medicine.itemName} added to the cart!`);

      // Refetch medicines data to get the updated state
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add the medicine to the cart.");
    }
  };

  const handleViewDetails = (medicine) => {
    setSelectedMedicine(medicine);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMedicine(null);
  };
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="p-6">
      <h1 className="text-xl md:text-2xl lg:text-3xl text-blue-600 font-bold mb-6">
        Medicines
      </h1>
      <div className="overflow-x-auto">
        <table className="table-auto min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border border-gray-300">#</th>
              <th className="p-2 border border-gray-300">Image</th>
              <th className="p-2 border border-gray-300">Name</th>
              <th className="p-2 border border-gray-300 hidden sm:table-cell">
                Category
              </th>
              <th className="p-2 border border-gray-300 hidden md:table-cell">
                Price
              </th>

              <th className="p-2 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((medicine, index) => (
              <tr key={medicine?._id} className="text-center">
                <td className="p-2 border border-gray-300">{index + 1}</td>
                <td className="p-2 border border-gray-300">
                  <img
                    className="w-14 h-14 object-cover rounded mx-auto"
                    src={medicine?.image}
                    alt=""
                  />
                </td>
                <td className="p-2 border border-gray-300">
                  {medicine?.itemName}
                </td>
                <td className="p-2 border border-gray-300 hidden sm:table-cell">
                  {medicine.category}
                </td>
                <td className="p-2 border border-gray-300 hidden md:table-cell">
                  $ {medicine.perUnitPrice}
                </td>

                <td className="p-2 border border-gray-300">
                  <div className="flex justify-center gap-2">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                      onClick={() => handleViewDetails(medicine)}
                    >
                      View
                    </button>
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded"
                      onClick={() =>
                        !disabledProducts.includes(medicine._id) &&
                        handleAddToCart(medicine)
                      }
                      disabled={disabledProducts.includes(medicine._id)}
                    >
                      Select
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && selectedMedicine && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full relative">
            <img
              src={selectedMedicine.image}
              alt={selectedMedicine.name}
              className="w-full h-40 object-cover rounded mb-4"
            />
            <h2 className="text-xl font-bold mb-2">{selectedMedicine.name}</h2>
            <p className="text-gray-700 mb-2">
              Category: {selectedMedicine.category}
            </p>
            <p className="text-gray-700 mb-4">
              Description: {selectedMedicine.description}
            </p>
            <p className="text-gray-700 font-bold">
              Price: $ {selectedMedicine.perUnitPrice}
            </p>
            
            <p className="text-gray-700 font-bold">
              Company: {selectedMedicine.company}
            </p>
            <p className="text-gray-700 font-bold">
              Item Mass Unit: {selectedMedicine.itemMassUnit}
            </p>
            <p className="text-gray-700 font-bold">
              Discount: {selectedMedicine.discount} %
            </p>

            <div className="text-end">
              <button
                className="px-3 py-1 rounded bg-red-500 text-white"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryDetails;
