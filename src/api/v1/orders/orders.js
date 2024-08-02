import { apiClient } from "../client";

export const buyerPayment = async (token, cartIdList,couponIdList ) => {
    return apiClient.post("/payments", {cartIdList,couponIdList},{
        headers : {
          Authorization : `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
}

export const buyerRequestComplain = async (shopId, orderId) => {
  return apiClient.patch(`/api/v1/buyer/complain/${shopId}/${orderId}`, { shopId, orderId });
};

export const getBuyerOrders = async () => {
  return apiClient.get(`/api/v1/buyer/order-details`);
};

export const getBuyerOrderDetails = async (orderId) => {
    return apiClient.get(`/api/v1/buyer/order-details/${orderId}`, { orderId });
};

export const requestComplainReject = async (shopId, orderId) => {
    return apiClient.patch(`/api/v1//seller/complain/${shopId}/${orderId}`, { shopId, orderId });
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