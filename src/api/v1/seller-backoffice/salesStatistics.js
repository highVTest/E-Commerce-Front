import { apiClient } from "./client";


export const getTotalSales = async () => {
  return apiClient.get(`/api/v1/seller/total-sales-quantity`);
};

export const getTotalSalesAmount = async () => {
    return apiClient.get(`/api/v1/seller/total-sales-amount`);
  };

export const getProductSales = async (productId) => {
  return apiClient.get(`/api/v1/seller/${productId}/sales-quantity`, { productId });
};

export const getProductSalesAmount = async (productId) => {
    return apiClient.get(`/api/v1/seller/${productId}/sales-amount`, { productId });
  };
  