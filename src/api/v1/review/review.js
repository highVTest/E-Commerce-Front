
import { apiClient } from "../client.js";



export const addReview = async (token,productId,rate,content) => {
    return await apiClient.post(`/reviews/${productId}`,{
        rate,
        content
    }, {
        headers: {
            Authorization: `Bearer ${token}`

        }
    });
}

export const updateReview = async (token, productId, reviewId ,rate,content) => {
  return await apiClient.put(`/reviews/${productId}/${reviewId}`, {rate,content}, {
    headers : {
        Authorization : `Bearer ${token}`,
        "Content-Type" : "application/json"
    }
});

  
};

export const deleteReview = async (token, productId, reviewId) => {
    return await apiClient.delete(`/reviews/${productId}/${reviewId}`, {
        headers : {
            Authorization : `Bearer ${token}`
        }
    });


  };

export const getProductReviews = async (productId) => {
  return await apiClient.get(`/reviews?productId=${productId}` )

};


export const getBuyerReviews = async (token) => {
    return apiClient.get(`/reviews/buyer`,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    });
};