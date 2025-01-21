import React from "react";
import Category from "./category/Category";

const Home = () => {
  return (
    <div>
      <h1>Home page</h1>
      {/* Category Section */}
      <div >
        <Category></Category>
      </div>
    </div>
  );
};

export default Home;
