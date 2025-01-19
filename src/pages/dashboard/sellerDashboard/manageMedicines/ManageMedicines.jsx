import React, { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import LoadingSpinner from "../../../../components/loadingSpinner/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const ManageMedicines = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Fetch categories using TanStack Query
  const {
    data: categories = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["categories"], // Use object format with queryKey
    queryFn: async () => {
      const response = await axiosSecure.get("/category");
      return response.data;
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    // Image Upload to imgbb and get an url
    const imageFile = { image: data.image[0] };
    const imageRes = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    // Include the image URL with the rest of the form data
    const medicineData = {
      itemName: data.itemName,
      genericName: data.genericName,
      category: data.category,
      company: data.category,
      itemMassUnit: data.itemMassUnit,
      perUnitPrice: data.perUnitPrice,
      discount: data.discount,
      image: imageRes.data.data.display_url, // Image URL from imgbb response
    };

    try {
      const response = await axiosSecure.post("/medicines", medicineData);
      // Show success toast
      toast.success("Medicine added successfully!");
      // Reset the form after successful submission
      reset();
    } catch (error) {
      toast.error("Error adding medicine. Please try again.");
    }
  };

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="container mx-auto p-6">
      <div className="mb-5">
        <h1 className="text-2xl font-bold mb-2">Manage Medicines</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-500 text-white px-6 py-2 rounded flex items-center hover:bg-green-600"
        >
          Add Medicine
        </button>
      </div>

      <div className="bg-white rounded-lg p-4 mb-4">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Image</th>
              <th className="border border-gray-300 px-4 py-2">Item Name</th>
              <th className="border border-gray-300 px-4 py-2">Generic Name</th>
              <th className="border border-gray-300 px-4 py-2">Category</th>
              <th className="border border-gray-300 px-4 py-2">Company</th>
              <th className="border border-gray-300 px-4 py-2">
                Item Mass Unit
              </th>
              <th className="border border-gray-300 px-4 py-2">
                Per Unit Price
              </th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">Image</td>
              <td className="border border-gray-300 px-4 py-2">
                Medicine Name
              </td>
              <td className="border border-gray-300 px-4 py-2">Generic Name</td>
              <td className="border border-gray-300 px-4 py-2">
                Category Name
              </td>
              <td className="border border-gray-300 px-4 py-2">Company Name</td>
              <td className="border border-gray-300 px-4 py-2">
                Item Mass Unit
              </td>
              <td className="border border-gray-300 px-4 py-2">
                Per Unit Price
              </td>
              <td className="border border-gray-300 px-4 py-2">$100</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <div className="space-y-2">
                  <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 ml-2">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Add Medicine Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Add New Medicine</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label
                  htmlFor="itemName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Item Name
                </label>
                <input
                  type="text"
                  id="itemName"
                  {...register("itemName", {
                    required: "Item Name is required",
                  })}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                />
                {errors.itemName && (
                  <p className="text-red-500 text-xs">
                    {errors.itemName.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="genericName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Generic Name
                </label>
                <input
                  type="text"
                  id="genericName"
                  {...register("genericName", {
                    required: "Generic Name is required",
                  })}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                />
                {errors.genericName && (
                  <p className="text-red-500 text-xs">
                    {errors.genericName.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <select
                  id="category"
                  {...register("category", {
                    required: "Category is required",
                  })}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                >
                  <option value="">Select Category</option>
                  {categories?.map((category) => (
                    <option key={category?._id} value={category?.categoryName}>
                      {category?.categoryName}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-red-500 text-xs">
                    {errors.category.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-gray-700"
                >
                  Company
                </label>
                <select
                  id="company"
                  {...register("company", { required: "Company is required" })}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                >
                  <option value="">Select Company</option>
                  {categories?.map((category) => (
                    <option key={category?._id} value={category?.categoryName}>
                      {category?.categoryName}
                    </option>
                  ))}
                </select>
                {errors.company && (
                  <p className="text-red-500 text-xs">
                    {errors.company.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="itemImage"
                  className="block text-sm font-medium text-gray-700"
                >
                  Upload Image
                </label>
                <input
                  type="file"
                  id="itemImage"
                  {...register("image", { required: "Image is required" })}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                />
                {errors.image && (
                  <p className="text-red-500 text-xs">{errors.image.message}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="itemMassUnit"
                  className="block text-sm font-medium text-gray-700"
                >
                  Item Mass Unit
                </label>
                <select
                  id="itemMassUnit"
                  {...register("itemMassUnit", {
                    required: "Mass Unit is required",
                  })}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                >
                  <option value="">Select Unit</option>
                  <option value="mg">Mg</option>
                  <option value="ml">ML</option>
                </select>
                {errors.itemMassUnit && (
                  <p className="text-red-500 text-xs">
                    {errors.itemMassUnit.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="perUnitPrice"
                  className="block text-sm font-medium text-gray-700"
                >
                  Per Unit Price
                </label>
                <input
                  type="number"
                  id="perUnitPrice"
                  {...register("perUnitPrice", {
                    required: "Price is required",
                    min: { value: 1, message: "Price must be greater than 0" },
                  })}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                />
                {errors.perUnitPrice && (
                  <p className="text-red-500 text-xs">
                    {errors.perUnitPrice.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="discount"
                  className="block text-sm font-medium text-gray-700"
                >
                  Discount (%)
                </label>
                <input
                  type="number"
                  id="discount"
                  {...register("discount", {
                    min: { value: 0, message: "Discount can't be negative" },
                  })}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                  defaultValue="0"
                />
                {errors.discount && (
                  <p className="text-red-500 text-xs">
                    {errors.discount.message}
                  </p>
                )}
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Add Medicine
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageMedicines;
