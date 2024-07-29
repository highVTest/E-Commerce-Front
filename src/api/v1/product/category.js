import { apiClient } from "./client";


export const addCategory = async () => {
  return apiClient.post(`/api/v1/category`);
};

export const deleteCategory = async (categoryId) => {
  return apiClient.delete(`/api/v1/category/${categoryId}`, { categoryId });
};