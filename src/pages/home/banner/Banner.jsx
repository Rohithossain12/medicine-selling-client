import { useQuery } from "@tanstack/react-query";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/loadingSpinner/LoadingSpinner";

const Banner = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: advertisements = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["advertisements"],
    queryFn: async () => {
      const res = await axiosSecure.get("/advertisements");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  // Filter advertisements to include only those with status: true
  const filteredAdvertisements = advertisements.filter(
    (ad) => ad?.status === true
  );

  return (
    <div className="mt-6 mb-10">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={3000}
        transitionTime={600}
      >
        {filteredAdvertisements.map((advertisement) => (
          <div key={advertisement?._id} className="relative">
            {/* Image */}
            <img
              src={advertisement?.image}
              alt={advertisement?.medicine}
              className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover rounded"
            />
            {/* Text Overlay */}
            <div className="absolute inset-0 flex items-center justify-center px-5 md:px-0 lg:px-0 ">
              <div className="bg-black bg-opacity-30 text-white p-6 rounded-md max-w-3xl text-center">
                <h3 className="text-lg md:text-2xl lg:text-3xl font-bold uppercase mb-4">
                  {advertisement.medicine}
                </h3>
                <p className="">{advertisement.description}</p>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
