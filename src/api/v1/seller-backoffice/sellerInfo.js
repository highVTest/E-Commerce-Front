import { apiClient } from "../client";


export const updateShopInfo = async (token,description,shopImage) => {
  return apiClient.patch(`/sellerInfo/myShopInfo`,{description,shopImage},{
    headers:{
      Authorization : `Bearer ${token}`,
      "Content-Type": "application/json"
    }  
  });
};

export const updateSellerInfo = async (token,nickname,phoneNumber,address) => {
    return apiClient.patch(`/sellerInfo/myInfo`,{nickname,/*profile,img*/phoneNumber,address},{
      headers:{
        Authorization : `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }  
    });
  };

export const changePassword = async () => {
  return apiClient.patch(`/sellerInfo/myInfo/changePassword`);
};
