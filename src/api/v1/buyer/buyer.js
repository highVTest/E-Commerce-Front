import { buyerClient } from "../client";
// import { apiClient } from "./client";


export const signUp = async () => {
  return buyerClient.post(`/buyer/user_signup`);
};

export const getMyProfile = async (token) => {
    return buyerClient.get(`/buyer/profile`, {
      headers : {
        Authorization : `Bearer ${token}`
      }
    });
  };

export const changePassword = async () => {
  return buyerClient.patch(`/buyer/profile/pw`);
};

export const changeImage = async (token, file) => {
  console.log("들어오나?");
    return buyerClient.patch(`/buyer/profile/image`,{file}, {
      headers : {
        Authorization : `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    });
  };

export const changeProfile = async () => {
    return buyerClient.patch(`/buyer/profile`);
};
