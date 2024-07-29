import { apiClient } from "./client";


export const topSearch10 = async () => {
  return apiClient.post(`/api/v1/products/top10`);
};

export const searchByRedis = async () => {
  return apiClient.delete(`/api/v1/products/search`);
};