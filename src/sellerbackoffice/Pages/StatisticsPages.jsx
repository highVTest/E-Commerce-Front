import SellerNavComponent from "../component/SellerNavComponent.jsx";
import "../component/css/SellerInfoForm.css"
import {NumberFormatter, Stack, Table, Text} from "@mantine/core";
import {getProductSales, getTotalSales} from "../../api/v1/seller-backoffice/salesStatistics.js";
import {useEffect, useState} from "react";
import {BarChart} from "@mantine/charts";

const StatisticPages = () => {
    const [totalSale, setTotalSale] = useState(0);
    const [productSales, setProductSales] = useState([]);
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
        alert("로그인을 해주세요");
        window.location.href = "/login/seller"
    }else if(role !== "SELLER"){
        alert("권한이 없습니다");
        window.location.href = "/login/seller"
    }

    const getTotalSale = async () => {
        const data = await getTotalSales(token)
        setTotalSale(data.data)
    }

    const getProductSalesData = async () => {
        const data = await getProductSales(token);
        console.log(data.data)
        setProductSales(data.data)
    }

    useEffect(() => {
        getTotalSale()
        getProductSalesData()
    },[])

    return (
        <div className="seller">
            <SellerNavComponent/>
            <Stack>
                <div style={{display: "flex", margin: "10px", justifyContent: "flex-end"}}>
                    <Text style={{marginRight: "30px"}}>상점 총 매출 : </Text>
                    <NumberFormatter prefix="₩" value={totalSale.totalPrice} thousandSeparator/>
                </div>
                <div style={{display: "flex", margin: "10px", justifyContent: "flex-end"}}>
                    <Text style={{marginRight: "30px"}}>상점 총 판매량 : </Text>
                    <NumberFormatter value={totalSale.totalQuantity} thousandSeparator suffix=" 개"/>
                </div>

                <div className="backoffice">
                    <Text size="xl" fw={1000} style={{marginBottom:"20px"}}>상품 별 판매량</Text>
                    <BarChart
                        h={500}
                        data={productSales}
                        dataKey="productName"
                        type="stacked"
                        style={{width: "1130px"}}
                        series={[
                            {name: 'productQuantity', color: 'violet.6'},
                        ]}
                    />
                </div>
                <div>
                    <Text size="xl" fw={1000} style={{marginBottom:"20px"}}>상품 별 판매 가격</Text>
                    <Table style={{width: "1130px"}}>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th style={{textAlign:"center"}}>상품 명</Table.Th>
                                <Table.Th style={{textAlign:"center"}}>상품 판매 가격</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        {
                            productSales.map((product) => {
                               return (
                                   <>
                                   <Table.Tr>
                                       <Table.Td fw={1000}>{product.productName}</Table.Td>
                                       <Table.Td> ₩ {product.productPrice}</Table.Td>
                                   </Table.Tr>
                                   </>
                               )
                            })
                        }
                    </Table>
                </div>
            </Stack>
        </div>
    )
}

export default StatisticPages;