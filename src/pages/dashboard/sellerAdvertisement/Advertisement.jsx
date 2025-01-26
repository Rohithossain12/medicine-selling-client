import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import LoadingSpinner from "../../../components/loadingSpinner/LoadingSpinner";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet";

const Advertisement = () => {
  const [showModal, setShowModal] = useState(false);
  const axiosSecure = useAxiosSecure();

  const { user } = useAuth();
  const email = user?.email;

  // Fetch advertisements using tanstack query
  const {
    data: advertisements = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["advertisements", email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/advertisements/${email}`);
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const advertisementData = {
      description: data?.description,
      image: data?.image,
      medicine: data?.medicine,
      seller: user?.email,
      status: false,
    };
    try {
      await axiosSecure.post("/advertisements", advertisementData);
      toast.success("Advertisement added successfully!");
      refetch();
      setShowModal(false); // Close modal after successful submission
      reset(); // Reset form fields
    } catch (error) {
      toast.error("Failed to add advertisement. Please try again.");
    } finally {
      setShowModal(false); // Ensure modal closes in all cases
    }
  };

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <div>
      <Helmet>
        <title>PharmaWorld | Ask For Advertisement </title>
      </Helmet>
      <h2 className="text-xl md:text-2xl lg:text-3xl text-blue-600 font-bold mb-4">Ask For Advertisement</h2>
      <table className="w-full border-collapse border border-gray-300 text-center">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Image</th>
            <th className="border border-gray-300 p-2">Medicine</th>
            <th className="border border-gray-300 p-2">Description</th>
            <th className="border border-gray-300 p-2">Status</th>
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
              <td className="border border-gray-300 p-2">{ad.description}</td>
              <td className="border border-gray-300 p-2">
                <span
                  className={`${
                    ad.status ? "bg-green-500" : "bg-red-500"
                  } text-white px-2 py-1 rounded-md`}
                >
                  {ad.status ? "In Slider" : "Not in Slider"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={() => setShowModal(true)}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        Add Advertisement
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md w-96">
            <h3 className="text-lg font-bold mb-4">Add New Advertisement</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block font-medium">Medicine Name</label>
                <input
                  {...register("medicine", {
                    required: "Medicine name is required",
                  })}
                  placeholder="Enter Medicine Name"
                  className={`w-full border rounded-md p-2 ${
                    errors.medicine ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.medicine && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.medicine.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label className="block font-medium">Description</label>
                <textarea
                  {...register("description", {
                    required: "description is required",
                  })}
                  placeholder="Enter Description"
                  className={`w-full border px-2 py-1 rounded ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  }`}
                ></textarea>
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label className="block font-medium">Image URL</label>
                <input
                  {...register("image", { required: "Image Is Required" })}
                  placeholder="Enter Image URL"
                  className={`w-full border rounded-md p-2 ${
                    errors.image ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.image && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.image.message}
                  </p>
                )}
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Advertisement;
