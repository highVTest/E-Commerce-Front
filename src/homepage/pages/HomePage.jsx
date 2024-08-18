import React from "react";
import CommonLayout from "../components/CommonLayout";
import ProductContainer from "../components/ProductContainer";
import SearchBarContainer from "../components/SearchBarContainer";

const HomePage = () => {
  return (
    <CommonLayout>
      <SearchBarContainer></SearchBarContainer>
      <ProductContainer></ProductContainer>
    </CommonLayout>
  );
};

export default HomePage;
