import { useEffect, useState } from "react";
import {
  favoriteManagement,
  getFavorites,
} from "../../api/v1/favorite/favorite";
import { getMyCart } from "../../api/v1/item-cart/itemCart";
import { buyerPayment } from "../../api/v1/orders/orders";
import BuyerCartForm from "./BuyerCartForm";

const BuyerCartContainer = () => {
  const [items, setItems] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if(!token){
    alert("로그인을 해주세요");
    window.location.href = "/login/buyer"
  }else if(role !== "BUYER"){
    alert("권한이 없습니다");
    window.location.href = "/login/buyer"
  }

  const getBuyerCart = async () => {
    const data = await getMyCart(token);

    // console.log("장바구니 >> ", data.data);

    setItems(data.data);
    // const dataCoupon = await getBuyerCouponList(token);
    // console.log("쿠폰 >> ", dataCoupon.data);
    await getBuyerFavorites();
  };

  const getBuyerFavorites = async () => {
    const data = await getFavorites(token);
    const favoriteIds = [];
    data.data.forEach((favorite) => {
      favoriteIds.push(favorite.productId);
    });
    setFavorites(favoriteIds);
  };

  const favoriteChange = async (productId) => {
    try {
      const data = await favoriteManagement(token, productId);
      const msg = data.data.msg;
      if (
        msg == "찜 목록에서 삭제했습니다." ||
        msg == "찜 목록에 추가 했습니다."
      ) {
        alert(msg);
      }
      await getBuyerFavorites();
    } catch (e) {
      const status = e.response.data["errorCode"];
      const message = e.response.data["errorMessage"];
      isReLogin(message);
      alert(message);
    }
  };

  const buyerPayments = async (cartIdList, couponIdList) => {
    try {
      const data = await buyerPayment(token, cartIdList, couponIdList);
      console.log(data);
      alert(`총${cartIdList.length}건 주문이 완료됐습니다.`);
    } catch (e) {
      const status = e.response.data["errorCode"];
      const message = e.response.data["errorMessage"];
      if (message == "재고가 부족 합니다") {
        alert(message);
        return;
      }
      isReLogin(message);
    }
  };

  const isReLogin = (message) => {
    if (message == "Access Denied") {
      alert("다시 로그인 해주세요");
      localStorage.removeItem("token");
      return;
    }
  };

  useEffect(() => {
    getBuyerCart();
  }, []);

  return (
    <div>
      <BuyerCartForm
        items={items}
        buyerPayments={buyerPayments}
        favorites={favorites}
        favoriteChange={favoriteChange}
      ></BuyerCartForm>
    </div>
  );
};

export default BuyerCartContainer;
