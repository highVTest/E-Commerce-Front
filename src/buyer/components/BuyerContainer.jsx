import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import BuyerInfoForm from "./BuyerInforForm";
import {
  changeImage,
  changePassword,
  changeProfile,
  getMyProfile,
} from "../../api/v1/buyer/buyer";
import { uploadImage } from "../../api/v1/image/image";

const BuyerContainer = () => {
  const navigate = useNavigate();

  const [buyer, setBuyer] = useState(null);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    alert("로그인 해주세요");
    navigate("/login/buyer");
  } else if (role !== "BUYER") {
    alert("권한이 없습니다");
    navigate("/");
  }

  const getBuyerDetail = async () => {
    try {
      const data = await getMyProfile(token);
      setBuyer(data.data);
    } catch (e) {
      const status = e.response.data["errorCode"];
      const message = e.response.data["errorMessage"];
      isReLogin(message);
      alert(message);
    }
  };

  const buyerChangeImage = async (file) => {
    try {
      let imageUrl = "";

      if (file) {
        try {
          const dataImage = await uploadImage(token, file);
          imageUrl = dataImage.data.imageUrl;
        } catch (e) {
          if (e.response.data.errorMessage == "Maximum upload size exceeded")
            alert("이미지는 최대 5MB까지 가능합니다.");
        }
      }

      const data = await changeImage(token, imageUrl);
      await getBuyerDetail();
      alert(data.data.msg);
    } catch (e) {
      const status = e.response.data["errorCode"];
      const message = e.response.data["errorMessage"];
      isReLogin(message);
    }
  };

  const buyerChangeProfile = async (nickname, address, phoneNumber) => {
    try {
      const data = await changeProfile(token, nickname, address, phoneNumber);
      setBuyer(data.data);
      getBuyerDetail();
      alert("프로필이 변경됐습니다.");
    } catch (e) {
      const status = e.response.data["errorCode"];
      const message = e.response.data["errorMessage"];

      isReLogin(message);
      alert(message);
    }
  };

  const buyerChangePassword = async (currentPW, newPW, confirmPW) => {
    try {
      const data = await changePassword(token, currentPW, newPW, confirmPW);

      localStorage.removeItem("token");
      localStorage.removeItem("role");
      alert(data.data.msg);
      window.location.href = "/";
    } catch (e) {
      const status = e.response.data["errorCode"];
      const message = e.response.data["errorMessage"];
      isReLogin(message);
      alert(message);
    }
  };

  const isReLogin = (message) => {
    if (message == "Access Denied") {
      alert("다시 로그인 해주세요");
    } else {
      alert(message);
    }
  };
  useEffect(() => {
    getBuyerDetail();
  }, []);

  return (
    <BuyerInfoForm
      buyer={buyer}
      getBuyerDetail={getBuyerDetail}
      buyerChangeImage={buyerChangeImage}
      buyerChangeProfile={buyerChangeProfile}
      buyerChangePassword={buyerChangePassword}
    ></BuyerInfoForm>
  );
};
export default BuyerContainer;
