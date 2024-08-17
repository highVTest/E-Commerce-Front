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
            <div style={{width:"100%", marginLeft:"20px"}}>
                <h1>결제 상태 관리</h1>
                <Stack>
                {
                    (pendingData.length > 0 )?
                        (pendingData.map((data, index) => {
                        return (
                            <div className="product-item" key={index} >
                                <div style={{width:"100%"}}>
                                    <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between", width:"100%", alignItems:"center"}}>
                                        <div style={{display:"flex",flexDirection:"column",justifyContent:"flex-start"}}>
                                            <div style={{display:"flex",flexDirection:"row",justifyContent:"flex-start"}}>
                                                <h2 style={{margin:"0"}}>주문 번호  &emsp;</h2> <p style={{margin:"0"}}> {data.orderMasterId}</p>
                                            </div>
                                            <p style={{margin:"0",marginLeft:"2px",marginTop:"5px",marginBottom:"10px"}}>
                                                <b>주문 시간</b> &emsp; {data.registerDate.split("-")[0]} 년{" "}
                                                {data.registerDate.split("-")[1]} 월{" "}
                                                {data.registerDate.split("-")[2].slice(0, 2)} 일
                                            </p>
                                        </div>
                                        <div style={{display:"flex",flexDirection:"row",justifyContent:"flex-end"}}>
                                            <AcceptModal token={token} data={data} shopId={shopId}/>
                                            <RejectModal token={token} data={data} shopId={shopId}/>
                                        </div>
                                    </div>
                                    <div>
                                        <Stack>
                                        {
                                            data.products.map((orderDetail, index) => {
                                                return (
                                                    <div key={index}>
                                                        <Fieldset style={{margin:"0",padding:"15px", display:"flex",flexDirection:"row",justifyContent:"flex-start",textAlign:"left"}}>
                                                            <Image
                                                                className="product-image"
                                                                radius="md"
                                                                h={120}
                                                                w={120}
                                                                fit="crop"
                                                                src={orderDetail.productImage}
                                                                style={{margin:"0"}}
                                                                fallbackSrc="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg"
                                                            />
                                                            <div style={{marginLeft:"20px", display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
                                                                <div style={{display:"flex",flexDirection:"row",justifyContent:"flex-start"}}>
                                                                    <p style={{margin:"0", width:"200px"}}><b>구매자 요청 시간</b></p>
                                                                    <Text>
                                                                        {orderDetail.buyerComplainDate.split("-")[0]} 년{" "}
                                                                        {orderDetail.buyerComplainDate.split("-")[1]} 월{" "}
                                                                        {orderDetail.buyerComplainDate.split("-")[2].slice(0, 2)} 일
                                                                    </Text>
                                                                </div>
                                                                <div style={{display:"flex",flexDirection:"row",justifyContent:"flex-start"}}>
                                                                    <p style={{margin:"0", width:"200px"}}><b>구매자 이름</b></p><p style={{margin:"0"}}>{orderDetail.complainBuyerName}</p>
                                                                </div>
                                                                <div style={{display:"flex",flexDirection:"row",justifyContent:"flex-start"}}>
                                                                    <p style={{margin:"0", width:"200px"}}><b>결제 상태</b></p> <p style={{margin:"0"}}>보류</p>
                                                                </div>
                                                                <div style={{display:"flex",flexDirection:"row",justifyContent:"flex-start"}}>
                                                                    <p style={{margin:"0",width:"200px"}}><b>구매자 민원 상태</b></p>
                                                                    {(orderDetail.complainStatus.split("_")[0] === "REFUND") ? "환불" : "교환"}
                                                                    {(orderDetail.complainStatus.split("_")[1] === "REQUESTED") ? " 요청됨" : " 됨"}
                                                                </div>
                                                            </div>
                                                        </Fieldset>
                                                    </div>
                                                )
                                            })
                                        }
                                        </Stack>
                                    </div>
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
        </div>
    )
}

export default OrderStatusPage;