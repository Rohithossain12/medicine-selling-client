import React from "react";
import Category from "./category/Category";
import DiscountProducts from "./discountProducts/DiscountProducts";
import Banner from "./banner/Banner";
import HealthTips from "./banner/HealthTips";
import CustomerTestimonials from "./CustomerTestimonials";
import { Helmet } from "react-helmet";
import ContactUs from "../../components/contact/ContactUs";
import Faq from "../../components/faq/Faq";
import FeaturedBrands from "../../components/FeaturedBrands/FeaturedBrands";

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
      <div>
        <FeaturedBrands></FeaturedBrands>
      </div>

      {/* Customer Testimonials */}
      <div>
        <CustomerTestimonials></CustomerTestimonials>
      </div>
      {/* Contact Us */}
      <div>
        <ContactUs></ContactUs>
      </div>
      {/* Frequently Asked Questions */}
      <div>
        <Faq></Faq>
      </div>
    </div>
  );
};

export default Home;
