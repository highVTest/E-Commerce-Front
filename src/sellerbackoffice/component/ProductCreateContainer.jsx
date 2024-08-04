import { useEffect} from "react";

import ProductCreateForm from "./ProductCreateForm";

import {
    createProduct
} from "../../api/v1/product/product";


const ProductCreateContainer = () =>{
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if(!token){
        alert("토큰이 없습 니다")
        window.location.href="/login/seller";
    }else if(role !== "SELLER"){
        alert("권한이 없습 니다")
        window.location.href="/login/seller";
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
            localStorage.removeItem("role");
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