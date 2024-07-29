import { apiClient } from "./client";


export const addReview = async (productId) => {
  return apiClient.post(`/api/v1/reviews/${productId}`, { productId });
};

export const updateReview = async (productId, reviewId) => {
  return apiClient.put(`/api/v1/reviews/${productId}/${reviewId}`, { productId, reviewId });
};

export const deleteReview = async (productId, reviewId) => {
    return apiClient.delete(`/api/v1/reviews/${productId}/${reviewId}`, { productId, reviewId });
  };

export const getProductReviews = async () => {
    return apiClient.get(`/api/v1/reviews`);
};

export const getBuyerReviews = async () => {
    return apiClient.get(`/api/v1/reviews/buyer`);
};