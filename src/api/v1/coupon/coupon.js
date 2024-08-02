import { apiClient } from "../client";



export const createCoupon = async () => {
  return apiClient.post(`seller/coupon`);
};

export const updateCoupon = async (couponId) => {
    return apiClient.put(`seller/coupon/${couponId}`, { couponId });
  };

export const deleteCoupon = async (couponId) => {
  return apiClient.delete(`seller/coupon/${couponId}`, { couponId });
};

export const getSellerCouponById = async (couponId) => {
    return apiClient.get(`seller/coupon/{couponId}`, { couponId });
  };

export const getSellerCouponList = async () => {
    return apiClient.get(`seller/coupon`);
};

export const getBuyerCouponById = async (couponId) => {
    return apiClient.get(`buyer/coupon/${couponId}`, { couponId });
};

export const getBuyerCouponList = async (token) => {
    return apiClient.get(`buyer/coupon`,{
      headers : {
        Authorization : `Bearer ${token}`
      }
    });
};

export const issuedCoupon = async () => {
    return apiClient.patch(`buyer/coupon/${couponId}`, { couponId });
};

