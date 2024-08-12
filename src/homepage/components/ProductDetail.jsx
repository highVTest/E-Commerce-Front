import {
  Button,
  Fieldset,
  Grid,
  Image,
  NumberInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const ProductDetail = ({ product, favorite, favoriteChange, addItemCart }) => {
  const [liked, setLiked] = useState(false);
  const [alert, setAlert] = useState({ visible: false, message: "" });
  const navigate = useNavigate();

  const [wait, setWait] = useState(false);

  const handleLikeClick = () => {
    const newLiked = !liked;
    setLiked(newLiked);

    // Alert 메시지 설정
    setAlert({
      visible: true,
      message: newLiked ? "찜하기 완료!" : "찜하기 취소!",
    });
  };
  const handleHeart = async (productId) => {
    if (wait == true) {
      return;
    }
    setWait(true);
    await favoriteChange(productId);
    setWait(false);
    // console.log(productId);
  };

  const handlePurchaseClick = () => {
    navigate("/payment");
  };

  const [amount, setAmount] = useState(1);

  const addCart = async (e) => {
    e.preventDefault();
    if (wait == true) {
      return;
    }
    const formData = new FormData(e.currentTarget);

    // const amount = formData.get("amount");
    // console.log(amount);
    if (amount < 1) {
      return;
    }

    setWait(true);
    addItemCart(amount);
    setWait(false);

    window.location.href = "/buyer/cart";
  };

  return (
    <>
      {/* {alert.visible && (
        <Alert
          title="알림"
          icon={<IconHeart />}
          withCloseButton
          onClose={() => setAlert({ ...alert, visible: false })}
        >
          {alert.message}
        </Alert>
      )} */}
      <Grid mt="md">
        <Grid.Col span={4}>
          <Image
            src={product?.productImage}
            fallbackSrc="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg"
          />
        </Grid.Col>
        <Grid.Col span={8}>
          <Fieldset className="display-center">
            <div style={{ display: "flex", margin: "10px" }}>
              <Title order={2}>상품명: {product?.name} </Title>
              <div
                onClick={() => handleHeart(product.id)}
                style={{ marginLeft: "10px", marginTop: "2px" }}
              >
                {favorite.indexOf(product?.id) !== -1 ? (
                  <AiFillHeart style={{ color: "red", fontSize: "30px" }} />
                ) : (
                  <AiOutlineHeart style={{ fontSize: "30px" }} />
                )}
              </div>
            </div>
            <Text>카테고리 : {product?.categoryId}</Text>
            <Text order={3}>가격 : {product?.price}</Text>
            <form onSubmit={addCart} style={{ width: "50%" }}>
              {/* <TextInput
                size="xs"
                label="상품 수량"
                value={amount}
                onChange={(e) => {
                  setAmount(Number(e.target.value));
                }}
                name="amount"
              /> */}
              <NumberInput
                size="xs"
                label="상품 수량"
                value={amount}
                onChange={(e) => {
                  setAmount(e);
                }}
                name="amount"
              />
              <Button mt="md" type="submit">
                장바구니에 담기
              </Button>
            </form>
          </Fieldset>

          {/* <Text>간단 설명 : {produc}</Text> */}

          {/* <Button mt="md" ml="sm" onClick={handleLikeClick}>
            찜하기
          </Button> */}
        </Grid.Col>
      </Grid>
    </>
  );
};

export default ProductDetail;
