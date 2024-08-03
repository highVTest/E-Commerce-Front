import { useEffect, useState } from "react";
import BuyerFavoriteForm from "./BuyerFavoriteForm";
import {
  favoriteManagement,
  getFavorites,
} from "../../api/v1/favorite/favorite";

const BuyerFavoriteContainer = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const [favorites, setFavorites] = useState([]);


  if(!token){
    alert("로그인을 해주세요");
    window.location.href = "/login/buyer"
  }else if(role !== "BUYER"){
    alert("권한이 없습니다");
    window.location.href = "/login/buyer"
  }

  const buyerGetFavorite = async () => {
    try {
      const data = await getFavorites(token);

      setFavorites(data.data);
    } catch (e) {
      const status = e.response.data["errorCode"];
      const message = e.response.data["errorMessage"];
      isReLogin(message);
      alert(message);
    }
  };

  const buyerChangeFavorite = async (productId) => {
    try {
      const data = await favoriteManagement(token, productId);
      const msg = data.data.msg;
      if (
        msg == "찜 목록에서 삭제했습니다." ||
        msg == "찜 목록에 추가 했습니다."
      ) {
        alert(msg);
      }
    } catch (e) {
      const status = e.response.data["errorCode"];
      const message = e.response.data["errorMessage"];
      isReLogin(message);
      alert(message);
    }

    await buyerGetFavorite();
  };

  const isReLogin = (message) => {
    if (message == "Access Denied") {
      alert("다시 로그인 해주세요");
      localStorage.removeItem("token");
      return;
    }
  };

  useEffect(() => {
    buyerGetFavorite();
  }, []);

  return (
    <BuyerFavoriteForm
      favorites={favorites}
      buyerChangeFavorite={buyerChangeFavorite}
    ></BuyerFavoriteForm>
  );
};

export default BuyerFavoriteContainer;
