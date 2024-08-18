import { Card, Fieldset, Image, NumberFormatter, Text } from "@mantine/core";
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

    setBuyerOrder(data.data);
  };

  useEffect(() => {
    getBuyerOrderList();
  }, []);

  return (
    <>
    <h1>주문 목록</h1>
      {buyerOrder.length != 0 ? (
        buyerOrder.map((order) => {
          return (
            <>
              <Fieldset style={{margin:0,padding:"15px",marginTop:"10px"}}>
                <h2>주문 번호 : {order.orderMasterId} 번</h2>
                {order.orderShopDetails.map((orderDetails) => {
                  return (
                    <>
                      <Fieldset style={{marginTop:"10px",margin:0,padding:"15px"}}>
                        <h3>{orderDetails.shopId} 번 상점</h3>
                        {orderDetails.productsOrders.map((productOrder) => {
                          return (
                            <>
                              <Fieldset style={{marginTop:"10px",margin:0,padding:"15px"}}>
                                <div className="field-set">
                                  <Image
                                    src={productOrder.productImageUrl}
                                    h={120}
                                    w={120}
                                    style={{margin:0}}
                                    alt="No way!"
                                    fallbackSrc="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg"
                                  />
                                  <div style={{marginLeft:"50px"}}>
                                    <h2>{productOrder.productName}</h2>
                                    <h3><NumberFormatter thousandSeparator value={productOrder.productPrice} suffix="원"/></h3>
                                  </div>
                                </div>
                              </Fieldset>
                            </>
                          );
                        })}
                        <div style={{display:"flex",justifyContent:"flex-end",marginTop:"10px"}}>
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
