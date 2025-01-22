import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
  const { categoryName } = category;

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

  return (
    <div>
      <Link to={`/categoryDetails/${category.categoryName}`} key={category._id}>
        <div className=" bg-base-200 rounded-lg p-5 overflow-hidden">
          <figure>
            <img
              src={category.categoryImage}
              alt="Category"
              className="w-full h-60 object-cover rounded-md"
            />
          </figure>
          <div className=" p-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {category.categoryName}
            </h2>
            <p className="text-gray-600 mb-4">
              Number of Medicines :{medicines.length}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;
