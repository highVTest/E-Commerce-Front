import SellerNavComponent from "../component/SellerNavComponent.jsx";
import "../component/css/SellerInfoForm.css";
import {
  Button,
  Fieldset,
  Image,
  NativeSelect,
  Stack,
  Text,
} from "@mantine/core";
import { getSellerOrderDetailsAll } from "../../api/v1/orders/orders.js";
import { useEffect, useState } from "react";
import { getShopInfo } from "../../api/v1/seller-backoffice/sellerInfo.js";
import UpdateDeliveryModal from "../component/UpdateDeliveryModal.jsx";

const OrderListPage = () => {
  const [pendingData, setPendingData] = useState([]);
  const [shopId, setShopId] = useState(0);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [getEnum, setEnum] = useState("ORDERED");

  if (!token) {
    alert("로그인을 해주세요");
    window.location.href = "/login/seller";
  } else if (role !== "SELLER") {
    alert("권한이 없습니다");
    window.location.href = "/login/seller";
  }

  const orderStatusToKorean = (orderStatus) => {
    switch (orderStatus) {
      case "ORDER_CANCELED":
        return "주문이 취소 됨";

      case "ORDERED":
        return "주문 접수";

      case "PRODUCT_PREPARING":
        return "상품 준비 중";

      case "DELIVERY_PREPARING":
        return "상품 배달 준비 중";

      case "SHIPPING":
        return "상품 배달 중";

      case "DELIVERED":
        return "상품 배달 완료";

      case "PENDING":
        return "보류";
    }
  };

  const orderStatusToEnum = (orderStatus) => {
    switch (orderStatus) {
      case "주문 취소":
        return setEnum("ORDER_CANCELED");

      case "주문 접수":
        return setEnum("ORDERED");

      case "상품 준비 중":
        return setEnum("PRODUCT_PREPARING");

      case "상품 배달 준비 중":
        return setEnum("DELIVERY_PREPARING");

      case "상품 배달 중":
        return setEnum("SHIPPING");

      case "상품 배달 완료":
        return setEnum("DELIVERED");
    }
  };
  const orderList = async () => {
    try {
      const shop = await getShopInfo(token);
      const data = await getSellerOrderDetailsAll(token, shop.data.id, getEnum);
      setShopId(shop.data.id);
      setPendingData(data.data);
    } catch (error) {
      alert(error.response.data.errorMessage);
    }
  };

  const handleSearchClick = () => {
    orderList();
  };

  useEffect(() => {
    orderList();
  }, []);

  return (
    <div className="seller">
      <SellerNavComponent />
      <div style={{ width: "100%", marginLeft: "20px" }}>
        <Stack>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <h1>주문 상태 관리</h1>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <NativeSelect
                label="주문 상태를 선택해 주세요"
                data={[
                  "주문 접수",
                  "주문 취소",
                  "상품 준비 중",
                  "상품 배달 준비 중",
                  "상품 배달 중",
                  "상품 배달 완료",
                ]}
                onChange={(e) => orderStatusToEnum(e.currentTarget.value)}
                onClick={handleSearchClick}
              />
            </div>
          </div>

          {pendingData.length > 0 ? (
            pendingData.map((data, index) => {
              return (
                <div
                  className="product-item"
                  key={index}
                  style={{ width: "100%", margin: "0" }}
                >
                  <div className="product-info" style={{ width: "100%" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "100%",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-start",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-start",
                          }}
                        >
                          <h2 style={{ margin: "0" }}>주문 번호 &emsp;</h2>{" "}
                          <p style={{ margin: "0" }}> {data.orderMasterId}</p>
                        </div>
                        <p
                          style={{
                            margin: "0",
                            marginLeft: "2px",
                            marginTop: "5px",
                            marginBottom: "10px",
                          }}
                        >
                          <b>주문 시간</b> &emsp;{" "}
                          {data.registerDate.split("-")[0]} 년{" "}
                          {data.registerDate.split("-")[1]} 월{" "}
                          {data.registerDate.split("-")[2].slice(0, 2)} 일
                        </p>
                      </div>
                      <div>
                        <UpdateDeliveryModal
                          token={token}
                          shopId={shopId}
                          orderMasterId={data.orderMasterId}
                        />
                      </div>
                    </div>
                    <div>
                      <Stack>
                        {data.products.map((orderDetail, index) => {
                          return (
                            <div key={index}>
                              <Fieldset
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "flex-start",
                                  margin: "0",
                                  padding: "15px",
                                }}
                              >
                                <Image
                                  className="product-image"
                                  radius="md"
                                  h={120}
                                  w={120}
                                  fit="crop"
                                  style={{ margin: "0" }}
                                  src={orderDetail.productImage}
                                  fallbackSrc="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg"
                                />
                                <div
                                  style={{
                                    marginLeft: "20px",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "10px",
                                  }}
                                >
                                  <div
                                    style={{
                                      marginLeft: "20px",
                                      display: "flex",
                                      flexDirection: "row",
                                    }}
                                  >
                                    <p style={{ margin: "0", width: "150px" }}>
                                      <b>구매자 이름</b>
                                    </p>
                                    <p style={{ margin: "0" }}>
                                      {orderDetail.complainBuyerName}
                                    </p>
                                  </div>
                                  <div
                                    style={{
                                      marginLeft: "20px",
                                      display: "flex",
                                      flexDirection: "row",
                                    }}
                                  >
                                    <p style={{ margin: "0", width: "150px" }}>
                                      <b>결제 상태</b>
                                    </p>
                                    <p style={{ margin: "0" }}>
                                      {orderStatusToKorean(
                                        orderDetail.statusCode
                                      )}
                                    </p>
                                  </div>
                                </div>
                              </Fieldset>
                            </div>
                          );
                        })}
                      </Stack>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text fw={1000} size="lg" mt="lg" style={{ width: "750px" }}>
                결제 및 환불 요청된 상품이 존재 하지 않습니다
              </Text>
            </div>
          )}
        </Stack>
      </div>
    </div>
  );
};

export default OrderListPage;
