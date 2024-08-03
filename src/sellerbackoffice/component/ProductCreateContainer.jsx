import { useEffect, useState } from "react";

import ProductCreateForm from "./ProductCreateForm";

import {
    createProduct
} from "../../api/v1/product/product";


const ProductCreateContainer = () =>{

    const token = localStorage.getItem("token");
    if (!token) {
        alert("No Token");
    }
    
    const handleCreateProduct = async (name, price, quantity, description) => {
        try {
            await createProduct(token, name, price, quantity, description);
            alert("상품 추가 완료!");
        } catch (e) {
            const message = e.response.data["errorMessage"];
            isReLogin(message);
            alert(message);
        }
    };

    const isReLogin = (message) => {
        if (message === "Access Denied") {
            alert("다시 로그인 해주세요");
            localStorage.removeItem("token");
        }
    };

    useEffect(()=>{
    },[]);

    return(
        <div>
            <ProductCreateForm
                handleCreateProduct={handleCreateProduct}
            ></ProductCreateForm>
        </div>
    );
};

export default ProductCreateContainer;