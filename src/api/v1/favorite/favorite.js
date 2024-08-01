import { buyerClient } from "../client";
import { apiClient } from "./client";


export const favoriteManagement = async (productId) => {
  return apiClient.post(`/api/v1/cart/${productId}`, { productId });
};

export const getFavorites = async (token) => {
    return apiClient.get(`favorite`,{
      headers : {
        Authorization : `Bearer ${token}`
      }
    });
  };

