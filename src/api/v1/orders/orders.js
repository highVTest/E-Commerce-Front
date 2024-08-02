import { client } from "../client";


export const buyerRequestComplain = async (shopId, orderId) => {
  return client.patch(`/api/v1/buyer/complain/${shopId}/${orderId}`, { shopId, orderId });
};

export const getBuyerOrders = async () => {
  return client.get(`/api/v1/buyer/order-details`);
};

export const getBuyerOrderDetails = async (orderId) => {
    return client.get(`/api/v1/buyer/order-details/${orderId}`, { orderId });
};

export const requestComplainReject = async (shopId, orderId) => {
    return client.patch(`/api/v1//seller/complain/${shopId}/${orderId}`, { shopId, orderId });
};

export const getSellerOrderDetailsAll = async (shopId) => {
    return client.get(`/api/v1/shop/order-details/${shopId}`, { shopId });
};

export const getSellerOrderDetailsBuyer = async (shopId, orderId) => {
    return client.get(`/api/v1/shop/order-details/${shopId}/${orderId}`, { shopId, orderId });
};

export const requestComplainAccept = async (shopId, orderId) => {
    return client.patch(`/api/v1/shop/complain/${shopId}/${orderId}/accept`, { shopId, orderId });
};
  

export const requestPayment = async () => {
    return client.post(`/api/v1/payments`);
};