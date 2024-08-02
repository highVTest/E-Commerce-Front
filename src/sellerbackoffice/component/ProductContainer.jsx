import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProducts
} from "../../api/v1/product/product";
import{
    changeQuantity,
    changePrice,
} from "../../api/v1/seller-backoffice/inventoryManagement";


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

    const getAllProduct = async() =>{
        try{ 
            await getAllProducts();
            
        } catch(e) {
            const status =e.response.data["errorCode"];
            const message = e.response.data["errorMessage"];
            isReLogin(message);
            alert(message);
        }
    };

    const handleProductPrice = async(productId) =>{
        try{
            await changePrice(productId);
            await fetchProducts();
            alert("가격 수정 완료!");
        }catch(e){
            const status =e.response.data["errorCode"];
            const message = e.response.data["errorMessage"];
            isReLogin(message);
            alert(message);
        }
    }

    const handleProductQuantity = async(productId) =>{
        try{
            await changeQuantity(productId);
            await fetchProducts();
            alert("수량 수정 완료!");
        }catch(e){
            const status =e.response.data["errorCode"];
            const message = e.response.data["errorMessage"];
            isReLogin(message);
            alert(message);
        }
    }

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
            <ProductList
                handleProductPrice={handleProductPrice}
                handleProductQuantity={handleProductQuantity}
            ></ProductList>
        </div>
    );
};

export default ProductContainer;