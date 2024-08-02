import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ProductForm from "./ProductForm";
import {
    createProduct,
    updateProduct,
    deleteProduct,
} from "../../api/v1/product/product";

const ProductContainer = () =>{
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const token = localStorage.getItem("token");

    if (!token) {
        alert("No Token");
        navigate("/");
    }
    const fetchProducts = async () => {
        try {
            const data = await getAllProduct(token);
            setProducts(data);
        } catch (e) {
            const status = e.response.data["errorCode"];
            const message = e.response.data["errorMessage"];
            isReLogin(message);
            alert(message);
        }
    };

    const handleCreateProduct = async (name, price, quantity, description,file) => {
        try {
            console.log(name);
            await createProduct(token, name, price, quantity, description,file);
            await fetchProducts();
            alert("상품 추가 완료!");
        } catch (e) {
            const status = e.response.data["errorCode"];
            const message = e.response.data["errorMessage"];
            isReLogin(message);
            alert(message);
        }
    };

    const handleUpdateProduct = async (product) => {
        try {
            await updateProduct(token, product);
            await fetchProducts();
            alert("상품 수정 완료!");
        } catch (e) {
            const status = e.response.data["errorCode"];
            const message = e.response.data["errorMessage"];
            isReLogin(message);
            alert(message);
        }
    };

    const handleDeleteProduct = async (productId) => {
        try {
            await deleteProduct(token, productId);
            await fetchProducts();
            alert("상품 삭제 완료!");
        } catch (e) {
            const status = e.response.data["errorCode"];
            const message = e.response.data["errorMessage"];
            isReLogin(message);
            alert(message);
        }
    };

    const handleProductImageChange = async (productId, file) => {
        try {
            const data = await changeProductImage(token, productId, file);
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product.id === productId ? { ...product, image: data.image } : product
                )
            );
        } catch (e) {
            const status = e.response.data["errorCode"];
            const message = e.response.data["errorMessage"];
            isReLogin(message);
            alert(message);
        }
    };

    const isReLogin = (message) => {
        if (message === "Access Denied") {
            alert("다시 로그인 해주세요");
            localStorage.removeItem("token");
            navigate("/");
        }
    };

    useEffect(()=>{
        getSellerDetail(token);
    },[]);

    return(
        <div>
            <ProductForm
                handleCreateProduct={handleCreateProduct}
            ></ProductForm>
        </div>
    );
};

export default ProductContainer;