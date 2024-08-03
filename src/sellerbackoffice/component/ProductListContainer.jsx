import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductList from "./ProductList";

import {
    deleteProduct
} from "../../api/v1/product/product";
import{
    changeQuantity,
    changePrice,
    getSellerProducts
} from "../../api/v1/seller-backoffice/inventoryManagement";

const ProductListContainer=()=>{
    const navigate = useNavigate();
    const [products,setProducts]=useState([]);
    
    const token = localStorage.getItem("token");
    if (!token) {
        alert("No Token");
    }

    const handleDeleteProduct = async(productId) =>{
        try{
            await deleteProduct(token,productId);
            alert("상품 삭제 완료!");
            getSellersAllProduct();
        }catch(e){
            const message = e.response.data["errorMessage"];
            //isReLogin(message);
            alert(message);
        }
    }

    const getSellersAllProduct = async() =>{
        try{ 
            const data = await getSellerProducts(token);
            console.log(data.data);
            setProducts(data.data);
        } catch(e) {
            const message = e.response.data["errorMessage"];
            //isReLogin(message);
            alert(message);
        }
    };

    const handleProductPrice = async(productId,price) =>{
        try{
            await changePrice(token,productId,price);
            alert("가격 수정 완료!");
        }catch(e){
            const message = e.response.data["errorMessage"];
            //isReLogin(message);
            alert(message);
        }
    }

    const handleProductQuantity = async(productId,quantity) =>{
        try{
            await changeQuantity(token,productId,quantity);
            alert("수량 수정 완료!");
        }catch(e){
            const message = e.response.data["errorMessage"];
            //isReLogin(message);
            alert(message);
        }
    }

    useEffect(()=>{
        getSellersAllProduct();
    },[]);
    
    return(
        <div>
            <ProductList
                products={products}
                handleProductPrice={handleProductPrice}
                handleProductQuantity={handleProductQuantity}
                handleDeleteProduct={handleDeleteProduct}
            ></ProductList>
        </div>
    );
};

export default ProductListContainer;