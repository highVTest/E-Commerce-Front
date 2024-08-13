import { Card, Fieldset, Image, Text } from "@mantine/core";
import "../css/BuyerOrderListPage.css";
import { useEffect, useState } from "react";
import { getBuyerOrders } from "../../api/v1/orders/orders.js";
import OrderDetailsModal from "../components/OrderDetailsModal.jsx";

const BuyerOrderListPage = () => {
  const [buyerOrder, setBuyerOrder] = useState([]);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  if (!token) {
    alert("로그인을 해주세요");
    window.location.href = "/login/buyer";
  } else if (role !== "BUYER") {
    alert("권한이 없습니다");
    window.location.href = "/login/buyer";
  }

  const getBuyerOrderList = async () => {
    const data = await getBuyerOrders(token);
    console.log(data.data);
    setBuyerOrder(data.data);
  };

  useEffect(() => {
    getBuyerOrderList();
  }, []);

  //   if (!buyerOrder || !buyerOrder.length === 0) {
  //     return <div>Loading...</div>;
  //   }

  return (
    <>
      {buyerOrder.length != 0 ? (
        buyerOrder.map((order) => {
          return (
            <>
              <Fieldset
                legend={`${order.orderMasterId} 번 주문 내역`}
                style={{ margin: "10px" }}
              >
                {order.orderShopDetails.map((orderDetails) => {
                  return (
                    <>
                      <Fieldset
                        style={{ margin: "10px" }}
                        legend={`${orderDetails.shopId} 번 상점`}
                      >
                        {orderDetails.productsOrders.map((productOrder) => {
                          return (
                            <>
                              <Fieldset
                                disabled
                                fw={1000}
                                style={{ margin: "10px" }}
                              >
                                <div className="field-set">
                                  <Card
                                    shadow="none"
                                    padding="lg"
                                    component="a"
                                  >
                                    <Image
                                      src={productOrder.productImageUrl}
                                      h={100}
                                      alt="No way!"
                                      fallbackSrc="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg"
                                    />
                                  </Card>
                                  <div>
                                    <Text fw={1000} size="lg" mt="md">
                                      {productOrder.productName}
                                    </Text>
                                    <Text mt="xs" c="dimmed" size="sm">
                                      {productOrder.productPrice} 원
                                    </Text>
                                  </div>
                                </div>
                              </Fieldset>
                            </>
                          );
                        })}
                        <div className="card">
                          <div style={{ width: "80%" }}></div>
                          <OrderDetailsModal
                            orderShopDetails={order.orderShopDetails}
                            orderMasterId={order.orderMasterId}
                          ></OrderDetailsModal>
                        </div>
                      </Fieldset>
                    </>
                  );
                })}
              </Fieldset>
            </>
          );
        })
      ) : (
        <div style={{ marginTop: "200px" }}>Loading...</div>
      )}
    </>
  );
};

export default BuyerOrderListPage;
