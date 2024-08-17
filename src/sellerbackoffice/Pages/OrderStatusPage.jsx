import SellerNavComponent from "../component/SellerNavComponent.jsx";
import "../component/css/SellerInfoForm.css"
import {Image, Text, Fieldset, Stack} from "@mantine/core";
import {getSellerOrderDetailsAll} from "../../api/v1/orders/orders.js";
import {useEffect, useState} from "react";
import {getShopInfo} from "../../api/v1/seller-backoffice/sellerInfo.js";
import RejectModal from "../component/RejectModal.jsx";
import AcceptModal from "../component/AcceptModal.jsx";


const OrderStatusPage = () => {
    const [pendingData, setPendingData] = useState([]);
    const [shopId, setShopId] = useState(0);
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
        alert("로그인을 해주세요");
        window.location.href = "/login/seller";
    } else if (role !== "SELLER") {
        alert("권한이 없습니다");
        window.location.href = "/login/seller";
    }


    const orderList = async () => {
        const shop = await getShopInfo(token);
        const data = await getSellerOrderDetailsAll(token, shop.data.id, "PENDING")
        setShopId(shop.data.id)
        setPendingData(data.data);
    }

    useEffect(() => {
        orderList()
    }, []);

    return (
        <div className="seller">
            <SellerNavComponent/>
            <Stack>
            {
                (pendingData.length > 0 )?
                    (pendingData.map((data, index) => {
                    return (
                        <div className="product-item" key={index} style={{marginTop:"20px"}}>
                            <div className="product-info">
                                <div style={{display:"flex"}}>
                                    <div style={{width:"70%"}}>
                                        <h2>주문 번호 : {data.orderMasterId}</h2>
                                        <Text fw={500} size="lg" mt="md">
                                            주문 시간 : {data.registerDate.split("-")[0]} 년{" "}
                                            {data.registerDate.split("-")[1]} 월{" "}
                                            {data.registerDate.split("-")[2].slice(0, 2)} 일
                                        </Text>
                                    </div>
                                    <div style={{display:"flex", margin: "20px"}}>
                                        <RejectModal token={token} data={data} shopId={shopId}/>
                                        <AcceptModal token={token} data={data} shopId={shopId}/>
                                    </div>
                                </div>
                                <Stack>
                                    {

                                        data.products.map((orderDetail, index) => {
                                            return (
                                                <div key={index}>
                                                    <Fieldset style={{display: "flex", width: "700px"}}>
                                                        <Image
                                                            className="product-image"
                                                            radius="md"
                                                            h={150}
                                                            w={150}
                                                            fit="crop"
                                                            src={orderDetail.productImage}
                                                            //   src={product.image}
                                                            fallbackSrc="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg"
                                                            style={{marginRight: "15px", marginTop:"10px"}}
                                                        />
                                                        <div style={{marginLeft:"50px", width:"500px"}}>
                                                            <Text fw={500} size="lg" mt="md">
                                                                구매자 요청 시간 : {orderDetail.buyerComplainDate.split("-")[0]} 년{" "}
                                                                {orderDetail.buyerComplainDate.split("-")[1]} 월{" "}
                                                                {orderDetail.buyerComplainDate.split("-")[2].slice(0, 2)} 일
                                                            </Text>
                                                            <Text fw={500} size="lg" mt="md">
                                                                구매자 이름 : {orderDetail.complainBuyerName}
                                                            </Text>
                                                            <Text fw={500} size="lg" mt="md">
                                                                결제 상태 : 보류
                                                            </Text>
                                                            <Text fw={500} size="lg" mt="md">
                                                                구매자 민원 상태 :
                                                                {
                                                                    (orderDetail.complainStatus.split("_")[0] === "REFUND") ? "환불" : "교환"
                                                                }
                                                                {
                                                                    (orderDetail.complainStatus.split("_")[1] === "REQUESTED") ? " 요청됨" : " 됨"
                                                                }
                                                            </Text>
                                                        </div>

                                                    </Fieldset>

                                            </div>
                                        )
                                    })

                                }
                                </Stack>

                            </div>
                        </div>

                    )

                })):
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <Text fw={1000} size="lg" mt="lg">
                            결제 및 환불 요청된 상품이 존재 하지 않습니다
                        </Text>
                    </div>

            }
            </Stack>

        </div>
    )
}

export default OrderStatusPage;