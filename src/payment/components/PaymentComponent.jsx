import { Button, Card, Checkbox, Fieldset, Image, Text } from "@mantine/core";
import { buyerPayment } from "../../api/v1/orders/orders.js";
import { getBuyerCouponList } from "../../api/v1/coupon/coupon.js";
import React, { useEffect, useState } from "react";
import productContainer from "../../homepage/components/ProductContainer.jsx";

//totalPrice 제외
function PaymentComponent({ token, paymentData, totalPrice, close }) {
  const cartIdList = [];
  const productIdList = [];
  const [coupons, setCoupons] = useState([]);
  const [couponIdList, setCouponIdList] = useState([]);
  const [wait, setWait] = useState(false);
  const [checkBox, setCheckBox] = useState([]);
  const [newTotalPrice, setNewTotalPrice] = useState(totalPrice);

  for (let i = 0; i < paymentData.length; i++) {
    cartIdList.push(paymentData[i].cartId);
    productIdList.push(paymentData[i].productId);
  }

  const reqPayment = async () => {
    if (cartIdList.length == 0) {
      alert("상품을 선택해주세요");
      return;
    }

    if (wait == true) {
      return;
    }
    setWait(true);
    try {
      await buyerPayment(token, cartIdList, checkBox);
      alert("결제가 완료 되었습니다");
      setWait(false);
      close();
      window.location.href = "/orderDetails";
    } catch (error) {
      const msg = error.response.data.errorMessage;
      alert(msg);
    }
    setWait(false);
  };

  const setting = (data) => {
    const isIn = checkBox.indexOf(data.couponId);

    if (isIn != -1) {
      checkBox.splice(isIn, isIn + 1);
      calc(data, 1);
    } else {
      calc(data, -1);
      checkBox.push(data.couponId);
    }
  };

  const calc = (data, mode) => {
    let product;
    if (mode != -1) {
      if (data.discountPolicy == "DISCOUNT_RATE") {
        paymentData.forEach((i) => {
          if (i.productId == data.productId) {
            product = i;
          }
        });
        let price =
          product.productPrice *
          product.productQuantity *
          (data.discount / 100);

        setNewTotalPrice(newTotalPrice + price);
      } else {
        paymentData.forEach((i) => {
          if (i.productId === data.productId) {
            product = i;
          }
        });
        let price = data.discount;

        setNewTotalPrice(newTotalPrice + price);
      }
    } else {
      if (data.discountPolicy === "DISCOUNT_RATE") {
        paymentData.forEach((i) => {
          if (i.productId == data.productId) {
            product = i;
          }
        });
        let price =
          product.productPrice *
          product.productQuantity *
          (data.discount / 100);

        setNewTotalPrice(newTotalPrice - price);
      } else {
        paymentData.forEach((i) => {
          if (i.productId === data.productId) {
            product = i;
          }
        });
        let price = data.discount;

        setNewTotalPrice(newTotalPrice - price);
      }
    }
  };

  const getBuyerCoupon = async () => {
    const data = await getBuyerCouponList(token);

    const filterData = data.data.filter((coupon) =>
          productIdList.includes(coupon.productId)
    );
    setCoupons(filterData);
  };

  useEffect(() => {
    getBuyerCoupon();
  }, []);

  return (
    <div>
      <Fieldset fw={600} legend="사용 가능 쿠폰">
        {coupons.map((coupon) => {
          return (
            <>
              <Card
                shadow="sm"
                padding="xs"
                component="a"
                target="_blank"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div
                  className="field-set"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div style={{ marginRight: "20px" }}>
                    <Checkbox color="black"
                      onChange={() => {
                        setting(coupon);
                      }}
                    />
                  </div>
                  <div style={{ width: "80%" }}>
                    <h1>{coupon.couponName}</h1>
                    {coupon.discountPolicy === "DISCOUNT_RATE" ? (
                      <h2 style={{color:"red"}}>
                        {coupon.discount} % 할인 쿠폰!!
                      </h2>
                    ) : (
                      <h2 style={{color:"red"}}>
                        {coupon.discount} 원 할인 쿠폰!!
                      </h2>
                    )}
                    <h3>
                      만료 시간 : {coupon.expiredAt.split("-")[0]} 년{" "}
                      {coupon.expiredAt.split("-")[1]} 월{" "}
                      {coupon.expiredAt.split("-")[2].slice(0, 2)} 일 까지
                    </h3>
                  </div>
                </div>
              </Card>

            </>
          );
        })}
      </Fieldset>
      <Fieldset disabled fw={600} style={{marginTop:"5px"}}>
        <div className="payment-set">
          <Text mt="xs" size="lg" fw={600}>
            총 주문 금액
          </Text>
          <Text mt="xs" size="lg" fw={1000}>
            {newTotalPrice} 원
          </Text>
        </div>
      </Fieldset>
      <div style={{display:"flex",justifyContent:"flex-end",gap:"5px",marginTop:"10px",marginRight:"2px"}}>
        <Button
        color="black" 
          onClick={reqPayment}
        >
          결제 하기
        </Button>
        <Button
        color="black" 
          onClick={close}
        >
          닫기
        </Button>
      </div>
    </div>
  );
}

export default PaymentComponent;
