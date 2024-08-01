import { apiClient } from "../client";


export const favoriteManagement = async (token, productId) => {
  return apiClient.post(`favorite/${productId}`,{},{    
    headers : {
      Authorization : `Bearer ${token}`      
    }
  });
};

export const getFavorites = async (token) => {
    return apiClient.get(`favorite`,{
      headers : {
        Authorization : `Bearer ${token}`
      }
    });
  };

