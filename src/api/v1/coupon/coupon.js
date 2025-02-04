import { apiClient } from "../client";



export const createCoupon = async (token, data) => {
  return apiClient.post(`seller/coupon`,{
          productId : data.productId,
          discountPolicy : data.discountPolicy,
          discount: data.discount,
          expiredAt : data.expiredAt,
          quantity : data.quantity,
          couponName : data.couponName,

  }, {
      headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
      }
  } );
};

export const updateCoupon = async (token, data, couponId) => {
    return apiClient.put(`seller/coupon/${couponId}`, {
        expiredAt : data.expiredAt,
        discountPolicy : data.discountPolicy,
        discount: data.discount,
        quantity : data.quantity

    }, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }});
  };

export const deleteSellerCoupon = async (token, couponId) => {
  return apiClient.delete(`seller/coupon/${couponId}`,{
      headers: {
          Authorization: `Bearer ${token}`
      }
  });
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

export const getBuyerCouponById = async (token, productId) => {
    return apiClient.get(`buyer/coupon/${productId}`,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    });
};

export const getBuyerCouponList = async (token) => {
    return apiClient.get(`buyer/coupon`,{
      headers : {
        Authorization : `Bearer ${token}`
      }
    });
};

export const issuedCoupon = async (token, couponId) => {
    return apiClient.patch(`buyer/coupon/${couponId}`, { couponId }, {
        headers : {
            Authorization : `Bearer ${token}`
        }
    });
};

export const getDetailCoupon = async (productId) => {
    return apiClient.get(`coupon/${productId}`, { productId });
}

export const deleteBuyerCoupon = async (token, couponId) => {
    return apiClient.delete(`buyer/coupon/${couponId}`, {
        headers : {
            Authorization : `Bearer ${token}`
        }});
}
