import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import BuyerInfoForm from "./BuyerInforForm";
import {
  changeImage,
  changePassword,
  changeProfile,
  getMyProfile,
} from "../../api/v1/buyer/buyer";

const BuyerContainer = () => {
  const navigate = useNavigate();

  const [buyer, setBuyer] = useState(null);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    alert("로그인 해주세요");
    navigate("/login/buyer");
  }else if(role !== "BUYER"){
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
      const data = await changeImage(token, file);
      setBuyer(data.data);
    } catch (e) {
      const status = e.response.data["errorCode"];
      const message = e.response.data["errorMessage"];
      // console.log(status);
      // console.log(message);
      isReLogin(message);
      alert(message);
    }
  };

  const buyerChangeProfile = async (nickname, address, phoneNumber) => {
    try {
      const data = await changeProfile(token, nickname, address, phoneNumber);
      setBuyer(data.data);
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
      console.log("dddd");
      localStorage.removeItem("token");
      alert(data.data);
    } catch (e) {
      const status = e.response.data["errorCode"];
      const message = e.response.data["errorMessage"];
      console.log(e.response.data);
      console.log(status);
      console.log(message);
      isReLogin(message);
      alert(message);
    }
  };

  const isReLogin = (message) => {
    if (message == "Access Denied") {
      alert("다시 로그인 해주세요");
      // localStorage.removeItem("token");
      // localStorage.removeItem("role");
      return;
    }
  };
  useEffect(() => {
    getBuyerDetail(token);
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
