import {
  Anchor,
  Box,
  Button,
  Center,
  Fieldset,
  Image,
  Title,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  favoriteManagement,
  getFavorites,
} from "../../api/v1/favorite/favorite";
import { addItemIntoCart } from "../../api/v1/item-cart/itemCart";
import { Link } from "react-router-dom";
import UpdateCouponModal from "../../coupon/components/UpdateCouponModal.jsx";
import { getDetailCoupon, issuedCoupon } from "../../api/v1/coupon/coupon.js";
import { getProductById } from "../../api/v1/product/product";
import CommonLayout from "../components/CommonLayout";
import ProductDetail from "../components/ProductDetail";
import ProdcutReviewContainer from "../components/ProductReviewContainer";
import ProductReviewPage from "./ProductReviewPage";

const ProductDetailPage = () => {
  const token = localStorage.getItem("token");
  const [product, setProduct] = useState(null);
  const [coupon, setCoupon] = useState(null);
  const params = useParams();
  const productId = params.id;

  const getProductOne = async () => {
    const data = await getProductById(productId);
    setProduct(data.data);
    getBuyerFavorites();
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
      const data = await favoriteManagement(token, productId);
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
    }
    const data = await addItemIntoCart(token, productId, amount);
    // console.log(data);
    alert(data.data.msg);
  };

  const getDetailCouponData = async () => {
    try {
      const data = await getDetailCoupon(productId);

      setCoupon(data.data);
    } catch (e) {}
  };

  const issuedCouponFunc = async () => {
    try {
      await issuedCoupon(token, coupon.couponId);
      alert("쿠폰 발급이 완료 되었습니다");
    } catch (e) {
      alert(e.response.data.errorMessage);
    }
  };

  useEffect(() => {
    getProductOne(productId);
    getDetailCouponData();
  }, []);

  return (
    <CommonLayout>
      <Fieldset size={800} mt="md">
        <ProductDetail
          product={product}
          favorite={favorite}
          favoriteChange={favoriteChange}
          addItemCart={addItemCart}
        />

        <Fieldset legend={`지급 가능 쿠폰`} style={{ margin: "10px" }}>
          <div className="product-list">
            {coupon !== null ? (
              <div className="product-item" key={1}>
                <div className="image">
                  <Image
                    className="product-image"
                    radius="md"
                    h={150}
                    w={150}
                    fit="crop"
                    src={product?.productImage}
                    //   src={coupon.image}
                    fallbackSrc="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg"
                    style={{ marginRight: 15 }}
                  />
                </div>
                <div className="product-info">
                  <h2>{coupon.couponName}</h2>
                  {coupon.discountPolicy === "RATE" ? (
                    <p>할인율: {coupon.discount} %</p>
                  ) : (
                    <p>가격 할인 : {coupon.discount} 원</p>
                  )}

                  <p>남은 개수: {coupon.quantity} 개</p>
                </div>
                <div className="coupon-actions">
                  <p>
                    만료 시간 : {coupon.expiredAt.split("-")[0]} 년{" "}
                    {coupon.expiredAt.split("-")[1]} 월{" "}
                    {coupon.expiredAt.split("-")[2].slice(0, 2)} 일 까지
                  </p>
                  <Button
                    color="gray"
                    className="update-btn"
                    style={{ marginTop: "5px" }}
                    onClick={issuedCouponFunc}
                  >
                    쿠폰 발급
                  </Button>
                </div>
              </div>
            ) : null}
          </div>
        </Fieldset>
        {/* <Title order={3} mt="xl">
          상세 설명
        </Title>
        <Center
          maw={400}
          h={100}
          bg="var(--mantine-color-gray-light)"
          style={{ marginLeft: "25%", marginbackgroundColor: "red" }}
        >
          <Box bg="var(--mantine-color-blue-light)">{product?.description}</Box>
        </Center> */}

        <Fieldset legend="상세설명">
          <Box
            bg="var(--mantine-color-blue-light)"
            style={{ height: "150px", alignContent: "center" }}
          >
            {product?.description}{" "}
          </Box>
        </Fieldset>

        <Fieldset legend="리뷰">
          {/* <Title order={3} mt="xl">
            리뷰
          </Title> */}
          {/* <ProductReviewPage
            token={token}
            productId={productId}
          ></ProductReviewPage> */}
          <ProdcutReviewContainer
            token={token}
            productId={productId}
          ></ProdcutReviewContainer>
        </Fieldset>

        {/* <ProductReview /> */}
        {/* Q&A 섹션 */}
        <Box id="qa-section" mt="xl">
          <Title order={3}>Q&A</Title>
          <Box sx={{ minHeight: "300px", backgroundColor: "gray" }}></Box>
        </Box>
        {/* Q&A로 바로가기 링크 */}
        <Anchor href="#qa-section" mt="md" size="md">
          Q&A로 바로가기
        </Anchor>
      </Fieldset>
    </CommonLayout>
  );
};

export default ProductDetailPage;
