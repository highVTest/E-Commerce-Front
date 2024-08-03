import { apiClient } from "../client";


export const updateShopInfo = async (token,description) => {
  return apiClient.patch(`/sellerInfo/myShopInfo`,{description},{
    headers:{
      Authorization : `Bearer ${token}`,
      "Content-Type": "application/json"
    }  
  });
};

export const updateSellerInfo = async (token,nickname,phoneNumber,address) => {
    return apiClient.patch(`/sellerInfo/myInfo`,{nickname,phoneNumber,address},{
      headers:{
        Authorization : `Bearer ${token}`,
        "Content-Type": "application/json"
      }  
    });
  };

export const changePassword = async (token,oldPassword,newPassword) => {
  return apiClient.patch(`/sellerInfo/myInfo/changePassword`,
    {oldPassword,newPassword},{
    headers:{
      Authorization : `Bearer ${token}`,
      "Content-Type": "application/json"
    }  
  });
};

export const getShopInfo = async (token) => {
  return apiClient.get(`/sellerInfo/myShopInfo`,{
    headers:{
      Authorization : `Bearer ${token}`
    }  
  });
};


export const getSellerInfo = async (token) => {
  return apiClient.get(`/sellerInfo/myInfo`,{
    headers:{
      Authorization : `Bearer ${token}`
    }  
  });
};