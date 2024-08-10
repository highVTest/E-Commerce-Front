import { apiClient } from "../client"

export const uploadImage = async (token, file) => {
    return apiClient.post('image',{file},{    
        headers : {
          Authorization : `Bearer ${token}`,
          "Content-Type": "multipart/form-data" 
        }
      });
};

export const uploadImages = async (token, file) => {
    return apiClient.post('images',{file},{    
        headers : {
          Authorization : `Bearer ${token}`,
          "Content-Type": "multipart/form-data"      
        }
      });
};