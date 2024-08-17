import React from "react";
import { Container } from "@mantine/core";
import CommonLayout from "../components/CommonLayout";
import Header from "../components/Header";
import SectionTitle from "../components/SectionTitle";
import ProductList from "../components/ProductList";
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
