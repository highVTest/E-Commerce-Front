import {useEffect, useState} from "react";
import "../css/CouponPage.css"
import {Image} from "@mantine/core";
import { getSellerCouponList} from "../../api/v1/coupon/coupon.js";
import UpdateCouponModal from "../components/UpdateCouponModal.jsx";
import SellerNavComponent from "../../sellerbackoffice/component/SellerNavComponent.jsx";

const CouponPage=()=>{

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const [couponData, setCouponData] = useState([]);

    if (!token) {
        alert("No Token");
        window.location.href = "/login/seller"
    }else if(role !== "SELLER"){
        alert("권한이 없습니다");
        window.location.href = "/login/seller"
    }

    const getCoupon = async () => {
        const data = await getSellerCouponList(token)

        setCouponData(data.data);

    }

    const policyKorean = (discountPolicy) => {
        if(discountPolicy === 'DISCOUNT_RATE'){
            return '할인율 정책'
        }else return '가격 할인 정책'
    }

    useEffect(() => {
        getCoupon()
    },[])

    return (
      <div className="seller">
        <SellerNavComponent />
        <div
          className="product-list"
          style={{ marginLeft: "20px", width: "100%" }}
        >
          <h1>쿠폰 목록</h1>
          {couponData.map((coupon, index) => (
            <div
              className="product-item"
              key={index}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                }}
              >
                <div
                  className="product-info"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap:"10px",
                    marginLeft: "10px",
                  }}
                >
                  <h2 style={{ margin: "0" }}>{coupon.couponName}</h2>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                    }}
                  >
                    <p style={{ margin: "0", width: "100px" }}>
                      <b>쿠폰 정책</b>
                    </p>{" "}
                    <p style={{ margin: "0" }}>
                      {policyKorean(coupon.discountPolicy)}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                    }}
                  >
                    {coupon.discountPolicy === "DISCOUNT_RATE" ? (
                      <div style={{ display: "flex" }}>
                        <p style={{ margin: "0", width: "100px" }}>
                          <b>할인율</b>
                        </p>
                        <p style={{ margin: "0" }}>{coupon.discount} %</p>
                      </div>
                    ) : (
                      <div style={{ display: "flex" }}>
                        <p style={{ margin: "0", width: "100px" }}>
                          <b>가격 할인</b>
                        </p>
                        <p style={{ margin: "0" }}>{coupon.discount} 원</p>
                      </div>
                    )}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                    }}
                  >
                    <p style={{ margin: "0", width: "100px" }}>
                      <b>쿠폰 개수</b>
                    </p>
                    <p style={{ margin: "0" }}>{coupon.quantity} 개</p>
                  </div>
                </div>
              </div>
              <div
                className="coupon-actions"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "120px",
                }}
              >
                <p style={{ margin: "0" }}>
                  만료 시간 &emsp;{coupon.expiredAt.split("-")[0]} 년{" "}
                  {coupon.expiredAt.split("-")[1]} 월{" "}
                  {coupon.expiredAt.split("-")[2].slice(0, 2)} 일 까지
                </p>
                <UpdateCouponModal token={token} coupon={coupon} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
};

export default CouponPage;