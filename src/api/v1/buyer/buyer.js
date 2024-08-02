import { apiClient } from "./client";


export const buyerSignUp = async () => {
  return apiClient.post(`/api/v1/buyer/user_signup`);
};

export const getMyProfile = async () => {
    return apiClient.get(`/api/v1/buyer/profile`);
  };

export const changePassword = async () => {
  return apiClient.patch(`/api/v1/buyer/profile/pw`);
};

export const changeImage = async () => {
    return apiClient.patch(`/api/v1/buyer/profile/image`);
  };

export const changeProfile = async () => {
    return apiClient.patch(`/api/v1/buyer/profile`);
};
