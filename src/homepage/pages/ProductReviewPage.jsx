import { Button, Fieldset, NumberInput, Text, TextInput } from "@mantine/core";
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
            <Fieldset legend="내용">
              <div>
                <Text> 내용 : {review.content}</Text>
                <Text> 평점 : {review.rate}</Text>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "right",
                  // marginBottom: "15px",
                  // marginTop: "10px",
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
                  variant="filled"
                  color="gray"
                  // style={{ marginRight: "20px" }}
                  onClick={() => {
                    deleteReview(review.id);
                  }}
                >
                  리뷰 삭제
                </Button>
              </div>
            </Fieldset>
          </div>
        );
      })}
      <div style={{ marginTop: "15px" }}></div>
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
