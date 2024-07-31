import { buyerClient } from "../client";
// import { apiClient } from "./client";


export const loginSeller = async () => {
  return apiClient.post(`/api/v1/login/seller`);
};

export const loginBuyer = async (email,password) => {
  return buyerClient.post(`/login/buyer`,{email,password});
};

export const sendMail = async () => {
    return apiClient.post("/api/v1/email/send");
  };
  

export const verifyEmail = async () => {
  return apiClient.post(`/api/v1/email/confirm`);
};
