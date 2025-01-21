import { useState } from "react";
import LoadingSpinner from "../../../components/loadingSpinner/LoadingSpinner";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const CategoryDetails = () => {
  const { categoryName } = useParams();
  const axiosPublic = useAxiosPublic();
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleViewDetails = (medicine) => {
    setSelectedMedicine(medicine);
    setIsModalOpen(true);
  };

  const handleAddToCart = (medicine) => {
    setCart((prevCart) => [...prevCart, medicine]);
    alert(`${medicine.name} has been added to your cart.`);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMedicine(null);
  };
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Medicines</h1>
      <table className="table-auto w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border border-gray-300">#</th>
            <th className="p-2 border border-gray-300">Image</th>
            <th className="p-2 border border-gray-300">Name</th>
            <th className="p-2 border border-gray-300">Category</th>
            <th className="p-2 border border-gray-300">Price</th>
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
              <td className="p-2 border border-gray-300">
                {medicine.category}
              </td>
              <td className="p-2 border border-gray-300">
                $ {medicine.perUnitPrice}
              </td>
              <td className="p-2 border border-gray-300">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                  onClick={() => handleViewDetails(medicine)}
                >
                  View
                </button>
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded"
                  onClick={() => handleAddToCart(medicine)}
                >
                  Select
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
              Description : {selectedMedicine.description}
            </p>
            <p className="text-gray-700 font-bold">
              Price: $ {selectedMedicine.perUnitPrice}
            </p>
            <p className="text-gray-700 font-bold">
              Company : {selectedMedicine.company}
            </p>
            <p className="text-gray-700 font-bold">
              Item Mass Unit : {selectedMedicine.itemMassUnit}
            </p>
            <p className="text-gray-700 font-bold">
              Discount : {selectedMedicine.discount} %
            </p>

            <div className="text-end">
              <button
                className=" px-3 py-1 rounded bg-red-500 text-white "
                onClick={closeModal}
              >
                close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryDetails;
