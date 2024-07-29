import { apiClient } from "./client";


export const addItemIntoCart = async (productId) => {
  return apiClient.post(`/api/v1/cart/${productId}`, { productId });
};

export const getMyCart = async () => {
    return apiClient.get(`/api/v1/cart`);
  };

  export const updateIntoCart = async (productId) => {
    return apiClient.put(`/api/v1/cart/${productId}`, { productId });
  };

  export const deleteItemIntoCart = async (productId) => {
    return apiClient.delete(`/api/v1/cart/${productId}`, { productId });
  };
