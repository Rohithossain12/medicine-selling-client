import { FaCheckCircle } from "react-icons/fa";

const FeaturedBrands = () => {
  const brands = [
    {
      id: 1,
      name: "Square Pharmaceuticals",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8NExueRBwDFS26yK6C-AvbuNJyBFNHNpZnmG0PKnLeTRCkOihp4yZf6VkVbaWJRVmuJc&usqp=CAU",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Acme Laboratories",
      image:
        "https://media.licdn.com/dms/image/v2/C560BAQGJiV4awsbjKQ/company-logo_200_200/company-logo_200_200/0/1643688566019/the_acme_lab_ltd_logo?e=2147483647&v=beta&t=Oi4R7ebDZb_EEQDO1CyMwJ0tXhPmLAL2h_jO4b2_zWE",
      rating: 4.7,
    },
    {
      id: 3,
      name: "ACI Limited",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuQc4qRBNRS19nHm0A4ZLa3drz1DdLBbFm-w&s",
      rating: 4.6,
    },
    {
      id: 4,
      name: "Incepta Pharmaceuticals",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi0dmwVCFeE4x6pAkOt-GdE8ppqwCNMSqlTQng19TG4asm8b61L1XVB-zy2HwBNPciEec&usqp=CAU",
      rating: 4.9,
    },
  ];

  return (
    <div className="bg-gray-100 py-12 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#6A1B9A]">
          Featured Brands & Trusted Pharmacies
        </h2>
        <p className="text-lg text-gray-600 mt-3">
          Shop from top-rated and certified pharmacies.
        </p>
      </div>

      {/* Brand List */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 max-w-6xl mx-auto">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center"
          >
            <img
              src={brand.image}
              alt={brand.name}
              className="w-20 h-20 object-contain"
            />
            <h3 className="text-lg font-semibold mt-3">{brand.name}</h3>
            <div className="flex items-center text-yellow-500 mt-2">
              ⭐ {brand.rating} / 5
            </div>
            <div className="flex items-center text-green-500 mt-2">
              <FaCheckCircle className="mr-1" /> Verified
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedBrands;
