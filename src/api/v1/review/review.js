
import {reviewClient} from "../client/reviewClient.js"



export const addReview = async (token,productId) => {
    return await apiClient.post(`/reviews/${productId}`, {
        headers: {
            Authorization: `Bearer ${token}`


        }
    });
}

export const updateReview = async (review) => {
  const response = await apiClient.put('/reviews/${review.id}', review);

  return response.data;
};

export const deleteReview = async (id) => {
    return await apiClient.delete(`/reviews/${id}`);


  };

export const getProductReviews = async (token) => {
  return await apiClient.get(`/reviews?productId=2`, {
      headers: {
          Authorization : `Bearer ${token}`
          }
          })

};

export const getBuyerReviews = async () => {
    return apiClient.get(`/api/v1/reviews/buyer`);
};