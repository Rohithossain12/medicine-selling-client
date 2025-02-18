import React from "react";
import Category from "./category/Category";
import DiscountProducts from "./discountProducts/DiscountProducts";
import Banner from "./banner/Banner";
import HealthTips from "./banner/HealthTips";
import CustomerTestimonials from "./CustomerTestimonials";
import { Helmet } from "react-helmet";
import ContactUs from "../../components/contact/ContactUs";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>PharmaWorld | Home</title>
      </Helmet>
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
      {/* Contact Us */}
      <div>
        <ContactUs></ContactUs>
      </div>
    </div>
  );
};

export default Home;
