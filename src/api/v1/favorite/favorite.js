import { apiClient } from "./client";


export const favoriteManagement = async (productId) => {
  return apiClient.post(`/api/v1/cart/${productId}`, { productId });
};

export const getFavorites = async () => {
    return apiClient.get(`/api/v1/favorite`);
  };

