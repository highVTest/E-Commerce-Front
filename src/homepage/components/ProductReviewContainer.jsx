import { useEffect, useState } from "react";
import {
  addReview,
  deleteReview,
  getProductReviews,
  updateReview,
} from "../../api/v1/review/review";
import ProductReviewPage from "../pages/ProductReviewPage";

const ProdcutReviewContainer = ({ token, productId }) => {
  const [reviews, setReviews] = useState(null);
  const [click, setClick] = useState(false);
  const getReviews = async () => {
    const data = await getProductReviews(productId);
    // console.log(data.data);
    setReviews(data.data);
  };

  const buyerAddReview = async (rate, content) => {
    if (click == true) {
      return;
    }

    try {
      setClick(true);
      const data = await addReview(token, productId, rate, content);
      alert("리뷰가 생성됐습니다.");
      window.location.reload();
    } catch (e) {
      alert(e.response.data.errorMassage);
    }
    setClick(false);
  };

  const buyerUpdate = async (reviewId, rate, content) => {
    if (click == true) {
      return;
    }

    try {
      setClick(true);

      const data = await updateReview(
        token,
        productId,
        reviewId,
        rate,
        content
      );

      alert("수정됐습니다.");
      window.location.reload();
    } catch (e) {
      const msg = e.response.data.errorMessage;
      if (msg == "자기 리뷰가 아닙니다.") {
        alert("자신의 리뷰가 아닙니다.\n수정할 수 없습니다.");
      } else {
        alert("알 수 없는 에러");
      }
    }

    setClick(false);
  };

  const delReview = async (reviewId) => {
    if (click == true) {
      return;
    }

    try {
      setClick(true);

      const data = await deleteReview(token, productId, reviewId);

      alert("삭제됐습니다.");
      // window.location.reload();
      await getReviews();
    } catch (e) {
      const msg = e.response.data.errorMessage;
      if (msg == "자기 리뷰가 아닙니다.") {
        alert("자신의 리뷰가 아닙니다.\n삭제할 수 없습니다.");
      } else {
        alert("알 수 없는 에러");
      }
    }
    setClick(false);
  };

  useEffect(() => {
    getReviews();
  }, []);
  return (
    <ProductReviewPage
      reviews={reviews}
      buyerAddReview={buyerAddReview}
      delReview={delReview}
      buyerUpdate={buyerUpdate}
    ></ProductReviewPage>
  );
};

export default ProdcutReviewContainer;
