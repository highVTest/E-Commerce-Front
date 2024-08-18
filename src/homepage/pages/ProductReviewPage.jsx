import { Button, Image, Rating } from "@mantine/core";

import ReviewAddModal from "../../loginandreview/components/review/ReviewAddModal";

const ProductReviewPage = ({
  reviews,
  buyerAddReview,
  delReview,
  buyerUpdate,
  productId,
}) => {
  const addReview = async (rate, content) => {
    await buyerAddReview(rate, content);
  };
  const deleteReview = async (reviewId) => {
    await delReview(reviewId);
  };
  const updateReview = async (reviewId, rate, content) => {
    await buyerUpdate(reviewId, rate, content);
  };

  return (
    <>
      {reviews?.map((review) => {
        return (
          <div key={review.id}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: "10px",
                border: "2px solid",
                borderColor: "#efefef",
                borderRadius: "8px",
                padding: "10px",
                textAlign: "left",
              }}
            >
              <div>
                <div style={{ display: "flex" }}>
                  <div>
                    <Image
                      src={review.buyerProfileImage}
                      h={120}
                      w={120}
                      style={{ marginRight: "30px" }}
                      radius="lg"
                      fallbackSrc="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg"
                    />
                  </div>
                  <div>
                    <Rating value={review.rate} fractions={2} readOnly />
                    <p>작성자 : {review.buyerName}</p>
                    <p>{review.content}</p>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  gap: "5px",
                }}
              >
                <ProductReviewUpdateModal
                  review_id={review.id}
                  productId={productId}
                ></ProductReviewUpdateModal>

                <div style={{ marginRight: "15px" }}></div>
                <Button
                  color="black"
                  variant="outline"
                  onClick={() => {
                    deleteReview(review.id);
                  }}
                >
                  리뷰 삭제
                </Button>
              </div>
            </div>
          </div>
        );
      })}
      <div style={{ marginTop: "15px" }}></div>
      <ReviewAddModal addReview={addReview}></ReviewAddModal>
    </>
  );
};

export default ProductReviewPage;
