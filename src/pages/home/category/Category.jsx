import React from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import LoadingSpinner from "../../../components/loadingSpinner/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import CategoryCard from "../../../components/CategoryCard/CategoryCard";

const Category = () => {
  const axiosPublic = useAxiosPublic();
  // Get category data
  const {
    data: categories = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosPublic.get("/categories");
      return res?.data;
    },
  });

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <div className="mt-10 mb-10 ">
      <h1 className="text-center mb-5 text-2xl md:text-2xl lg:text-3xl font-bold text-gray-800">
        Category : {categories.length}{" "}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((category) => (
         <CategoryCard category={category} ></CategoryCard>
        ))}
      </div>
    </div>
  );
};

export default Category;
