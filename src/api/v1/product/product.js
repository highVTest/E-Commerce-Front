import {apiClient} from "../client";

export const createProduct = async (token,name, price, quantity, description, imageUrl) => {
  return apiClient.post(`/products`,{
    createProductRequest :{name,description,categoryId:1,imageUrl},
    createProductBackOfficeRequest:{quantity,price},},{
    headers:{
      Authorization : `Bearer ${token}`,
      "Content-Type":"application/json"
    } 
  });
};

export const updateProduct = async (token,productId,name,description) => {
  return apiClient.patch(`/products/${productId}`,
    {name,description,isSoldOut:false,categoryId:1},{
    headers:{
      Authorization : `Bearer ${token}`,
      "Content-Type":"application/json"
    } 
  });
};

export const deleteProduct = async (token,productId) => {
    return apiClient.delete(`/products/${productId}`,{
      headers:{
        Authorization : `Bearer ${token}`
      } 
    });
};

export const getProductById = async (productId) => {
    return apiClient.get(`/products/${productId}`);
};

export const getAllProducts = async (page, size, sort, order) => {
    return apiClient.get(`products/all?page=${page}&size=${size}&sort=${sort},${order}`);
};

export const getProductsByCategory = async () => {
    return apiClient.get(`/api/v1/products/category`);
};
  