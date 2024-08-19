import { useState, useEffect } from "react";

import SellerInfoForm from "./SellerInfoForm";
import {
  updateSellerInfo,
  updateShopInfo,
  changePassword,
  getShopInfo,
  getSellerInfo,
  updateShopImage,
  updateSellerImage,
} from "../../api/v1/seller-backoffice/sellerInfo";
import { uploadImage } from "../../api/v1/image/image";

const SellerContainer = () => {
  //const navigate = useNavigate();
  const [shop, setShop] = useState([]);
  const [seller, setSeller] = useState([]);
  const [desc, setDesc] = useState("");

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    alert("No Token");
    window.location.href = "/login/seller";
  } else if (role !== "SELLER") {
    alert("권한이 없습니다");
    window.location.href = "/login/seller";
  }

  const addImage = async (file) => {
    try {
      const data = await uploadImage(token, file);
      return data.data.imageUrl;
    } catch (e) {
      if (e.response.data.errorMessage == "Maximum upload size exceeded") {
        alert("이미지는 최대 5MB까지 가능합니다.");
      }
      return "None";
    }
  };

  const updateSellerInfoImage = async (imageUrl) => {
    try {
      const data = await updateSellerImage(token, imageUrl);
      alert(data.data.msg);
      await sellerGetMyInfo();
    } catch (e) {}
  };

  const updateShopInfoImage = async (imageUrl) => {
    try {
      const data = await updateShopImage(token, imageUrl);
      alert(data.data.msg);
      await sellerGetShopInfo();
    } catch (e) {}
  };

  const sellerUpdateInfo = async (nickname, phoneNumber, address) => {
    try {
      await updateSellerInfo(token, nickname, phoneNumber, address);
      alert("프로필 수정 완료!");
      window.location.reload();
    } catch (e) {
      const message = e.response.data["errorMessage"];
      isReLogin(message);
      alert(message);
    }
  };

  const sellerUpdateShopInfo = async (description) => {
    try {
      await updateShopInfo(token, description);
      alert("상점 프로필 수정 완료!");
      window.location.reload();
    } catch (e) {
      const message = e.response.data["errorMessage"];
      isReLogin(message);
      alert(message);
    }
  };

  const sellerChangePassword = async (
    oldPassword,
    newPassword,
    confirmPassword
  ) => {
    try {
      await changePassword(token, oldPassword, newPassword, confirmPassword);
      alert("비밀번호 수정 완료!");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      window.location.href = "/login/seller";
    } catch (e) {
      const message = e.response.data["errorMessage"];
      isReLogin(message);
      alert(message);
    }
  };

  const sellerGetShopInfo = async () => {
    try {
      const data = await getShopInfo(token);
      setShop(data.data);
      setDesc(data.data.description);
    } catch (e) {
      const message = e.response.data["errorMessage"];
      isReLogin(message);
      if (message == "Result must not be null") {
        alert("가게를 생성해주세요");
        window.location.href = "/seller/shop";
      }
    }
  };

  const sellerGetMyInfo = async () => {
    try {
      const data = await getSellerInfo(token);
      setSeller(data.data);
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

  useEffect(() => {
    sellerGetShopInfo();
    sellerGetMyInfo();
  }, []);

  return (
    <div>
      <SellerInfoForm
        shop={shop}
        seller={seller}
        sellerUpdateInfo={sellerUpdateInfo}
        sellerUpdateShopInfo={sellerUpdateShopInfo}
        sellerChangePassword={sellerChangePassword}
        updateSellerInfoImage={updateSellerInfoImage}
        updateShopInfoImage={updateShopInfoImage}
        addImage={addImage}
        desc={desc}
        setDesc={setDesc}
      ></SellerInfoForm>
    </div>
  );
};

export default SellerContainer;
