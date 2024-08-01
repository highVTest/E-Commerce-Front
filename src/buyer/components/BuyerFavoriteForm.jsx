import { useEffect, useState } from "react";
import { getFavorites } from "../../api/v1/favorite/favorite";
import {
  Badge,
  Button,
  Card,
  Group,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";

const BuyerFavoriteForm = ({ favorites }) => {
  const navigate = useNavigate();

  const handleProductPage = (productId) => {
    // e.preventDefault();

    console.log(productId);
    navigate(`/product/${productId}`);
  };

  return (
    <>
      <SimpleGrid cols={3} style={{ backgroundColor: "red" }}>
        {favorites.map((favorite) => (
          <Card
            key={favorite.productId}
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            style={{ height: 300 }}
          >
            <Card.Section>
              <Image
                src={
                  favorite?.productImageUrl == ""
                    ? favorite.productImageUrl
                    : "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg"
                }
                height={160}
                alt="Norway"
              />
            </Card.Section>

            <Stack
              h={300}
              bg="var(--mantine-color-body)"
              align="stretch"
              justify="center"
              gap="md"
            >
              <Text fw={500}>상품명 : {favorite.productName}</Text>
              <Text size="sm" c="dimmed">
                가격 : {favorite.productPrice}
              </Text>

              <Button
                color="blue"
                fullWidth
                mt="md"
                radius="md"
                // type="submit"
                onClick={() => handleProductPage(favorite.productId)}
              >
                상품 페이지 바로가기
              </Button>
            </Stack>
          </Card>
        ))}
      </SimpleGrid>
    </>
  );
};

export default BuyerFavoriteForm;
