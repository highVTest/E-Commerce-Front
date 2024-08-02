import { useState } from "react";

import SellerInfoForm from "./SellerInfoForm";
import{
    updateSellerInfo,
    updateShopInfo
} from "../../api/v1/seller-backoffice/sellerInfo";


const SellerContainer = () =>{
    //const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    const token = localStorage.getItem("token");
    if (!token) {
        alert("No Token");
        navigate("/");
    }

    const sellerUpdateInfo = async (seller) => {
        try {
            await updateSellerInfo(token, seller);
            alert("프로필 수정 완료!");
        } catch (e) {
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

    return(
        <div>
            <SellerInfoForm
                sellerUpdateInfo={sellerUpdateInfo}
                sellerUpdateShopInfo={sellerUpdateShopInfo}
            ></SellerInfoForm>
        </div>
    );
};

export default SellerContainer;