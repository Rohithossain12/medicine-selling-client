import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import "./styles.css";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const DiscountProducts = () => {
  const axiosPublic = useAxiosPublic();

  // Fetch discount products
  const { data: products = [] } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const res = await axiosPublic.get("/discount-products");
      return res?.data;
    },
  });

  return (
    <div>
      <SectionTitle
        heading="Discount Products"
        subHeading="Grab Great Discounts"
      ></SectionTitle>
      <div className="relative w-full">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="mySwiper"
        >
          {products?.map((product) => (
            <SwiperSlide key={product?._id}>
              <div className="product-slide">
                <img
                  src={product?.image}
                  alt={product.name}
                  className="w-full h-60 object-cover rounded-md"
                />
                <h3 className="text-center mt-2 text-lg font-semibold">
                  {product?.itemName}
                </h3>
                <p className="text-center text-sm text-green-500">
                  Discount: {product?.discount}%
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default DiscountProducts;
