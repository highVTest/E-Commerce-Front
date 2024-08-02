import { apiClient } from "./client";


export const sellerSignup = async () => {
  return apiClient.post(`/api/v1/seller/user_signup`);
};
