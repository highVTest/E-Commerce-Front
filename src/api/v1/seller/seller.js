import { apiClient } from "./client";


export const signUp = async () => {
  return apiClient.post(`/api/v1/seller/user_signup`);
};
