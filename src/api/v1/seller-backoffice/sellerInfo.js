import { apiClient } from "./client";


export const updateShopInfo = async () => {
  return apiClient.patch(`/api/v1/sellerInfo/myShopInfo`);
};

export const updateSellerInfo = async () => {
    return apiClient.patch(`/api/v1/sellerInfo/myInfo`);
  };

export const changePassword = async () => {
  return apiClient.patch(`/api/v1/sellerInfo/myInfo/changePassword`);
};
