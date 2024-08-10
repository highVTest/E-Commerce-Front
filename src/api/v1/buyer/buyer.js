import { apiClient } from "../client";



export const buyerSignUp = async (id, nickname, password, email, profileImage, phoneNumber, address) => {
  return apiClient.post(`/buyer/user_signup`,{
    id, nickname, password, email, profileImage, phoneNumber, address
  });
};

export const getMyProfile = async (token) => {
    return apiClient.get(`/buyer/profile`, {
      headers : {
        Authorization : `Bearer ${token}`
      }
    });
  };

export const changePassword = async (token, currentPassword, newPassword, confirmNewPassword) => {

  return apiClient.patch(`/buyer/profile/pw`, {currentPassword,newPassword,confirmNewPassword},{
    headers : {
      Authorization : `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
};

export const changeImage = async (token, imageUrl) => {
  return apiClient.patch(`/buyer/profile/image`,{imageUrl}, {
      headers : {
        Authorization : `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
  };

export const changeProfile = async (token,nickname, address, phoneNumber) => {

    return apiClient.patch(`/buyer/profile`, {nickname,phoneNumber,address},{
      headers : {
        Authorization : `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
};
