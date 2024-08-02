import {apiClient} from "../client";

export const createProduct = async (token,name, price, quantity, description,file) => {
  return apiClient.post(`/products`,{name,description,categoryId:1},{quantity,price},{file},{
    headers:{
      Authorization : `Bearer ${token}`,
      "Content-Type":"application/json",
      "Content-Type": "multipart/form-data"
    } 
  });
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
    return apiClient.get(`products/all`);
};

export const getProductsByCategory = async () => {
    return apiClient.get(`/api/v1/products/category`);
};
  