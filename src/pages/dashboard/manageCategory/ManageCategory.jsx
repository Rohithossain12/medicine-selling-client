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

  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    image: "",
  });

  const handleAddCategory = () => {
    if (newCategory.name && newCategory.image) {
      setCategories([
        ...categories,
        { id: Date.now(), name: newCategory.name, image: newCategory.image },
      ]);
      setNewCategory({ name: "", image: "" });
      setShowModal(false);
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter((cat) => cat.id !== id));
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
          {categories.map((cat) => (
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
          ))}
        </tbody>
      </table>

      {/* Modal for Adding Category */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-md p-6 w-96">
            <h2 className="text-lg font-bold mb-4">Add New Category</h2>
            <div className="mb-4">
              <label className="block font-semibold mb-1">Category Name:</label>
              <input
                type="text"
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1">Image URL:</label>
              <input
                type="text"
                value={newCategory.image}
                onChange={(e) =>
                  setNewCategory((prev) => ({ ...prev, image: e.target.value }))
                }
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCategory}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCategory;
