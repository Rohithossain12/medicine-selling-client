import React from "react";
import Category from "./category/Category";
import DiscountProducts from "./discountProducts/DiscountProducts";

const Home = () => {
  return (
    <div>
      <h1>Home page</h1>
      {/* Discount Product*/}
      <DiscountProducts></DiscountProducts>
      {/* Category Section */}
      <div>
        <Category></Category>
      </div>
    </div>
  );
};

export default Home;
