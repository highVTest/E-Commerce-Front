import { useEffect } from "react";

import ProductUpdateForm from "./ProductUpdateForm";

import {
    updateProduct
} from "../../api/v1/product/product";

const ProductUpdateContainer = () =>{

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token) {
        alert("No Token");
        window.location.href = "/login/seller"
    }else if(role !== "SELLER"){
        alert("권한이 없습니다")
        window.location.href = "/login/seller"
    }

    const handleUpdateProduct = async (productId,name,description) => {
        try {
            await updateProduct(token, productId, name, description);
            alert("상품 수정 완료!");
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
            <ProductUpdateForm
                handleUpdateProduct={handleUpdateProduct}
            >
            </ProductUpdateForm>
        </div>
    );
};

export default ProductUpdateContainer;