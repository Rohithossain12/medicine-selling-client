import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination } from "swiper/modules";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import "./styles.css";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const DiscountProducts = () => {
  const axiosPublic = useAxiosPublic();

  // Get add to cart data
  const {
    data: products = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosPublic.get("/discount-products");
      return res?.data;
    },
  });

  return (
    <div >
      <SectionTitle
        heading="Discount Products"
        subHeading="Grab Great Discounts"
      ></SectionTitle>
      <div>
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          centeredSlides={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {products.map((product) => (
            <SwiperSlide key={product._id}>
              <div className="bg-white shadow-md rounded-lg overflow-hidden p-4">
                <img
                  src={product.image}
                  alt={product.itemName}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <div className="mt-3 text-center">
                  <h3 className="text-lg font-semibold text-blue-600">
                    {product.itemName}
                  </h3>
                  <p className="text-green-500 text-sm font-medium mt-2">
                    {product.discount}% Off
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default DiscountProducts;
