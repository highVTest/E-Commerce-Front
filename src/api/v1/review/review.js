
import {reviewClient} from "../client/reviewClient.js"


export const addReview = async (review) => {
  const response = await reviewClient.post("/reviews",review);

  return response.data;
};

export const updateReview = async (review) => {
  const response = await reviewClient.put('/reviews/${review.id}', review);

  return response.data;
};

export const deleteReview = async (id) => {
    const response = await reviewClient.delete(`/reviews/${id}`);

    return response.data;
  };

export const getProductReviews = async () => {
    const response = await reviewClient().get("/reviews");

    return response.data

};

// export const getBuyerReviews = async () => {
//     return apiClient.get(`/api/v1/reviews/buyer`);
// };