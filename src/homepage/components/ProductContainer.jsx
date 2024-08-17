import { Center, Container } from "@mantine/core";
import SectionTitle from "./SectionTitle";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../api/v1/product/product";

const ProductContainer = () => {
  const [products, setProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getProducts = async () => {
    setIsLoading(true);
    const data = await getAllProducts(0, 9, "createdAt", "DESC");
    setIsLoading(false);
    setProducts(data.data.content);
  };

  const getPopularProducts = async () => {
    const data = await getAllProducts();
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
      <Container style={{width:"100%",marginTop:"20px"}}>
        <Center>
          <SectionTitle
            title="최신 상품 리스트"
          />
        </Center>

        <ProductList products={products} isLoading={isLoading} />
      </Container>

    </>
  );
};

export default ProductContainer;
