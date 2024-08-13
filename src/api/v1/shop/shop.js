import { apiClient } from "../client"

export const getShopInfo = (shopId)=> {
    return apiClient.get()
}

export const postShop = (token, name, description, shopImage) => {
   
    return apiClient.post("seller/shop", {name, description, shopImage}, {
        headers : {
            Authorization : `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
}