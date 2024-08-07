import { apiClient } from "../client";



export const createCoupon = async (token, data) => {
  return apiClient.post(`seller/coupon`,{
      createCouponRequest :{
          productId : data.productId,
          discountPolicy : data.discountPolicy,
          expiredAt : data.expiredAt,
          quantity : data.quantity,
          couponName : data.couponName,
      }
  }, {
      headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
      }
  } );
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

export const getSellerCouponList = async (token) => {
    return apiClient.get(`seller/coupon`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });
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

