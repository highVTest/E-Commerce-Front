import { Button, Grid, Group, Stack, Text, Fieldset } from "@mantine/core";
import {
  deleteBuyerCoupon,
  getBuyerCouponList,
} from "../../api/v1/coupon/coupon.js";
import { useEffect, useState } from "react";
// eslint-disable-next-line react/prop-types
const MyCouponPage = () => {
  const [coupons, setCoupons] = useState([]);
  const token = localStorage.getItem("token");

  const [click, setClick] = useState(false);

  const getBuyerCoupon = async () => {
    const data = await getBuyerCouponList(token);
    console.log(data.data);
    setCoupons(data.data);
  };

  const getDeleteBuyerCoupon = async (couponId) => {
    if (click == true) {
      return;
    }
    setClick(true);
    try {
      await deleteBuyerCoupon(token, couponId);
      alert("쿠폰 삭제가 완료 되었습니다");
      setClick(false);
      getBuyerCoupon();
    } catch (e) {
      alert(e.response.data.errorMessage);
      setClick(false);
    }
  };

  useEffect(() => {
    getBuyerCoupon();
  }, []);

  return (
    <>
      <h1>쿠폰 목록</h1>
      {coupons.map((coupon) => {
        return (
          <div key={coupon.couponId}>
            <Fieldset
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin:0,
                padding: "15px",
                marginBottom:"10px"
              }}
            >
              <Stack style={{ textAlign: "left", marginLeft: "10px" }}>
                <h2 style={{ margin: "0" ,marginBottom:"10px"}}>{coupon.couponName}</h2>
                {coupon.discountPolicy === "DISCOUNT_RATE" ? (
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <p
                      style={{ margin: "0", fontWeight: "600", width: "90px" }}
                    >
                      할인율
                    </p>
                    <p style={{ margin: "0" }}>할인율 : {coupon.discount} %</p>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <p
                      style={{ margin: "0", fontWeight: "600", width: "90px" }}
                    >
                      할인 금액
                    </p>
                    <p style={{ margin: "0" }}>
                      할인 금액 : {coupon.discount} 원
                    </p>
                  </div>
                )}
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <p style={{ margin: "0", fontWeight: "600", width: "90px" }}>
                    만료 시간
                  </p>
                  <p style={{ margin: "0" }}>
                    {coupon.expiredAt.split("-")[0]} 년{" "}
                    {coupon.expiredAt.split("-")[1]} 월{" "}
                    {coupon.expiredAt.split("-")[2].slice(0, 2)} 일 까지
                  </p>
                </div>
              </Stack>

              <Button
              color="black" 
              variant="outline"
                onClick={() => {
                  getDeleteBuyerCoupon(coupon.couponId);
                }}
              >
                삭제 하기
              </Button>
            </Fieldset>
          </div>
        );
      })}

    </>
  );
};

export default MyCouponPage;
