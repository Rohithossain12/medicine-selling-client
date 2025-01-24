import React from "react";
import Category from "./category/Category";
import DiscountProducts from "./discountProducts/DiscountProducts";
import Banner from "./banner/Banner";
import HealthTips from "./banner/HealthTips";
import CustomerTestimonials from "./CustomerTestimonials";

const Home = () => {
  return (
    <div>
      {/* Banner/Slider */}
      <div>
        <Banner></Banner>
      </div>
      {/* Discount Product*/}
      <div>
        <DiscountProducts></DiscountProducts>
      </div>
      {/* Category Section */}
      <div>
        <Category></Category>
      </div>

      {/* Health Tips & Advice */}
      <div>
        <HealthTips></HealthTips>
      </div>

      {/* Customer Testimonials */}
      <div>
        <CustomerTestimonials></CustomerTestimonials>
      </div>
    </div>
  );
};

export default Home;
