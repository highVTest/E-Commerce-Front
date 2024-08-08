import {
  Button,
  Checkbox,
  Container,
  Grid,
  Group,
  Image,
  Stack,
  Text,
} from "@mantine/core";
import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import PaymentModal from "../../payment/components/PaymentModal.jsx";

// eslint-disable-next-line react/prop-types
const BuyerCartForm = ({
  items,
  buyerPayments,
  favorites,
  favoriteChange,
  deleteItem,
}) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentData, setPaymentData] = useState([]);
  const [cartIdList, setCartIdList] = useState([]);

  const token = localStorage.getItem("token");

  const [products] = useState([]);

  const setting = (data) => {
    const isIn = products.indexOf(data.cartId);

    if (isIn != -1) {
      products.splice(isIn, isIn + 1);
      setTotalPrice(totalPrice - data.productPrice * data.productQuantity);
      setPaymentData((prevPaymentData) =>
        prevPaymentData.filter((item) => item.cartId !== data.cartId)
      );
      setCartIdList((prevCartIdList) =>
        prevCartIdList.filter((item) => item !== data.cartId)
      );
    } else {
      products.push(data.cartId);
      setTotalPrice(totalPrice + data.productPrice * data.productQuantity);
      setPaymentData((prevData) => [...prevData, data]);
      setCartIdList((prevCartIdList) => [...prevCartIdList, data.cartId]);
    }
  };

  const handleHeart = (productId) => {
    favoriteChange(productId);
    // console.log(productId);
  };

  const payment = async () => {
    if (products.length == 0) {
      alert("상품을 선택해주세요!");
      return;
    }
    await buyerPayments(products, []);

    window.location.reload();
  };

  const itemDelete = async (productId) => {
    await deleteItem(productId);
    window.location.reload();
  };

  return (
    <>
      <Text
        size="xl"
        fw={900}
        variant="gradient"
        gradient={{ from: "black", to: "blue", deg: 100 }}
        style={{ textAlign: "center", fontSize: 50 }}
      >
        장바구니
      </Text>
      <ul>
        {/* eslint-disable-next-line react/prop-types */}
        {items.length != 0 ? (
          items.map((shop) => {
            return (
              <Stack
                // h={shop.items.length == 1 ? 250 : 370}
                bg="var(--mantine-color-body)"
                align="stretch"
                justify="center"
                gap="xs"
                key={shop.shopId}
                style={{ marginTop: 15 }}
              >
                <Text
                  size="xl"
                  fw={900}
                  variant="gradient"
                  gradient={{ from: "red", to: "violet", deg: 90 }}
                  style={{ textAlign: "center" }}
                >
                  {shop.shopId}번 가게의 상품
                </Text>

                {shop.items.map((item) => {
                  return (
                    <Grid
                      key={item.cartId}
                      style={{ width: 700, backgroundColor: "beige" }}
                    >
                      <Grid.Col span={1}>
                        <Checkbox
                          style={{ marginTop: "7vh", marginLeft: 20 }}
                          onClick={() => setting(item)}
                        />
                      </Grid.Col>
                      <Grid.Col span={11}>
                        <Group gap="xl" grow style={{ width: 700 }}>
                          <Image
                            radius="md"
                            src={item.productImageUrl}
                            h={150}
                            w={150}
                            fallbackSrc="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg"
                          />
                          <Stack align="stretch" justify="center" gap="md">
                            <Group>
                              <Text fw={500}>상품명 : {item.productName}</Text>
                              <div onClick={() => handleHeart(item.productId)}>
                                {favorites.indexOf(item.productId) != -1 ? (
                                  <AiFillHeart
                                    style={{ color: "red", fontSize: "30px" }}
                                  />
                                ) : (
                                  <AiOutlineHeart
                                    style={{ fontSize: "30px" }}
                                  />
                                )}
                              </div>
                            </Group>

                            <Text fw={500}>
                              상품 가격 : {item.productPrice}
                            </Text>
                            <Text fw={500}>
                              상품 수량 : {item.productQuantity}
                            </Text>
                          </Stack>

                          <Button
                            color="red"
                            // fullWidth
                            mt="md"
                            radius="md"
                            style={{ height: 100 }}
                            onClick={() => {
                              itemDelete(item.productId);
                            }}
                          >
                            삭제하기
                          </Button>
                          <Link to={`/product/${item.productId}`}>
                            <Button
                              color="blue"
                              fullWidth
                              mt="md"
                              radius="md"
                              style={{ height: 100 }}
                            >
                              보러가기
                            </Button>
                          </Link>
                        </Group>
                      </Grid.Col>
                    </Grid>
                  );
                })}
              </Stack>
            );
          })
        ) : (
          <div>Loading..</div>
        )}
      </ul>

      {items.length != 0 ? (
        <Container
          fluid
          h={50}
          bg="var(--mantine-color-blue-light)"
          style={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <Grid style={{ width: 700, textAlign: "center" }}>
            <Grid.Col span={6}>
              <Text fw={500}>선택한 상품 금액 : {totalPrice}원</Text>
            </Grid.Col>
            <Grid.Col span={2}>
              <Text fw={500}>총 {products.length}건</Text>
            </Grid.Col>
            <Grid.Col span={4}>
              <PaymentModal
                totalPrice={totalPrice}
                paymentData={paymentData}
                cartIdList={cartIdList}
                token={token}
              />
            </Grid.Col>
          </Grid>
        </Container>
      ) : (
        <div></div>
      )}

      {/* <div style={{ height: 300 }}></div> */}
    </>
  );
};

export default BuyerCartForm;
