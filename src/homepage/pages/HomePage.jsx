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
      {/* 제목과 버튼 영역 */}
      {/* 검색 바 */}
      <SearchBarContainer></SearchBarContainer>
      <ProductContainer></ProductContainer>
    </CommonLayout>
  );
};

export default HomePage;
