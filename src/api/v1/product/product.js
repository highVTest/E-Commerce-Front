import { apiClient } from "./client";


export const createProduct = async () => {
  return apiClient.post(`/api/v1/products`);
};

export const updateProduct = async (productId) => {
  return apiClient.patch(`/api/v1/products/${productId}`, { productId });
};

export const deleteProduct = async (productId) => {
    return apiClient.delete(`/api/v1/products/${productId}`, { productId });
};

export const getProductById = async (productId) => {
    return apiClient.get(`/api/v1/products/${productId}`, { productId });
};

export const getAllProducts = async () => {
    return apiClient.get(`/api/v1/products/all`);
};

export const getProductsByCategory = async () => {
    return apiClient.get(`/api/v1/products/category`);
};
  