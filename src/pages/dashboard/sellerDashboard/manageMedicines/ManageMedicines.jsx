import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import LoadingSpinner from "../../../../components/loadingSpinner/LoadingSpinner";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const ManageMedicines = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMedicine, setCurrentMedicine] = useState(null);
  console.log(currentMedicine);

  // Fetch medicines using TanStack Query
  const {
    data: medicines = [],
    isLoading: medicinesLoading,
    refetch,
    isError: medicinesError,
  } = useQuery({
    queryKey: ["medicines"],
    queryFn: async () => {
      const response = await axiosSecure.get("/medicines");
      return response?.data;
    },
  });
  if (medicinesError) {
    toast.error("Failed to fetch medicines. Please try again later.");
  }

  // Fetch categories using TanStack Query
  const {
    data: categories = [],
    isLoading: isCategoryLoading,
    isError: isCategoryError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axiosSecure.get("/category");
      return response?.data;
    },
  });
  if (isCategoryError) {
    toast.error("Failed to fetch category. Please try again later.");
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const imageFile = { image: data.image[0] };
      const imageRes = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      const medicineData = {
        itemName: data.itemName,
        genericName: data.genericName,
        category: data.category,
        company: data.company,
        itemMassUnit: data.itemMassUnit,
        perUnitPrice: data.perUnitPrice,
        discount: data.discount,
        image: imageRes.data.data.display_url,
      };

      if (isEditing) {
        const res = await axiosSecure.put(
          `/medicine/${currentMedicine._id}`,
          medicineData
        );

        if (res.status === 200) {
          toast.success("Medicine updated successfully!");
        } else {
          await axiosSecure.post("/medicines", medicineData); // This part is handled in case of adding
          toast.success("Medicine added successfully!");
          refetch(); // This will trigger refetch to update medicines
        }
      } else {
        await axiosSecure.post("/medicines", medicineData);
        toast.success("Medicine added successfully!");
        refetch();
      }

      reset();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to process the request. Please try again."
      );
    } finally {
      setIsModalOpen(false);
      setIsEditing(false);
      setCurrentMedicine(null);
    }
  };

  const handleDeleteMedicine = (id) => {
    toast(
      (t) => (
        <div className="flex flex-col items-center">
          <p>Are you sure you want to delete this category?</p>
          <div className="mt-2 flex gap-4">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                performDelete(id);
              }}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Yes
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="bg-gray-300 px-4 py-2 rounded-md"
            >
              No
            </button>
          </div>
        </div>
      ),
      { duration: 5000 }
    );
  };

  const performDelete = async (id) => {
    try {
      const res = await axiosSecure.delete(`/medicine/${id}`);
      if (res.status === 200) {
        toast.success("Medicine deleted successfully!");
        refetch();
      } else {
        throw new Error("Failed to delete Medicine.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete. Please try again."
      );
    }
  };

  const handleEditMedicine = (medicine) => {
    setCurrentMedicine(medicine);
    setIsEditing(true);
    setIsModalOpen(true);
    reset();
    refetch();
  };

  if (medicinesLoading || isCategoryLoading) return <LoadingSpinner />;
  return (
    <div className="container mx-auto p-6">
      <div className="mb-5">
        <h1 className="text-2xl font-bold mb-2">Manage Medicines</h1>
        <button
          onClick={() => {
            setIsModalOpen(true);
            setIsEditing(false);
          }}
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
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
              <th className="border border-gray-300 px-4 py-2">Unit</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((medicine) => (
              <tr key={medicine._id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  <img
                    src={medicine.image}
                    alt={medicine.itemName}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {medicine.itemName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {medicine.genericName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {medicine.category}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {medicine.company}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {medicine.itemMassUnit}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  ${medicine.perUnitPrice}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    onClick={() => handleEditMedicine(medicine)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteMedicine(medicine._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">
              {isEditing ? "Edit Medicine" : "Add New Medicine"}
            </h2>
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
                  defaultValue={isEditing ? currentMedicine.itemName : ""}
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
                  defaultValue={isEditing ? currentMedicine.genericName : ""}
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
                  defaultValue={isEditing ? currentMedicine?.category : ""}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                >
                  <option>Select Category</option>
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
                  defaultValue={isEditing ? currentMedicine.company : ""}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                >
                  <option value="">Select Company</option>
                  {categories?.map((category) => (
                    <option key={category?._id} value={category?.companyName}>
                      {category?.companyName}
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
                {/* Show existing image (only in editing mode) */}
                {isEditing && currentMedicine?.image && (
                  <img
                    src={currentMedicine.image}
                    alt="Current Medicine"
                    className="block mt-2 mb-2 w-12 h-12 object-cover rounded"
                  />
                )}
                <input
                  type="file"
                  id="itemImage"
                  {...register("image", {
                    required: !isEditing ? "Image is required" : false,
                  })}
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
                  defaultValue={isEditing ? currentMedicine.itemMassUnit : ""}
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
                  defaultValue={isEditing ? currentMedicine.perUnitPrice : ""}
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
                  defaultValue={isEditing ? currentMedicine.discount : "0"}
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
                  {isEditing ? "Update" : "  Add Medicine"}
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
