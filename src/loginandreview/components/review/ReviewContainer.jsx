import { useEffect, useState } from "react";
import {
  deleteReview,
  getProductReviews,
  updateReview,
} from "../../../api/v1/review/review.js";
import ReviewList from "../ReviewList.jsx";
import ReviewInput from "./ReviewInput.jsx";

const ReviewContainer = () => {
  const token = localStorage.getItem("token");

  const [reviews, setReviews] = useState([]);
  const fetchReviews = async () => {
    // console.log("token", token);
    const data = await getProductReviews(token);

    setReviews(data.data);
  };

  const addReview = async () => {
    try {
      const data = await addReview(token, 3);
      // await createReview(review);

      await fetchReviews();

      alert("리뷰 추가 완료!");
    } catch (e) {
    }
  };

  const removeReview = async (id) => {
    await deleteReview(id);

    await fetchReviews();

    alert("리뷰 삭제 완료");
  };

  const toggleReview = async (review) => {
    await updateReview(review);
    await fetchReviews();
    alert("리뷰 수정 완료!");
  };

  useEffect(() => {
    fetchReviews();
  }, []);
  return (
    <div>
      <ReviewInput addReview={addReview} />
      <ReviewList
        reviews={reviews}
        removeReview={removeReview}
        toggleReview={toggleReview()}
      />
    </div>
  );
};

export default ReviewContainer;
