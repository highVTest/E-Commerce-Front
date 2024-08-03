import {Button, Card, Fieldset, Image, Text} from "@mantine/core";
import "../css/BuyerOrderListPage.css"
import {useEffect, useState} from "react";
import { getBuyerOrders} from "../../api/v1/orders/orders.js";
import OrderDetailsModal from "../components/OrderDetailsModal.jsx";

const BuyerOrderListPage = () => {

    const [buyerOrder, setBuyerOrder] = useState([]);

    const token = localStorage.getItem("token");

    const getBuyerOrderList = async () => {
        const data = await getBuyerOrders(token);

        setBuyerOrder(data.data);
    }

    useEffect(() => {

        getBuyerOrderList()

    }, [])

    if (!buyerOrder || !buyerOrder.length === 0) {
        return <div>Loading...</div>;
    }


    return (
        <>

            {

                buyerOrder.map((order) => {
                    return (
                        <>
                            <Fieldset legend={`${order.orderMasterId} 번 주문 내역`} style={{margin: "10px"}}>
                                {
                                    order.orderShopDetails.map((orderDetails) => {
                                        return (
                                            <>
                                                <Fieldset style={{margin: "10px"}} legend={`${orderDetails.shopId} 번 상점`}>
                                                    {
                                                        orderDetails.productsOrders.map((productOrder) => {
                                                            return (
                                                                <>
                                                                    <Fieldset disabled fw={1000}
                                                                              style={{margin: "10px"}}>
                                                                        <div className="field-set">
                                                                            <Card
                                                                                shadow="none"
                                                                                padding="lg"
                                                                                component="a"
                                                                            >
                                                                                <Image
                                                                                    src="https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                                                                                    h={100}
                                                                                    alt="No way!"
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
                                                            )
                                                        })

                                                    }
                                                    <div className="card">
                                                        <div style={{width: "85%"}}></div>
                                                        <OrderDetailsModal
                                                            orderShopDetails={order.orderShopDetails} orderMasterId={order.orderMasterId}></OrderDetailsModal>
                                                    </div>
                                                </Fieldset>

                                            </>
                                        )
                                    })
                                }
                            </Fieldset>
                        </>
                        )
                    })

            }


        </>

    );
};


export default BuyerOrderListPage;