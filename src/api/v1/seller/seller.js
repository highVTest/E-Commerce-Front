import { apiClient } from "../client";


export const sellerSignup = async (id, nickname, password, email,  phoneNumber, address) => {
  console.log(id);
  console.log(nickname);
  console.log(password);
  console.log(email);
  console.log(phoneNumber);
  console.log(address);

  return apiClient.post(`seller/user_signup`,{
    id, nickname, password, email,  phoneNumber, address
  });
};
