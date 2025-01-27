import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../components/loadingSpinner/LoadingSpinner";
import { Helmet } from "react-helmet";

const ManageAdvertise = () => {
  const axiosSecure = useAxiosSecure();
  const [isToggling, setIsToggling] = useState(false);
  const { data: advertisements = [], refetch,isLoading } = useQuery({
    queryKey: ["advertisements"],
    queryFn: async () => {
      const res = await axiosSecure.get("/advertisements");
      return res.data;
    },
  });

  // Toggle status of advertisement
  const toggleStatus = async (id, currentStatus) => {
    setIsToggling(true); 
    try {
      await axiosSecure.patch(`/advertisements/${id}`, {
        status: !currentStatus,
      });
      toast.success(
        currentStatus
          ? "Advertisement removed successfully!"
          : "Advertisement added to slider!"
      );
      refetch(); 
    } catch (error) {
      toast.error("Failed to update status. Please try again.");
      console.error("Failed to update status:", error);
    } finally {
      setIsToggling(false); 
    }
  };

  if(isLoading) return <LoadingSpinner></LoadingSpinner>
  return (
    <div>
      <Helmet>
        <title>PharmaWorld | Manage Advertisements</title>
      </Helmet>
      <h2 className="text-xl md:text-2xl lg:text-3xl text-blue-600 font-bold mb-4">Manage Advertisements</h2>
      <table className="w-full border-collapse border border-gray-300 text-center">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Image</th>
            <th className="border border-gray-300 p-2">Medicine</th>
            <th className="border border-gray-300 p-2">Seller</th>
            <th className="border border-gray-300 p-2">Description</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {advertisements?.map((ad) => (
            <tr key={ad._id}>
              <td className="border border-gray-300 p-2">
                <img
                  src={ad.image}
                  alt={ad.medicine}
                  className="w-16 h-16 object-cover rounded-md mx-auto"
                />
              </td>
              <td className="border border-gray-300 p-2">{ad.medicine}</td>
              <td className="border border-gray-300 p-2">{ad.seller}</td>
              <td className="border border-gray-300 p-2">{ad.description}</td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => toggleStatus(ad._id, ad.status)}
                  className={`${
                    ad.status ? "bg-red-400 cursor-not-allowed" : "bg-green-500"
                  } text-white px-2 py-1 rounded-md ${
                    isToggling && "opacity-50"
                  }`}
                >
                  {ad.status ? "Removed" : "Add "}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageAdvertise;



