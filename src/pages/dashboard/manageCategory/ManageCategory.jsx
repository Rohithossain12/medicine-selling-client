import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdAdd } from "react-icons/md";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/loadingSpinner/LoadingSpinner";

const ManageCategory = () => {
  const axiosSecure = useAxiosSecure();
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);

  // Get category data
  const {
    data: categories = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await axiosSecure.get("/category");
      return res?.data;
    },
  });

  if (isError) {
    toast.error("Failed to fetch categories. Please try again later.");
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Handle Add/Update category and company
  const onSubmit = async (data) => {
    try {
      const categoryData = {
        categoryName: data.categoryName,
        companyName: data.companyName,
        categoryImage: data.image,
      };

      if (isEditing) {
        const res = await axiosSecure.put(
          `/category/${currentCategory._id}`,
          categoryData
        );
        if (res.status === 200) {
          toast.success("Category updated successfully!");
          refetch(); // Refresh categories
        }
      } else {
        await axiosSecure.post("/category", categoryData);
        toast.success("Category added successfully!");
        refetch(); // Refresh categories
      }

      reset(); // Clear the form
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to process the request. Please try again."
      );
    } finally {
      setShowModal(false);
      setIsEditing(false);
      setCurrentCategory(null);
    }
  };

  // Handle delete category with confirmation toast
  const handleDeleteCategory = (id) => {
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

  // Function to perform the delete operation
  const performDelete = async (id) => {
    try {
      const res = await axiosSecure.delete(`/category/${id}`);
      if (res.status === 200) {
        toast.success("Category deleted successfully!");
        refetch();
      } else {
        throw new Error("Failed to delete category.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete. Please try again."
      );
    }
  };

  // Handle edit button click
  const handleEditCategory = (category) => {
    setCurrentCategory(category);
    setIsEditing(true);
    setShowModal(true);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Categories</h2>
      <button
        onClick={() => {
          setShowModal(true);
          setIsEditing(false);
          reset();
        }}
        className="mb-4 flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md"
      >
        <MdAdd /> Add Category
      </button>

      <table className="w-full border-collapse text-center border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Image</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Company Name</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((category) => (
            <tr key={category._id}>
              <td className="border border-gray-300 p-2">
                <img
                  src={category?.categoryImage}
                  alt={category?.categoryName}
                  className="w-10 h-10 mx-auto"
                />
              </td>
              <td className="border border-gray-300 p-2">
                {category?.categoryName}
              </td>
              <td className="border border-gray-300 p-2">
                {category?.companyName}
              </td>

              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => handleEditCategory(category)}
                  className="bg-blue-500 text-white px-2 py-1 rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteCategory(category._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Adding/Editing Category */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-md p-6 w-96">
            <h2 className="text-lg font-bold mb-4">
              {isEditing ? "Edit Category" : "Add New Category"}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="form-control">
                <label className="block font-semibold mb-1">
                  Category Name:
                </label>
                <input
                  type="text"
                  {...register("categoryName", {
                    required: "Category name is required",
                  })}
                  defaultValue={isEditing ? currentCategory?.categoryName : ""}
                  placeholder="Enter category name"
                  className={`w-full border rounded-md p-2 ${
                    errors.categoryName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.categoryName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.categoryName.message}
                  </p>
                )}
              </div>
              <div className="form-control">
                <label className="block font-semibold mb-1">
                  Company Name:
                </label>
                <input
                  type="text"
                  {...register("companyName", {
                    required: "Company name is required",
                  })}
                  defaultValue={isEditing ? currentCategory?.companyName : ""}
                  placeholder="Enter company name"
                  className={`w-full border rounded-md p-2 ${
                    errors.companyName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.companyName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.companyName.message}
                  </p>
                )}
              </div>
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
                  defaultValue={isEditing ? currentCategory?.categoryImage : ""}
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
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setIsEditing(false);
                    setCurrentCategory(null);
                  }}
                  className="bg-gray-300 px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                >
                  {isEditing ? "Update" : "Add"}
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



