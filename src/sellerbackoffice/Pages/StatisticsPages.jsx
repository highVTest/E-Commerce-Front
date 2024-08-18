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
        setProductSales(data.data)
    }

    useEffect(() => {
        getTotalSale()
        getProductSalesData()
    },[])

    return (
        <div className="seller" style={{}}>
            <SellerNavComponent/>
            <div style={{width:"100%",marginLeft:"20px"}}>
                <Stack>
                <div style={{display: "flex",flexDirection:"column", justifyContent: "flex-start",gap:"10px"}}>
                    <h1>매출 현황</h1>
                        <div style={{display: "flex",justifyContent: "flex-start",flexDirection:"column"}}>
                            <div style={{display: "flex",justifyContent: "flex-start",flexDirection:"row"}}>
                            <p style={{margin:"0",marginLeft:"10px"}}><b>상점 총 매출</b></p>
                            <p style={{margin:"0",marginLeft:"10px"}}><NumberFormatter prefix="₩" value={totalSale.totalPrice} thousandSeparator/></p>
                            </div>
                            <div style={{display: "flex",justifyContent: "flex-start",flexDirection:"row"}}>
                            <p style={{margin:"0",marginLeft:"10px"}}><b>상점 총 판매량</b></p>
                            <p style={{margin:"0",marginLeft:"10px"}}><NumberFormatter value={totalSale.totalQuantity} thousandSeparator suffix=" 개"/></p>
                            </div>
                        </div>
                    </div>
                    <div 
                        className="backoffice">
                        <h2 style={{marginBottom:"20px"}}>상품 별 판매량</h2>
                        <BarChart
                            h={300}
                            data={productSales}
                            dataKey="productName"
                            type="stacked"
                            series={[
                                {name: 'productQuantity', color: 'gray'},
                            ]}
                        />
                    </div>
                    <div>
                        <h2 style={{marginBottom:"20px"}}>상품 별 판매 가격</h2>
                        <Table style={{width: "700px"}}>
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
        </div>
    )
}

export default StatisticPages;