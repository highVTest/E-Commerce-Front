import {
  Button,
  Card,
  Group,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { AiFillHeart } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import ProductOnePage from "../pages/ProductOnePage";

const BuyerFavoriteForm = ({ favorites, buyerChangeFavorite }) => {
  const handleHeart = (productId) => {
    buyerChangeFavorite(productId);
    // console.log(productId);
  };

  return (
    <>
      <SimpleGrid cols={3} style={{ paddingTop: 150 }}>
        {favorites.map((favorite) => {
          return (
            <Card
              key={favorite.productId}
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
            >
              <Card.Section>
                <Image
                  radius="md"
                  src={favorite.productImageUrl}
                  h={160}
                  fallbackSrc="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg"
                />
              </Card.Section>

              <Stack
                // h={150}
                bg="var(--mantine-color-body)"
                align="stretch"
                justify="center"
                gap="md"
                mt="sm"
              >
                <Text fw={500}>상품명 : {favorite.productName}</Text>

                <Group justify="space-between">
                  <Text size="sm" c="dimmed">
                    가격 : {favorite.productPrice}
                  </Text>
                  <div onClick={() => handleHeart(favorite.productId)}>
                    <AiFillHeart style={{ color: "red", fontSize: "30px" }} />
                  </div>
                </Group>

                <Link
                  to={`/product/${favorite.productId}`}
                  style={{ marginTop: 0 }}
                >
                  <Button color="blue" fullWidth mt="md" radius="md">
                    상품 페이지 바로가기
                  </Button>
                </Link>
              </Stack>
            </Card>
          );
        })}
      </SimpleGrid>
    </>
  );
};

export default BuyerFavoriteForm;
