import { Button, Card, Checkbox, Fieldset, Image, Text } from "@mantine/core";
import { buyerPayment } from "../../api/v1/orders/orders.js";
import { getBuyerCouponList } from "../../api/v1/coupon/coupon.js";
import React, { useEffect, useState } from "react";

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
    } else {
      checkBox.push(data.couponId);
    }
  };

  const getBuyerCoupon = async () => {
    const data = await getBuyerCouponList(token);
    const filterData = data.data.filter((coupon) =>
      productIdList.includes(coupon.productId)
    );
    setCoupons(filterData);
  };

  const getTotalPrice = async () => {

    const filteredCoupons = coupons.filter(coupon => checkBox.includes(coupon.couponId));
    console.log(filteredCoupons)

    return 0

  }



  useEffect(() => {
    getBuyerCoupon();
  }, []);

  return (
    <div style={{ margin: "10px" }}>
      <Fieldset fw={1000} legend="사용 가능 쿠폰">
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
                    <Checkbox
                        onChange={()=>{setting(coupon)}}
                    />
                  </div>
                  <div style={{ width: "80%" }}>
                    <Text fw={1000} size="xl" mt="md">
                      {coupon.couponName}
                    </Text>
                    <Text fw={500} size="lg" mt="md">
                      만료 시간 : {coupon.expiredAt.split("-")[0]} 년{" "}
                      {coupon.expiredAt.split("-")[1]} 월{" "}
                      {coupon.expiredAt.split("-")[2].slice(0, 2)} 일 까지
                    </Text>
                    {coupon.discountPolicy === "DISCOUNT_RATE" ? (
                      <Text mt="md" c="dimmed" size="md">
                        {coupon.discount} % 할인 쿠폰!!
                      </Text>
                    ) : (
                      <Text mt="xs" c="dimmed" size="sm">
                        {coupon.discount} 원 할인 쿠폰!!
                      </Text>
                    )}
                  </div>
                </div>
              </Card>
            </>
          );
        })}
      </Fieldset>
      <Fieldset disabled fw={1000}>
        <div className="payment-set">
          <Text mt="xs" size="lg" fw={500}>
            총 주문 금액
          </Text>
          <Text mt="xs" size="lg" fw={1000} onChange={getTotalPrice}>
            {newTotalPrice} 원
          </Text>
        </div>
      </Fieldset>
      <div>
        <Button onClick={reqPayment} style={{ margin: "10px", float: "right" }}>
          결제 하기
        </Button>
        <Button onClick={close} style={{ margin: "10px", float: "right" }}>
          닫기
        </Button>
      </div>
    </div>
  );
}

export default PaymentComponent;
