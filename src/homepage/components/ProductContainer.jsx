import { Center, Container } from "@mantine/core";
import SectionTitle from "./SectionTitle";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../api/v1/product/product";

const ProductContainer = () => {
  const [products, setProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProducts = async () => {
    setLoading(true);
    const data = await getAllProducts(0, 9, "createdAt", "DESC");
    setLoading(false);
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
      <Container style={{ width: "100%", marginTop: "20px", padding: "0" }}>
        <Center>
          <SectionTitle title="최신 상품 리스트" />
        </Center>

        <ProductList products={products} loading={loading} />
      </Container>
    </>
  );
};

export default ProductContainer;
