import SellerNavComponent from "../component/SellerNavComponent.jsx";
import "../component/css/SellerInfoForm.css"
import {Button, Fieldset, Image, NativeSelect, Stack, Text} from "@mantine/core";
import {getSellerOrderDetailsAll} from "../../api/v1/orders/orders.js";
import {useEffect, useState} from "react";
import {getShopInfo} from "../../api/v1/seller-backoffice/sellerInfo.js";
import UpdateDeliveryModal from "../component/UpdateDeliveryModal.jsx";


const OrderListPage = () => {
    const [pendingData, setPendingData] = useState([]);
    const [shopId, setShopId] = useState(0);
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const [getEnum , setEnum] = useState("ORDERED");

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
    }

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
    }
    console.log(getEnum);
    const orderList = async () => {
        try {
        const shop = await getShopInfo(token);
        const data = await getSellerOrderDetailsAll(token, shop.data.id, getEnum)
        setShopId(shop.data.id)
        setPendingData(data.data);
        }catch (error) {
            console.log(error);
            alert(error.response.data.errorMessage);
        }

    }

    const handleSearchClick = () => {

            orderList();

    }


    useEffect(() => {
        orderList()
    }, []);

    return (
        <div className="seller">
            <SellerNavComponent/>
            <Stack>
                <div style={{display:"flex", alignItems:"center", justifyContent:"flex-end"}}>
                    <NativeSelect label="주문 상태를 선택해 주세요"  data={['주문 접수', '주문 취소','상품 준비 중', "상품 배달 준비 중", "상품 배달 중", "상품 배달 완료"]} onChange={(e)=>orderStatusToEnum(e.currentTarget.value)} />
                    <Button style={{marginLeft:"10px", marginTop:"29px"}} onClick={handleSearchClick}>검색</Button>
                </div>

            {
                (pendingData.length > 0)?
                    (pendingData.map((data, index) => {
                    return (
                        <div className="product-item" key={index} style={{marginTop:"20px", backgroundColor:"beige"}}>
                            <div className="product-info">
                                <div style={{display:"flex"}}>
                                    <div style={{width:"90%"}}>
                                        <h2>주문 번호 : {data.orderMasterId}</h2>
                                        <Text fw={500} size="lg" mt="md">
                                            주문 시간 : {data.registerDate.split("-")[0]} 년{" "}
                                            {data.registerDate.split("-")[1]} 월{" "}
                                            {data.registerDate.split("-")[2].slice(0, 2)} 일
                                        </Text>
                                    </div>
                                    <div style={{justifyContent: "flex-end", margin: "30px"}}>
                                        <UpdateDeliveryModal token={token} shopId={shopId} orderMasterId={data.orderMasterId}/>
                                    </div>
                                </div>
                                <Stack>
                                    {

                                        data.products.map((orderDetail, index) => {
                                            return (
                                                <div key={index}>
                                                    <Fieldset style={{display: "flex", width: "1100px"}}>
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
                                                                구매자 이름 : {orderDetail.complainBuyerName}
                                                            </Text>
                                                            <Text fw={500} size="lg" mt="md">
                                                                결제 상태 : {orderStatusToKorean(orderDetail.statusCode)}
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

export default OrderListPage;