import {
  Button,
  Checkbox,
  Image,
  Fieldset,
  NumberFormatter
} from "@mantine/core";
import React, { useState } from "react";
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
  const [wait, setWait] = useState(false);

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
    } else {
      products.push(data.cartId);
      setTotalPrice(totalPrice + data.productPrice * data.productQuantity);
      setPaymentData((prevData) => [...prevData, data]);
    }
  };

  const handleHeart = async (productId) => {
    if (wait == true) {
      return;
    }
    setWait(true);
    await favoriteChange(productId);
    setWait(false);
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
    if (wait == true) {
      return;
    }
    setWait(true);
    await deleteItem(productId);
    setWait(false);
    window.location.reload();
  };

  return (
    <>
      <h1>장바구니</h1>
      {items.length != 0 ? (
        items.map((shop) => {
          return (
            <div>
              <h2>{shop.shopId}번 가게의 상품</h2>
              {shop.items.map((item) => {
                return (
                  <div key={item.cartId}>
                    <Fieldset
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        margin: 0,
                        padding: "15px",
                        marginBottom:"10px"
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          alignItems: "center",
                          gap: "20px",
                        }}
                      >
                        <Checkbox color="black" onClick={() => setting(item)} />
                        <Image
                          radius="md"
                          src={item.productImageUrl}
                          h={120}
                          w={120}
                          fallbackSrc="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg"
                        />
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            textAlign: "left",
                            gap:"15px"
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "flex-start",
                              alignItems: "center",
                              textAlign: "left",
                            }}
                          >
                            <h2 style={{margin:0}}>{item.productName}</h2>
                            <div onClick={() => handleHeart(item.productId)}>
                              {favorites.indexOf(item.productId) != -1 ? (
                                <AiFillHeart
                                  style={{
                                    color: "red",
                                    fontSize: "20px",
                                    marginLeft: "20px",
                                    marginTop: "6px",
                                  }}
                                />
                              ) : (
                                <AiOutlineHeart
                                  style={{
                                    fontSize: "20px",
                                    marginLeft: "20px",
                                    marginTop: "6px",
                                  }}
                                />
                              )}
                            </div>
                          </div>
                          <div style={{ display: "flex" }}>
                            <p
                              style={{
                                margin: "0",
                                width: "100px",
                                fontWeight: "600",
                              }}
                            >
                              상품 가격
                            </p>
                            <NumberFormatter value={item.productPrice}suffix=" 원" />
                          </div>
                          <div style={{ display: "flex" }}>
                            <p
                              style={{
                                margin: "0",
                                width: "100px",
                                fontWeight: "600",
                              }}
                            >
                              상품 수량
                            </p>
                            <p style={{ margin: "0" }}>
                              {item.productQuantity} 개
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          flexDirection: "column",
                          gap: "5px",
                        }}
                      >
                        <Link
                          to={`/product/${item.productId}`}
                          style={{ textDecoration: "none" }}
                        >
                          <Button color="black" >상품 페이지로</Button>
                        </Link>
                        <Button
                        color="black" 
                          onClick={() => {
                            itemDelete(item.productId);
                          }}
                        >
                          삭제하기
                        </Button>
                      </div>
                    </Fieldset>
                  </div>
                );
              })}
            </div>
          );
        })
      ) : (
        <div style={{ marginTop: "200px" }}>Loading..</div>
      )}

      {items.length != 0 ? (
        <div
          fluid
          style={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            gap:"30px",
            background:"#efefef"
          }}
        >
              <p fw={500}>선택한 상품 금액</p><NumberFormatter value={totalPrice} suffix=" 원" />
              <p fw={500}>총 </p><p>{products.length}건</p>
              <PaymentModal
                totalPrice={totalPrice}
                paymentData={paymentData}
                token={token}
              />
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default BuyerCartForm;
