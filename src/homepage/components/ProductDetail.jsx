import {
  Button,
  Fieldset,
  Grid,
  Image,
  NumberFormatter,
  NumberInput,
  px,
  Text,
  Title,
} from "@mantine/core";
import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useNavigate, Link, useParams } from "react-router-dom";
import BuyerShopInfo from "../../buyer/pages/BuyerShopInfo.jsx";
import {sanctionProduct} from "../../api/v1/admin/admin.js";
import { joiResolver } from "@mantine/form";

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
    <div
      style={{
        display: "flex",
        flexDirection: "coulmn",
        marginTop:"20px",
      }}
    >
      <Image
        w={200}
        h={200}
        radius={"8px"}
        src={product?.productImage}
        fallbackSrc="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg"
      />
      <div style={{width:"100%"}}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {product?.categoryId}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "coulmn",
            marginLeft:"45px"
          }}
        >
          <h1>{product?.name} </h1>
          <div
            onClick={() => handleHeart(product.id)}
            style={{ marginTop: "18px", marginLeft: "10px" }}
          >
            {favorite.indexOf(product?.id) !== -1 ? (
              <AiFillHeart style={{ color: "red" }} />
            ) : (
              <AiOutlineHeart style={{ fontSize: "20px" }} />
            )}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row", padding: "10px" }}>
          <p style={{ margin: "0", width: "100px", alignItems: "center" }}>
            가격
          </p>
          <NumberFormatter
            thousandSeparator
            value={product?.price}
            suffix=" 원"
          />
        </div>
        <form onSubmit={addCart}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              padding: "10px",
            }}
          >
            <p style={{ marginTop:"6px",width: "100px" }}>수량</p>
            <NumberInput
              value={amount}
              onChange={(e) => {
                setAmount(e);
              }}
              style={{ width: "100px" }}
              name="amount"
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
            }}
          >
            {role === "BUYER" ? (
              <Button type="submit">장바구니에 담기</Button>
            ) : null}
            {role === "ADMIN" ? (
              <Button type="submit" onClick={sanctionProductApply}>
                판매자 제재하기
              </Button>
            ) : null}
            <BuyerShopInfo product={product} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductDetail;
