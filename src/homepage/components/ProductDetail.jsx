import {
  Button,
  Fieldset,
  Grid,
  Image,
  NumberInput,
  Text,
  Title,
} from "@mantine/core";
import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useNavigate, Link, useParams } from "react-router-dom";
import BuyerShopInfo from "../../buyer/pages/BuyerShopInfo.jsx";
import {sanctionProduct} from "../../api/v1/admin/admin.js";

const ProductDetail = ({
  product,
  favorite,
  favoriteChange,
  addItemCart,
  role,
  token,
  productId
}) => {
  const [liked, setLiked] = useState(false);
  const [getAlert, setAlert] = useState({ visible: false, message: "" });
  const [click , setClick] = useState(false);
  const navigate = useNavigate();
  const [wait, setWait] = useState(false);

  const sanctionProductApply = async () => {
    try {
      if(click === false) {
        setClick(true);
        await sanctionProduct(token, productId)
        alert("판매자 제재가 완료 되었습니다")
      }else{
        return null
      }
    }catch(err) {
      console.log("test");
      alert(err);
    }
    setClick(false);
  }

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

    const formData = new FormData(e.currentTarget);

    // const amount = formData.get("amount");
    // console.log(amount);
    // if (amount < 1) {
    //   return;
    // }

    if (wait == true) {
      return;
    }

    setWait(true);

    const error = await addItemCart(amount);

    setWait(false);

    if (error == true) {
      window.location.href = "/buyer/cart";
    }
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
              <NumberInput
                size="xs"
                label="상품 수량"
                value={amount}
                onChange={(e) => {
                  setAmount(e);
                }}
                name="amount"
              />
              {role === "BUYER" ? (
                <Button color="gray" mt="md" type="submit">
                  장바구니에 담기
                </Button>
              ) : null}
              {role === 'ADMIN' ?
                  (
                      <Button color="gray" mt="md" type="submit" onClick={sanctionProductApply}>
                        판매자 제재하기
                      </Button>
                  ): null
              }
              <BuyerShopInfo product={product} />
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
