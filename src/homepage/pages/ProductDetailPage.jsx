import React, { useEffect, useState } from "react";
import {
  Container,
  Title,
  Box,
  Anchor,
  Stack,
  Text,
  Center, Button, Image, Fieldset,
} from "@mantine/core";
import CommonLayout from "../components/CommonLayout";
import ProductDetail from "../components/ProductDetail";
import ProductDescription from "../components/ProductDescription";
import ProductReview from "../components/ProductReview";
import { getProductById } from "../../api/v1/product/product";
import { useParams } from "react-router";
import {
  favoriteManagement,
  getFavorites,
} from "../../api/v1/favorite/favorite";
import { addItemIntoCart } from "../../api/v1/item-cart/itemCart";
import {Link} from "react-router-dom";
import UpdateCouponModal from "../../coupon/components/UpdateCouponModal.jsx";

const ProductDetailPage = () => {
  const token = localStorage.getItem("token");
  const [product, setProduct] = useState(null);
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
      alert("찜 실패");
    }
  };

  const addItemCart = async (amount) => {
    if (amount < 1) {
      alert("1개 이상만 담을 수 있습니다.");
    }
    const data = await addItemIntoCart(token, productId, amount);
    console.log(data);
    alert(data.data.msg);
  };

  useEffect(() => {
    getProductOne();
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

            <Fieldset
                legend={`지급 가능 쿠폰`}
                style={{ margin: "10px" }}
            >
              <div className="product-list">
                <div className="product-item" key={1}>
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
                    <h2>쿠폰 이름</h2>
                    <p>쿠폰 정책</p>
                    <p>할인율: 10 %</p>
                    <p>남은 개수: 10 개</p>
                  </div>
                  <div className="coupon-actions">
                    <p>만료 시간 : 몰라 ㅅㅂ</p>
                    <Button
                        color="gray"
                        className="update-btn"
                        style={{marginTop: '5px'}}
                    >
                      쿠폰 발급
                    </Button>
                  </div>
                </div>
              </div>
            </Fieldset>
            <Title order={3} mt="xl">
              상세 설명
            </Title>
            <Center
                maw={400}
                h={100}
                bg="var(--mantine-color-gray-light)"
                style={{marginLeft: "25%", marginbackgroundColor: "red"}}
            >
              <Box bg="var(--mantine-color-blue-light)">
                {product?.description}
              </Box>
            </Center>

          {/* <ProductDescription product={product} /> */}
          <Title order={3} mt="xl">
            리뷰
          </Title>
          {/* <ProductReview /> */}
          {/* Q&A 섹션 */}
          <Box id="qa-section" mt="xl">
            <Title order={3}>Q&A</Title>
            <Box sx={{minHeight: "300px", backgroundColor: "gray"}}></Box>
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
