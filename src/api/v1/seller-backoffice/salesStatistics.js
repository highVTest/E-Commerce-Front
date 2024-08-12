import { apiClient } from "../client";


export const getMonthsProductSales = async (token) => {
  return apiClient.get(`seller/product`,{
      headers:{
          Authorization : `Bearer ${token}`,
      }
  });
};

export const getTotalSales = async (token) => {
    return apiClient.get(`seller/total-sales`,{
        headers:{
            Authorization : `Bearer ${token}`,
        }
    });
  };

export const getProductSales = async (token) => {
  return apiClient.get(`seller/sales`, {
      headers:{
          Authorization : `Bearer ${token}`,
      }});
};

// export const getProductSalesAmount = async (productId) => {
//     return apiClient.get(`/api/v1/seller/${productId}/sales-amount`, { productId });
//   };
  