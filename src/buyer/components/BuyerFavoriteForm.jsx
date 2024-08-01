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
import { useNavigate } from "react-router-dom";
import ProductOnePage from "../pages/ProductOnePage";

const BuyerFavoriteForm = ({ favorites }) => {
  const navigate = useNavigate();

  const handleProductPage = (productId) => {
    // console.log(productId);
    navigate(`/product/page`); // 상품페이지에 값을 넣어주려면 어캐하지?
    // ProductOnePage(productId);
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
                  favorite?.productImageUrl
                    ? "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg"
                    : favorite.productImageUrl
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

              <Group justify="space-between">
                <Text size="sm" c="dimmed">
                  가격 : {favorite.productPrice}
                </Text>
                <AiFillHeart style={{ color: "red", fontSize: "30px" }} />
              </Group>

              <Button
                color="blue"
                fullWidth
                mt="md"
                radius="md"
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
