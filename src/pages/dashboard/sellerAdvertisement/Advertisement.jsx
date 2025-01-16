import { useState } from "react";

const Advertisement = () => {
  const [advertisements, setAdvertisements] = useState([
    {
      id: 1,
      medicine: "Paracetamol",
      description: "Effective pain relief.",
      image:
        "https://www.dailychemist.com/wp-content/uploads/2020/03/para500.jpg",
      status: true,
    },
    {
      id: 2,
      medicine: "Amoxicillin",
      description: "Best antibiotic.",
      image: "https://www.bioveta.cz/obrazek.php?id=336-31-1-2017.jpeg",
      status: false,
    },
  ]);

  const [newAd, setNewAd] = useState({
    medicine: "",
    description: "",
    image: "",
  });

  const [showModal, setShowModal] = useState(false);

  const handleAddAdvertisement = () => {
    setAdvertisements((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        ...newAd,
        status: false, // Default status for new advertisements
      },
    ]);
    setShowModal(false);
    setNewAd({ medicine: "", description: "", image: "" });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Ask For Advertisement</h2>
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
          {advertisements.map((ad) => (
            <tr key={ad.id}>
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
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Advertisement
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md w-96">
            <h3 className="text-lg font-bold mb-4">Add New Advertisement</h3>
            <div className="mb-4">
              <label className="block font-medium">Medicine Name</label>
              <input
                type="text"
                value={newAd.medicine}
                onChange={(e) =>
                  setNewAd({ ...newAd, medicine: e.target.value })
                }
                className="w-full border px-2 py-1 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium">Description</label>
              <textarea
                value={newAd.description}
                onChange={(e) =>
                  setNewAd({ ...newAd, description: e.target.value })
                }
                className="w-full border px-2 py-1 rounded"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block font-medium">Image URL</label>
              <input
                type="text"
                value={newAd.image}
                onChange={(e) => setNewAd({ ...newAd, image: e.target.value })}
                className="w-full border px-2 py-1 rounded"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddAdvertisement}
                className="bg-green-500 text-white px-4 py-2 rounded"
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

export default Advertisement;
