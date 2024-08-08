import { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import ProductList from "../../sellerbackoffice/component/ProductList";
import "../css/CouponPage.css"


import {
    deleteProduct
} from "../../api/v1/product/product";
import{
    changeQuantity,
    changePrice,
    getSellerProducts
} from "../../api/v1/seller-backoffice/inventoryManagement";
import {Button, Image, TextInput} from "@mantine/core";
import {modals} from "@mantine/modals";
import CreateCouponModal from "../components/CreateCouponModal.jsx";
import {getSellerCouponList} from "../../api/v1/coupon/coupon.js";
import UpdateCouponModal from "../components/UpdateCouponModal.jsx";

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
    console.log(couponData);

    return(
        <div className="product-list">
            <h1>상품 목록</h1>
            <div className="product-backoffice-top-bar">
                <Link to="/product-create">
                    <Button color="gray" className="top-bar-btn" style={{marginBottom: "10px"}}>
                        상품 생성
                    </Button>
                </Link>
                <Link to="/product-list">
                    <Button color="gray" className="top-bar-btn" style={{marginBottom: "10px"}}>
                        상품 관리
                    </Button>
                </Link>
            </div>
            {couponData.map((coupon, index) => (
                <div className="product-item" key={index}>
                    <div className="image">
                        <Image
                            className="product-image"
                            radius="md"
                            h={150}
                            w={150}
                            fit="crop"
                            src="https://ifh.cc/g/xQTG2b.png"
                            //   src={coupon.image}
                            fallbackSrc="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg"
                            style={{marginRight: 15}}
                        />
                    </div>
                    <div className="product-info">
                        <h2>{coupon.couponName}</h2>
                        <p>쿠폰 정책: {policyKorean(coupon.discountPolicy)}</p>
                        {
                            coupon.discountPolicy === 'DISCOUNT_RATE' ? <p>할인율: {coupon.discount} %</p>
                                : <p>가격 할인 : {coupon.discount} 원 </p>
                        }
                        <p>쿠폰 개수: {coupon.quantity}</p>
                    </div>
                    <div className="coupon-actions">
                        <p>만료 시간 : {coupon.expiredAt}</p>
                        <UpdateCouponModal token={token} coupon={coupon} />
                        <Button
                            color="gray"
                            className="update-btn"
                            style={{marginTop: '5px'}}
                        >
                            쿠폰 삭제
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CouponPage;