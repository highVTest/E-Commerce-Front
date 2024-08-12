import { Center, Container } from "@mantine/core";
import SectionTitle from "./SectionTitle";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../api/v1/product/product";

const ProductContainer = () => {
  const [products, setProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);

  // API를 호출하여 상품 목록을 가져오는 로직
  const getProducts = async () => {
    // console.log("getProducts");
    const data = await getAllProducts(0, 9, "createdAt", "DESC");
    // console.log("data", data);
    // const list = [];
    // for (let i = 0; i < 6; i++) {
    //   list.push(data.data.content[i]);
    // }
    // console.log(data);
    // setProducts(data.data.content);
    setProducts(data.data.content);
  };

  // API를 호출해 인기 상품 목록 가져오는 로직
  const getPopularProducts = async () => {
    const data = await getAllProducts();
    // console.log("data", data);
    const list = [];
    for (let i = 0; i < 6; i++) {
      list.push(data.data.content[i]);
    }
    setPopularProducts(list);
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      {/* 추천 상품 리스트 */}
      <Container size={800} mt="xl">
        <Center>
          <SectionTitle
            title="최신 상품 리스트"
            // subtitle="최신 상품들을 소개합니다."
          />
        </Center>

        <ProductList products={products} />
      </Container>

      {/* 카테고리별 인기 상품 */}
      {/* <Container size={800} mt="xl">
        <SectionTitle
          title="카테고리별 인기 상품"
          subtitle="사용자의 요구에 맞는 상품들을 소개합니다."
        />
        <ProductList products={products} />
      </Container> */}
    </>
  );
};

export default ProductContainer;
