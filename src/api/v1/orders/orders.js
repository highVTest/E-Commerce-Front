import { apiClient } from "../client";

export const buyerPayment = async (token, cartIdList,couponIdList ) => {
    return apiClient.post("/payments", {cartIdList,couponIdList},{
        headers : {
          Authorization : `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
}

export const buyerRequestComplain = async (token, shopId, orderId, complainType, description) => {
    return apiClient.patch(`/buyer/complain/${shopId}/${orderId}`, {complainType: complainType, description: description}, {
        headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
};

export const getBuyerOrders = async (token) => {
    return apiClient.get(`/buyer/order-details`, {
        headers:{
            authorization : `Bearer ${token}`,
        }
    });
};

export const getBuyerOrderDetails = async (token, orderId) => {
    return apiClient.get(`/buyer/order-details/${orderId}`, {
        headers:{
            authorization : `Bearer ${token}`,
        }
    });
};

export const requestComplainReject = async (token, shopId, orderId, complainType, description) => {
    return apiClient.patch(`/api/v1/seller/complain/${shopId}/${orderId}`, {complainType: complainType, description: description},{
        headers:{
            authorization : `Bearer ${token}`,
            "Content-Type" : "application/json"
        }
    });
};

export const getSellerOrderDetailsAll = async (shopId) => {
    return apiClient.get(`/api/v1/shop/order-details/${shopId}`, { shopId });
};

export const getSellerOrderDetailsBuyer = async (shopId, orderId) => {
    return apiClient.get(`/api/v1/shop/order-details/${shopId}/${orderId}`, { shopId, orderId });
};

export const requestComplainAccept = async (shopId, orderId) => {
    return apiClient.patch(`/api/v1/shop/complain/${shopId}/${orderId}/accept`, { shopId, orderId });
};
  

export const requestPayment = async () => {
    return apiClient.post(`/api/v1/payments`);
};