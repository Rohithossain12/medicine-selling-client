import React from "react";
import Category from "./category/Category";
import DiscountProducts from "./discountProducts/DiscountProducts";
import Banner from "./banner/Banner";

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
    </div>
  );
};

export default Home;
