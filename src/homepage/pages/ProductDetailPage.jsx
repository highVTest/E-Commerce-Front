import { Anchor, Box, Button, Fieldset, Image, Title } from "@mantine/core";
import React, { useEffect, useState } from "react";

import { useParams } from "react-router";
import {
  favoriteDelete,
  favoriteManagement,
  getFavorites,
} from "../../api/v1/favorite/favorite";
import { addItemIntoCart } from "../../api/v1/item-cart/itemCart";

import {
  getBuyerCouponById,
  getDetailCoupon,
  issuedCoupon,
} from "../../api/v1/coupon/coupon.js";

import { getProductById } from "../../api/v1/product/product";
import CommonLayout from "../components/CommonLayout";
import ProductDetail from "../components/ProductDetail";
import ProdcutReviewContainer from "../components/ProductReviewContainer";

const ProductDetailPage = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [product, setProduct] = useState(null);
  const [coupon, setCoupon] = useState(null);
  const [couponToBuyer, setCouponToBuyer] = useState(null);
  const params = useParams();
  const productId = params.id;

  const [click, setClick] = useState(false);

  const getProductOne = async () => {
    const data = await getProductById(productId);
    setProduct(data.data);
    getBuyerFavorites();
  };

  const useBuyerCouponById = async () => {
    try {
      const data = await getBuyerCouponById(token, productId);
      setCouponToBuyer(data);
      // console.log(couponToBuyer);
    } catch (e) {
      if (e.response.data.errorMessage === "쿠폰을 가지고 있지 않습니다") {
        // console.log(e.response.data.errorMessage);
        setCouponToBuyer(null);
      }
    }
  };

  const [favorite, setFavorite] = useState([]);

  const getBuyerFavorites = async () => {
    const data = await getFavorites(token);

    const favorites = [];
    data.data.forEach((favorite) => {
      favorites.push(favorite.productId);
    });
    setFavorite(favorites);
  };
  const favoriteChange = async (productId) => {
    try {
      let data;
      if (favorite.indexOf(product?.id) == -1) {
        console.log("123", favorite.indexOf(product?.id));
        data = await favoriteManagement(token, productId);
      } else {
        console.log("987", favorite.indexOf(product?.id));

        data = await favoriteDelete(token, productId);
      }

      const msg = data.data.msg;
      if (
        msg == "찜 목록에서 삭제했습니다." ||
        msg == "찜 목록에 추가 했습니다."
      ) {
        alert(msg);
      }
      await getBuyerFavorites();
    } catch (e) {
      alert("찜 관련 실패");
    }
  };

  const addItemCart = async (amount) => {
    if (amount < 1) {
      alert("1개 이상만 담을 수 있습니다.");
      return false;
    }
    const data = await addItemIntoCart(token, productId, amount);
    alert(data.data.msg);
    return true;
  };

  const getDetailCouponData = async () => {
    try {
      const data = await getDetailCoupon(productId);

      setCoupon(data.data);
    } catch (e) {}
  };

  const issuedCouponFunc = async () => {
    if (click == true) {
      return;
    }

    try {
      setClick(true);
      await issuedCoupon(token, coupon.couponId);
      alert("쿠폰 발급이 완료 되었습니다");
      getDetailCouponData();
      // eslint-disable-next-line react-hooks/rules-of-hooks
      await useBuyerCouponById();
    } catch (e) {
      alert(e.response.data.errorMessage);
    }
    setClick(false);
  };

  useEffect(() => {
    getProductOne(productId);
    getDetailCouponData();
    useBuyerCouponById();
  }, []);

  return (
    <CommonLayout>
      <h1>상품 페이지</h1>
      <Fieldset style={{marginTop:"30px"}}> 
        <h2>상품 정보</h2>
        {
          product ? (
              <ProductDetail
                  product={product}
                  favorite={favorite}
                  favoriteChange={favoriteChange}
                  addItemCart={addItemCart}
                  role = {role}
                  token = {token}
                  productId = {productId}
              />
          ) : null
        }
        <hr style={{marginTop:"20px", marginBottom:"20px",width:"100%"}}/>
        <div>
          <h2>사용 가능한 쿠폰</h2>
          <div className="product-list">
            {coupon !== null ? (
              <div
                className="product-item"
                key={1}
              >
                <div className="image">
                  <Image
                    className="product-image"
                    radius="md"
                    h={120}
                    w={120}
                    fit="crop"
                    src={product?.productImage}
                    fallbackSrc="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg"
                    style={{ margin:"0" }}
                  />
                </div>
                <div className="product-info" style={{display:"flex", flexDirection:"column", gap:"10px"}}>
                  <h2 style={{margin:"0"}}>{coupon.couponName}</h2>
                  {coupon.discountPolicy === "RATE" ? (
                    <p style={{margin:"0"}}>할인율: {coupon.discount} %</p>
                  ) : (
                    <p style={{margin:"0"}}>가격 할인 : {coupon.discount} 원</p>
                  )}

                  <p style={{margin:"0"}}>남은 개수: {coupon.quantity} 개</p>
                </div>
                <div className="coupon-actions" style={{display:"flex",justifyContent:"space-between", flexDirection:"column"}}>
                  <p style={{margin:"0"}}>
                    만료 시간 : {coupon.expiredAt.split("-")[0]} 년{" "}
                    {coupon.expiredAt.split("-")[1]} 월{" "}
                    {coupon.expiredAt.split("-")[2].slice(0, 2)} 일 까지
                  </p>
                  {couponToBuyer === null ? (
                    <Button
                      className="update-btn"
                      style={{ marginTop: "5px" }}
                      onClick={issuedCouponFunc}
                    >
                      쿠폰 발급
                    </Button>
                  ) : (
                    <Button
                      className="update-btn"
                      style={{ marginTop: "5px" }}
                    >
                      이미 쿠폰을 가지고 있습니다
                    </Button>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <div style={{textAlign:"left", marginBottom:"50px"}}>
          <h2>상세 설명</h2>
            <p>{product?.description}</p>
        </div>
        <hr style={{marginTop:"15px", marginBottom:"15px"}}/>
        <div>
          <h2>리뷰 리스트</h2>
          <ProdcutReviewContainer
            token={token}
            productId={productId}
          ></ProdcutReviewContainer>
        </div>
      </Fieldset>
    </CommonLayout>
  );
};

export default ProductDetailPage;
