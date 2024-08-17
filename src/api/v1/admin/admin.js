import { apiClient } from "../client";


export const sanctionSeller = async (sellerId) => {
  return apiClient.post(`admin/sanctions/seller/${sellerId}`, { sellerId });
};

export const sanctionProduct = async (token, productId) => {
    return apiClient.post(`admin/sanctions/product/${productId}`, {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const getBlackLists = async (token) => {
    return apiClient.get("admin/black-list",{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
  };
  

export const getBlackList = async (blackListId) => {
  return apiClient.get(`/api/v1/admin/black-list/${blackListId}`, { blackListId });
};

export const deleteBlackList = async (token, blackListId) => {
    return apiClient.delete(`admin/black-list/${blackListId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
  };

export const getSellerLists = async (token) => {
    return apiClient.get(`admin/sellers`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const getSellerBySellerId = async (token, sellerId) => {
    return apiClient.get(`admin/sellers/${sellerId}`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const promotePendingSeller = async (token, sellerId) => {
    return apiClient.patch(`admin/seller/approval/${sellerId}`,{},{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const adminLogin = async (email, password) => {
    return apiClient.post(`admin/login`,{email : email, password: password},{
        headers: {
            "Content-Type": "application/json"
        }
    })
}