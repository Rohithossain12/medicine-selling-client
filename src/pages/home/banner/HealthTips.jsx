import { useEffect, useState } from "react";

const HealthTips = () => {
  const [healthTips, setHealthTips] = useState();

  useEffect(() => {
    fetch("healthTips.json")
      .then((res) => res.json())
      .then((data) => setHealthTips(data));
  }, []);

  return (
    <div className="mt-10 mb-10 bg-gray-100 p-6 rounded-lg ">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Health Tips & Advice
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {healthTips?.map((tip) => (
          <div
            key={tip?.id}
            className="bg-white p-4 shadow-md rounded-lg "
          >
            {/* Image */}
            <img
              src={tip?.image}
              alt={tip.title}
              className="w-full h-32 object-cover rounded-t-lg mb-4"
            />
            {/* Title */}
            <h3 className="text-xl font-semibold text-blue-600">{tip?.title}</h3>
            {/* Content */}
            <p className="mt-2 text-gray-600">{tip?.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthTips;
