import { apiClient } from "./client";


export const createCoupon = async () => {
  return apiClient.post(`/api/v1/seller/coupon`);
};

export const updateCoupon = async (couponId) => {
    return apiClient.put(`/api/v1/seller/coupon/${couponId}`, { couponId });
  };

export const deleteCoupon = async (couponId) => {
  return apiClient.delete(`/api/v1/seller/coupon/${couponId}`, { couponId });
};

export const getSellerCouponById = async (couponId) => {
    return apiClient.get(`/api/v1/seller/coupon/{couponId}`, { couponId });
  };

export const getSellerCouponList = async () => {
    return apiClient.get(`/api/v1/seller/coupon`);
};

export const getBuyerCouponById = async (couponId) => {
    return apiClient.get(`/api/v1/buyer/coupon/${couponId}`, { couponId });
};

export const getBuyerCouponList = async () => {
    return apiClient.get(`/api/v1/buyer/coupon`);
};

export const issuedCoupon = async () => {
    return apiClient.patch(`/api/v1/buyer/coupon/${couponId}`, { couponId });
};

