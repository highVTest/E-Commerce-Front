import { useState, useEffect } from "react";

import SellerInfoForm from "./SellerInfoForm";
import{
    updateSellerInfo,
    updateShopInfo,
    changePassword,
    getShopInfo,
    getSellerInfo,
} from "../../api/v1/seller-backoffice/sellerInfo";


const SellerContainer = () =>{
    //const navigate = useNavigate();
    const [shop,setShop] = useState([]);
    const [seller,setSeller] =useState([]);

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
        alert("No Token");
        window.location.href = "/login/seller"
    }else if(role !== "SELLER"){
        alert("권한이 없습니다");
        window.location.href = "/login/seller"
    }

    const sellerUpdateInfo = async (nickname,phoneNumber,address) => {
        try {
            console.log(nickname);
            console.log(phoneNumber);
            console.log(address);
            await updateSellerInfo(token, nickname,phoneNumber,address);
            alert("프로필 수정 완료!");
        } catch (e) {
            const message = e.response.data["errorMessage"];
            isReLogin(message);
            alert(message);
        }
    };

    const sellerUpdateShopInfo = async (description) =>{
        try{
            await updateShopInfo(token,description);
            alert("상점 프로필 수정 완료!");
        }catch(e){
            const message = e.response.data["errorMessage"];
            isReLogin(message);
            alert(message);
        }
    }

    const sellerChangePassword = async(oldPassword,newPassword) =>{
        try{
            console.log(oldPassword);
            console.log(newPassword);
            await changePassword(token,oldPassword,newPassword);
            alert("상점 프로필 수정 완료!");
        }catch(e){
            const message = e.response.data["errorMessage"];
            isReLogin(message);
            alert(message);
        }
    }

    const sellerGetShopInfo = async() =>{
        try{
            const data = await getShopInfo(token);
            setShop(data.data);
        }catch(e){
            const message = e.response.data["errorMessage"];
            isReLogin(message);
            alert(message);
        }
    }

    const sellerGetMyInfo = async() =>{
        try{
            const data = await getSellerInfo(token);
            setSeller(data.data);
        }catch(e){
            const message = e.response.data["errorMessage"];
            isReLogin(message);
            alert(message);
        }
    }

    const isReLogin = (message) => {
        if (message === "Access Denied") {
            alert("다시 로그인 해주세요");
            localStorage.removeItem("token");
        }
    };

    useEffect(()=>{
        sellerGetShopInfo();
        sellerGetMyInfo();
     },[])

    return(
        <div>
            <SellerInfoForm
                shop={shop}
                seller={seller}
                sellerUpdateInfo={sellerUpdateInfo}
                sellerUpdateShopInfo={sellerUpdateShopInfo}
                sellerChangePassword={sellerChangePassword}
            ></SellerInfoForm>
        </div>
    );
};

export default SellerContainer;