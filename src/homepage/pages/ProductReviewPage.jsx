import {Button, Fieldset, NumberInput, Rating, Text, TextInput, Image} from "@mantine/core";
import { modals } from "@mantine/modals";
import { useState } from "react";
import ReviewAddModal from "../../loginandreview/components/review/ReviewAddModal";

const ProductReviewPage = ({
  reviews,
  buyerAddReview,
  delReview,
  buyerUpdate,
}) => {
  const [rate, setRate] = useState(0);
  const [content, setContent] = useState("");

  const addReview = async () => {
    await buyerAddReview(rate, content);
  };
  const deleteReview = async (reviewId) => {
    await delReview(reviewId);
  };
  const updateReview = async (reviewId) => {
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
                justifyContent:"space-between",
                marginBottom: "10px",
                border: "2px solid",
                borderColor: "#efefef",
                borderRadius: "8px",
                padding: "10px",
                textAlign: "left",
              }}
            >
              <div style={{marginTop:"10px"}}>
                <Rating value={review.rate} fractions={2} readOnly />
                <p>작성자 : {review.buyerName}</p>
                <p style={{marginLeft:"20px"}}>{review.content}</p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  gap:"5px"
                }}
              >
                <ReviewAddModal
                  rate={rate}
                  setRate={setRate}
                  content={content}
                  setContent={setContent}
                  addReview={addReview}
                  situation={"수정"}
                  updateReview={updateReview}
                  reviewId={review.id}
                ></ReviewAddModal>
                <div style={{ marginRight: "15px" }}></div>
                <Button
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
      <div style={{ marginTop: "15px"}}></div>
      <ReviewAddModal
        rate={rate}
        setRate={setRate}
        content={content}
        setContent={setContent}
        addReview={addReview}
        situation={"추가"}
        updateReview={updateReview}
        reviewId={-1}
      ></ReviewAddModal>
    </>
  );
};

export default ProductReviewPage;
