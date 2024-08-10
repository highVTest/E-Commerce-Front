// import { buyerClient } from "../client";

import { apiClient } from "../client";



export const loginSeller = async (email, password) => {
  return apiClient.post(`/login/seller`, {email, password});
};

export const loginBuyer = async (email,password) => {
  return apiClient.post(`/login/buyer`,{email,password});
};

export const sendMail = async (email, role) => {
    return apiClient.post("email/send",{email, role});
  };
  

export const verifyEmail = async (email,role, authCode) => {
  return apiClient.post(`email/confirm?code=${authCode}`,{email,role});
};

// export const uploadImage = async (token, file) => {
//   return apiClient.post("/image",{file}, {
//     headers : {
//       Authorization : `Bearer ${token}`,
//       "Content-Type": "multipart/form-data"
//     }
//   })
// }

// export const uploadImages = async (token, files) => {
//   return apiClient.post("/images",{files}, {
//     headers : {
//       Authorization : `Bearer ${token}`,
//       "Content-Type": "multipart/form-data"
//     }
//   })
// }
