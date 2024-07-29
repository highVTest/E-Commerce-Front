import { apiClient } from "./client";


export const sanctionSeller = async (sellerId) => {
  return apiClient.post(`/api/v1/admin/sanctions/seller/${sellerId}`, { sellerId });
};

export const sanctionProduct = async (productId) => {
  return apiClient.post(`/api/v1/admin/sanctions/product/${productId}`, { productId });
};

export const getBlackLists = async () => {
    return apiClient.get("/api/v1/admin/black-list");
  };
  

export const getBlackList = async (blackListId) => {
  return apiClient.get(`/api/v1/admin/black-list/${blackListId}`, { blackListId });
};

export const deleteBlackList = async (blackListId) => {
    return apiClient.delete(`/api/v1/admin/black-list/${blackListId}`, { blackListId });
  };