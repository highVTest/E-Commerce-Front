import { apiClient } from "./client";


export const loginSeller = async () => {
  return apiClient.post(`/api/v1/login/seller`);
};

export const loginBuyer = async () => {
  return apiClient.post(`/api/v1//login/buyer`);
};

export const sendMail = async () => {
    return apiClient.post("/api/v1/email/send");
  };
  

export const verifyEmail = async () => {
  return apiClient.post(`/api/v1/email/confirm`);
};
