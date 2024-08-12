import { apiClient } from "../client";


export const topSearch10 = async () => {
  return apiClient.post(`/products/top10`);
};

export const searchByRedis = async (keyword, sortBy, sortOrder,page,size) => {
  return apiClient.get(`/products/search?keyword=${keyword}&sortBy=${sortBy}&sortOrder=${sortOrder}&page=${page}&size=${size}`);
};