import {useEffect, useState} from "react";
import "../css/CouponPage.css"
import {Image} from "@mantine/core";
import { getSellerCouponList} from "../../api/v1/coupon/coupon.js";
import UpdateCouponModal from "../components/UpdateCouponModal.jsx";
import SellerNavComponent from "../../sellerbackoffice/component/SellerNavComponent.jsx";

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

    return(
        <div className="seller">
            <SellerNavComponent/>
            <div className="product-list">
                <h1>쿠폰 목록</h1>
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
                            <p>만료 시간 : {coupon.expiredAt.split("-")[0]} 년{" "}
                                {coupon.expiredAt.split("-")[1]} 월{" "}
                                {coupon.expiredAt.split("-")[2].slice(0, 2)} 일 까지</p>
                            <UpdateCouponModal token={token} coupon={coupon}/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CouponPage;