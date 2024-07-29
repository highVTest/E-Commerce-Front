import { apiClient } from "./client";


export const getProducts = async (productId) => {
  return apiClient.get(`/api/v1/seller/${productId}/left-quantity`, { productId });
};

export const changeQuantity = async (productId) => {
  return apiClient.patch(`/api/v1/seller/${productId}/quantity`, { productId });
};

export const changePrice = async (productId) => {
    return apiClient.patch(`/api/v1/seller/${productId}/price`, { productId });
  };
  