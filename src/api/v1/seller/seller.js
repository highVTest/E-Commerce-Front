import { apiClient } from "../client";


export const sellerSignup = async (id, nickname, password, email,  phoneNumber, address) => {
  return apiClient.post(`seller/user_signup`,{
    id, nickname, password, email,  phoneNumber, address
  });
};
