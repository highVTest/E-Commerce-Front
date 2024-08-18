import {
  Button,
  Grid,
  Group,
  Stack,
  Text,
  Fieldset,
  Image,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { deleteReview, getBuyerReviews } from "../../api/v1/review/review.js";
import ReviewUpdateModal from "../components/review/ReviewUpdateModal.jsx";
import { useNavigate } from "react-router";
// eslint-disable-next-line react/prop-types
const MyReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const token = localStorage.getItem("token");
  const [click, setClick] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const getMyReview = async () => {
    const data = await getBuyerReviews(token);
    setReviews(data.data);

    setLoading(false);
  };

  const delReview = async (productId, reviewId, productName) => {
    if (productName == "") {
      alert("삭제된 상품입니다.");
      return;
    }

    if (click == true) {
      return;
    }

    setClick(true);
    try {
      const data = await deleteReview(token, productId, reviewId);
      setClick(false);
      alert("리뷰 삭제가 완료됐습니다.");
      getMyReview();
    } catch (e) {
      setClick(false);
    }
  };

  const findProduct = (productId, productName) => {
    if (productName == "") {
      alert("삭제된 상품입니다.");
      return;
    }
    navigate(`/product/${productId}`);
  };

  useEffect(() => {
    getMyReview();
  }, []);

  return (
    <>
      <h1 style={{ marginBottom: "20px" }}>내 리뷰 목록</h1>
      {loading ? (
        <div>
          <h1 style={{ textAlign: "center" }}>Loading...</h1>
        </div>
      ) : (
        <>
          {reviews.length != 0 ? (
            reviews.map((review) => {
              return (
                <div key={review.id}>
                  <Fieldset
                    style={{
                      margin: "0",
                      padding: "15px",
                      marginBottom: "10px",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                          gap: "50px",
                        }}
                      >
                        <Image
                          src={review.productImage}
                          h={120}
                          w={120}
                          radius={"8px"}
                          fallbackSrc="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg"
                        />
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            textAlign: "left",
                            justifyContent: "space-between",
                            width: "100%",
                            marginTop: "15px",
                            marginBottom: "15px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                            }}
                          >
                            <p
                              style={{
                                margin: "0",
                                width: "100px",
                                fontWeight: "600",
                              }}
                            >
                              상품명
                            </p>
                            <p style={{ margin: "0" }}>{review.productName}</p>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                            }}
                          >
                            <p
                              style={{
                                margin: "0",
                                width: "100px",
                                fontWeight: "600",
                              }}
                            >
                              리뷰
                            </p>
                            <p style={{ margin: "0" }}>{review.content}</p>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                            }}
                          >
                            <p
                              style={{
                                margin: "0",
                                width: "100px",
                                fontWeight: "600",
                              }}
                            >
                              평점
                            </p>
                            <p style={{ margin: "0" }}>{review.rate} 점</p>
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "15px",
                          }}
                        >
                          <Button
                            color="black"
                            onClick={() => {
                              findProduct(review.productId, review.productName);
                            }}
                          >
                            상품 보기
                          </Button>
                          <ReviewUpdateModal
                            token={token}
                            reviewId={review.id}
                            productId={review.productId}
                            review_content={review.content}
                            review_rate={review.rate}
                            getMyReview={getMyReview}
                            productName={review.productName}
                          />
                          <Button
                            color="black"
                            onClick={() => {
                              delReview(
                                review.productId,
                                review.id,
                                review.productName
                              );
                            }}
                          >
                            삭제 하기
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Fieldset>
                </div>
              );
            })
          ) : (
            <div>
              <h1 style={{ textAlign: "center", marginTop: "200px" }}>
                작성한 리뷰가 없습니다.
              </h1>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default MyReviewPage;
