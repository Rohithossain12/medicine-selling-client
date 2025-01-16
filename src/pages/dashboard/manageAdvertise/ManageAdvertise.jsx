import React, { useState } from "react";

const ManageAdvertise = () => {
  const [advertisements, setAdvertisements] = useState([
    {
      id: 1,
      medicine: "Paracetamol",
      seller: "hablu@gmail.com",
      description: "Effective pain relief.",
      image:
        "https://www.dailychemist.com/wp-content/uploads/2020/03/para500.jpg",
      status: true,
    },
    {
      id: 2,
      medicine: "Amoxicillin",
      seller: "hablu2@gmail.com",
      description: "Best antibiotic.",
      image: "https://www.bioveta.cz/obrazek.php?id=336-31-1-2017.jpeg",
      status: false,
    },
  ]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Advertisements</h2>
      <table className="w-full border-collapse border border-gray-300 text-center">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Image</th>
            <th className="border border-gray-300 p-2">Medicine</th>
            <th className="border border-gray-300 p-2">Seller</th>
            <th className="border border-gray-300 p-2">Description</th>
            <th className="border border-gray-300 p-2">Actions</th>
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
              <td className="border border-gray-300 p-2">{ad.seller}</td>
              <td className="border border-gray-300 p-2">{ad.description}</td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() =>
                    setAdvertisements((prev) =>
                      prev.map((item) =>
                        item.id === ad.id
                          ? { ...item, status: !item.status }
                          : item
                      )
                    )
                  }
                  className={`${
                    ad.status ? "bg-red-500" : "bg-green-500"
                  } text-white px-2 py-1 rounded-md`}
                >
                  {ad.status ? "Remove" : "Add"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageAdvertise;
