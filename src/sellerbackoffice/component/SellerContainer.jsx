import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SellerInfoForm from "./SellerInfoForm";
import{
    updateSellerInfo
} from "../../api/v1/seller-backoffice/sellerInfo";


const SellerContainer = () =>{
    //const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    const token = localStorage.getItem("token");
    if (!token) {
        alert("No Token");
        navigate("/");
    }

    const handleUpdateSellerInfo = async (seller) => {
        try {
            await updateSellerInfo(token, seller);
            alert("프로필 수정 완료!");
        } catch (e) {
            const status = e.response.data["errorCode"];
            const message = e.response.data["errorMessage"];
            isReLogin(message);
            alert(message);
        }
    };

    const sellerUpdateShopInfo = async (description,file) =>{
        try{
            await updateShopInfo(token,description,file);
            alert("상점 프로필 수정 완료!");
        }catch(e){
            const status = e.response.data["errorCode"];
            const message = e.response.data["errorMessage"];
            isReLogin(message);
            alert(message);
        }
    }

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

    return(
        <div>
            <SellerInfoForm
                sellerUpdateShopInfo={sellerUpdateShopInfo}
            ></SellerInfoForm>
        </div>
    );
};

export default SellerContainer;