import { Button, Image, Rating } from "@mantine/core";

import ReviewAddModal from "../../loginandreview/components/review/ReviewAddModal";
import ProductReviewUpdateModal from "../../loginandreview/components/review/ProductReviewUpdateModal";

const ProductReviewPage = ({
  reviews,
  buyerAddReview,
  delReview,
  buyerUpdate,
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

  const role = localStorage.getItem("role");

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
            </div>
          </div>
        );
      })}
      <div style={{ marginTop: "15px" }}></div>
      {role === "BUYER" ? (
        <ReviewAddModal addReview={addReview}></ReviewAddModal>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default ProductReviewPage;
