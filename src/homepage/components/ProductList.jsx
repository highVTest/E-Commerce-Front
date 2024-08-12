import { useEffect, useState } from "react";
import { Grid, Card, Image, Text, Button } from "@mantine/core";
import { getAllProducts } from "../../api/v1/product/product.js";
import { Link } from "react-router-dom";

// const products = Array(6)
//   .fill(0)
//   .map((_, index) => ({
//     id: index,
//     title: "Text",
//     price: "$0",
//     description: "Body text.",
//     imageUrl: "/path/to/your/image.jpg",
//   }));

const ProductList = ({ products }) => {
  return (
    <Grid mt="md">
      {products.length != 0 ? (
        products.map((product) => (
          <Grid.Col span={4} key={product.id}>
            <Card shadow="sm" padding="lg">
              <Card.Section>
                <Image
                  src={product.productImage}
                  height={160}
                  alt="상품 이미지"
                  fallbackSrc="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg"
                />
              </Card.Section>
              <Text weight={500} mt="md">
                {product.title}
              </Text>
              <Text size="sm" fw="bold">
                {product.name}
              </Text>
              <Text size="sm">{product.price}원</Text>
              {/* <Text size="sm" mt="sm">
              {product.description}
            </Text> */}
              <Link to={`/product/${product.id}`} style={{ marginTop: 0 }}>
                <Button color="blue" fullWidth mt="md" radius="md">
                  상품 페이지 바로가기
                </Button>
              </Link>
            </Card>
          </Grid.Col>
        ))
      ) : (
        <div className="display-center"> 검색 결과 없음</div>
      )}
    </Grid>
  );
};

export default ProductList;
