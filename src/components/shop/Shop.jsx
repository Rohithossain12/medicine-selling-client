import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";
import { useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet";

const Shop = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [disabledProducts, setDisabledProducts] = useState([]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Sorting states
  const [sortByPrice, setSortByPrice] = useState(null);

  // Search state
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch medicines using tanstack query
  const {
    data: medicines = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allMedicines"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/allMedicines`);
      return res.data;
    },
  });

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users`);
      return res.data;
    },
  });

  // Find logged-in user's role
  const loggedInUser = users.find((u) => u.email === user?.email);
  const userRole = loggedInUser?.role;

  const handleAddToCart = async (medicine) => {
    try {
      await axiosSecure.post("/cart", {
        userId: user?.id,
        medicineId: medicine._id,
        name: medicine.itemName,
        company: medicine.company,
        quantity: 1,
        price: medicine.perUnitPrice,
        email: user.email,
      });

      setDisabledProducts((prev) => [...prev, medicine._id]);

      toast.success(`${medicine.itemName} added to the cart!`);

      refetch();
    } catch (error) {
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

  const filteredMedicines = medicines.filter(
    (medicine) =>
      medicine.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sorting medicines by price
  const sortedMedicines = [...filteredMedicines].sort((a, b) => {
    if (!sortByPrice) return 0;
    return sortByPrice === "asc"
      ? a.perUnitPrice - b.perUnitPrice
      : b.perUnitPrice - a.perUnitPrice;
  });

  // Pagination
  const totalItems = sortedMedicines.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedMedicines = sortedMedicines.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="mt-10 mb-10 bg-gray-100 p-6 rounded-lg">
      <h1 className=" text-center lg:text-3xl md:text-2xl text-xl font-bold mb-6 text-blue-600">
        All Medicines
      </h1>

      {/* Search Bar */}
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Search by name or company..."
          className="border p-2 rounded w-full text-gray-800 bg-white dark:bg-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={() => setSortByPrice(sortByPrice === "asc" ? "desc" : "asc")}
        >
          Sort by Price ({sortByPrice === "asc" ? "↓" : "↑"})
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Helmet>
          <title>PharmaWorld | Shop</title>
        </Helmet>
        <table className="table-auto min-w-full border border-gray-300">
          <thead>
            <tr className="bg-green-500 text-white">
              <th className="p-2 border border-gray-300">#</th>
              <th className="p-2 border border-gray-300">Image</th>
              <th className="p-2 border border-gray-300">Name</th>
              <th className="p-2 border border-gray-300 hidden sm:table-cell">
                Category
              </th>
              <th className="p-2 border border-gray-300 hidden sm:table-cell">
                Company
              </th>
              <th className="p-2 border border-gray-300 hidden md:table-cell">
                Price
              </th>
              <th className="p-2 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedMedicines.map((medicine, index) => (
              <tr key={medicine?._id} className="text-center text-gray-800">
                <td className="p-2 border border-gray-300">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="p-2 border border-gray-300">
                  <img
                    className="w-14 h-14 object-cover rounded mx-auto"
                    src={medicine?.image}
                    alt={medicine?.itemName}
                  />
                </td>
                <td className="p-2 border border-gray-300">
                  {medicine?.itemName}
                </td>
                <td className="p-2 border border-gray-300 hidden sm:table-cell">
                  {medicine.category}
                </td>
                <td className="p-2 border border-gray-300 hidden sm:table-cell">
                  {medicine.company}
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
                      className={`${
                        disabledProducts.includes(medicine._id) ||
                        userRole === "seller"
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-green-500"
                      } text-white px-3 py-1 rounded`}
                      onClick={() =>
                        !disabledProducts.includes(medicine._id) &&
                        userRole !== "seller" &&
                        handleAddToCart(medicine)
                      }
                      disabled={
                        disabledProducts.includes(medicine._id) ||
                        userRole === "seller"
                      }
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

      {/* Pagination */}
      <div className="flex justify-center mt-12 gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
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
                className="px-3 py-1 rounded bg-green-500 text-white"
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

export default Shop;
