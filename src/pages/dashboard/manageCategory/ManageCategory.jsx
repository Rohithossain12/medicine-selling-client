import React, { useState } from "react";
import { MdAdd } from "react-icons/md";

const ManageCategory = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "tablet",
      image:
        "https://cdn.prod.website-files.com/6525a248e59385170b5a1eda/654e34efd4cdc1fa219db5a1_653bf3caaaadfbeecd3c4829_62e966b372fe3af2611ca7be_Halving%252520a%252520tablet%252520(600%252520%2525C3%252597%252520450%252520px).png",
    },
    {
      id: 2,
      name: "syrup",
      image: "https://www.cofsils.com/uploadfile/product/natural_cough.jpg",
    },
  ]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Categories</h2>
      <button className="mb-4 flex  items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md">
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
          {categories.map((cat) => (
            <tr key={cat.id}>
              <td className="border border-gray-300 p-2">{cat.name}</td>
              <td className="border border-gray-300 p-2">
                <img
                  cl
                  src={cat.image}
                  alt={cat.name}
                  className="w-10 h-10 mx-auto"
                />
              </td>
              <td className="border border-gray-300 p-2">
                <button className="bg-blue-500 text-white px-2 py-1 rounded-md">
                  Edit
                </button>
                <button className="bg-red-500 text-white px-2 py-1 rounded-md ml-2">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCategory;
