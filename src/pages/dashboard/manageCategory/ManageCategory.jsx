import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdAdd } from "react-icons/md";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const ManageCategory = () => {
  const axiosSecure = useAxiosSecure();
  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Prepare category data
      const categoryData = {
        categoryName: data.name,
        categoryImage: data.image,
      };

      // Send category data to the backend
      await axiosSecure.post("/category", categoryData);
      toast.success("Category added successful!");
      reset(); // Reset the form
    } catch (error) {
      toast.error(error.message || "Failed to added. Please try again.");
    } finally {
      setShowModal(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Categories</h2>
      <button
        onClick={() => setShowModal(true)}
        className="mb-4 flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md"
      >
        <MdAdd /> Add Category
      </button>

      <table className="w-full border-collapse text-center border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Image</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* {categories?.map((cat) => (
            <tr key={cat.id}>
              <td className="border border-gray-300 p-2">{cat.name}</td>
              <td className="border border-gray-300 p-2">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-10 h-10 mx-auto"
                />
              </td>
              <td className="border border-gray-300 p-2">
                <button className="bg-blue-500 text-white px-2 py-1 rounded-md">
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteCategory(cat.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))} */}
        </tbody>
      </table>

      {/* Modal for Adding Category */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-md p-6 w-96">
            <h2 className="text-lg font-bold mb-4">Add New Category</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Category Name Field */}
              <div className="form-control">
                <label className="block font-semibold mb-1">
                  Category Name:
                </label>
                <input
                  type="text"
                  {...register("name", {
                    required: "Category name is required",
                  })}
                  placeholder="Enter category name"
                  className={`w-full border rounded-md p-2 ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Image URL Field */}
              <div className="form-control">
                <label className="block font-semibold mb-1">Image URL:</label>
                <input
                  type="text"
                  {...register("image", {
                    required: "Image URL is required",
                    pattern: {
                      value: /^https?:\/\/[^\s]+$/,
                      message: "Enter a valid URL",
                    },
                  })}
                  placeholder="Enter image URL"
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

              {/* Action Buttons */}
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
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

export default ManageCategory;
