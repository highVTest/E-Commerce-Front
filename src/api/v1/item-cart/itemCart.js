import { apiClient } from "../client";



export const addItemIntoCart = async (token, productId,quantity) => {
  return apiClient.post(`cart/${productId}`,{quantity},{
    headers : {
      Authorization : `Bearer ${token}`
    }
  });
};

export const getMyCart = async (token) => {
    return apiClient.get(`cart`,{
      headers : {
        Authorization : `Bearer ${token}`
      }
    });
  };

  export const updateIntoCart = async (productId) => {
    return apiClient.put(`cart/${productId}`, { },{
      headers : {
        Authorization : `Bearer ${token}`
      }
    });
  };

  export const deleteItemIntoCart = async (token, productId) => {
    return apiClient.delete(`cart/${productId}`,{
      headers : {
        Authorization : `Bearer ${token}`
      }
    });
  };
