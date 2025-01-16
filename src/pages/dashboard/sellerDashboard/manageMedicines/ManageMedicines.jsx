import { useState } from "react";

const ManageMedicines = () => {
  const [medicines, setMedicines] = useState([
    {
      id: 1,
      name: "Paracetamol",
      genericName: "Acetaminophen",
      description: "Used for pain relief",
      category: "Painkiller",
      company: "XYZ Pharma",
      unitMass: "500mg",
      price: 10,
      discount: 0,
      image: "https://www.dailychemist.com/wp-content/uploads/2020/03/para500.jpg",
    },
    {
      id: 2,
      name: "Amoxicillin",
      genericName: "Amoxicillin Trihydrate",
      description: "Antibiotic used to treat infections",
      category: "Antibiotic",
      company: "ABC Pharma",
      unitMass: "250mg",
      price: 12,
      discount: 0,
      image: "https://www.bioveta.cz/obrazek.php?id=336-31-1-2017.jpeg",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newMedicine, setNewMedicine] = useState({
    name: "",
    genericName: "",
    description: "",
    category: "",
    company: "",
    unitMass: "500mg",
    price: 0,
    discount: 0,
    image: null,
  });

  // Function to handle input changes in the modal form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMedicine({
      ...newMedicine,
      [name]: value,
    });
  };

  // Function to handle image upload
  const handleImageUpload = (e) => {
    setNewMedicine({
      ...newMedicine,
      image: URL.createObjectURL(e.target.files[0]),
    });
  };

  // Function to handle adding new medicine to the list
  const handleAddMedicine = () => {
    setMedicines([...medicines, { ...newMedicine, id: Date.now() }]);
    setShowModal(false);
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Medicines</h1>
      <button
        onClick={() => setShowModal(true)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Medicine
      </button>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Image</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Generic Name</th>
            <th className="border border-gray-300 p-2">Description</th>
            <th className="border border-gray-300 p-2">Category</th>
            <th className="border border-gray-300 p-2">Company</th>
            <th className="border border-gray-300 p-2">Price</th>
            <th className="border border-gray-300 p-2">Discount</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((medicine) => (
            <tr key={medicine.id}>
              <td className="border border-gray-300 p-2">
                <img
                  src={medicine.image}
                  alt={medicine.name}
                  className="w-16 h-16 object-cover"
                />
              </td>
              <td className="border border-gray-300 p-2">{medicine.name}</td>
              <td className="border border-gray-300 p-2">
                {medicine.genericName}
              </td>
              <td className="border border-gray-300 p-2">
                {medicine.description}
              </td>
              <td className="border border-gray-300 p-2">
                {medicine.category}
              </td>
              <td className="border border-gray-300 p-2">{medicine.company}</td>
              <td className="border border-gray-300 p-2">${medicine.price}</td>
              <td className="border border-gray-300 p-2">
                {medicine.discount}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md mx-4 overflow-y-auto max-h-full">
            <h2 className="text-xl font-bold mb-4">Add New Medicine</h2>
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              &times;
            </button>
            <div className="mb-4">
              <label className="block text-sm font-medium">Item Name</label>
              <input
                type="text"
                name="name"
                value={newMedicine.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 mt-1 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Generic Name</label>
              <input
                type="text"
                name="genericName"
                value={newMedicine.genericName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 mt-1 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">
                Short Description
              </label>
              <textarea
                name="description"
                value={newMedicine.description}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 mt-1 rounded"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Image</label>
              <input
                type="file"
                onChange={handleImageUpload}
                className="w-full border border-gray-300 p-2 mt-1 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Category</label>
              <select
                name="category"
                value={newMedicine.category}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 mt-1 rounded"
              >
                <option value="">Select Category</option>
                <option value="Painkiller">Painkiller</option>
                <option value="Antibiotic">Antibiotic</option>
                {/* Add more categories as needed */}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Company</label>
              <select
                name="company"
                value={newMedicine.company}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 mt-1 rounded"
              >
                <option value="">Select Company</option>
                <option value="XYZ Pharma">XYZ Pharma</option>
                <option value="ABC Pharma">ABC Pharma</option>
                {/* Add more companies as needed */}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">
                Item Mass Unit
              </label>
              <select
                name="unitMass"
                value={newMedicine.unitMass}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 mt-1 rounded"
              >
                <option value="500mg">500mg</option>
                <option value="250mg">250mg</option>
                <option value="1ml">1ml</option>
                {/* Add more units as needed */}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">
                Per Unit Price
              </label>
              <input
                type="number"
                name="price"
                value={newMedicine.price}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 mt-1 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">
                Discount Percentage
              </label>
              <input
                type="number"
                name="discount"
                value={newMedicine.discount}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 mt-1 rounded"
              />
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleAddMedicine}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Add Medicine
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="ml-2 px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageMedicines;
