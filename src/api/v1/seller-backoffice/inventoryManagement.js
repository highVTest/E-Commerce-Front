import { apiClient } from "../client";

export const getProducts = async (productId) => {
  return apiClient.get(`/seller/${productId}/left-quantity`);
};

export const changeQuantity = async (token,productId,quantity) => {
  return apiClient.patch(`/seller/${productId}/quantity`,{quantity},{
    headers:{
      Authorization : `Bearer ${token}`,
      "Content-Type":"application/json"
    } 
  });
};

export const changePrice = async (token,productId,price) => {
    return apiClient.patch(`/seller/${productId}/price`,{price},{
      headers:{
        Authorization : `Bearer ${token}`,
        "Content-Type":"application/json"
      } 
    });
  };

export const getSellerProducts = async(token) =>{
  return apiClient.get(`seller/products`,{
    headers:{
      Authorization : `Bearer ${token}`
    } 
  });
}