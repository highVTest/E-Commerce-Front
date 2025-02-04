import { useEffect, useState } from "react";
import {
  favoriteDelete,
  favoriteManagement,
  getFavorites,
} from "../../api/v1/favorite/favorite";
import { deleteItemIntoCart, getMyCart } from "../../api/v1/item-cart/itemCart";
import { buyerPayment } from "../../api/v1/orders/orders";
import BuyerCartForm from "./BuyerCartForm";

const BuyerCartContainer = () => {
  const [items, setItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    window.location.href = "/login/buyer";
    alert("로그인을 해주세요");
  } else if (role !== "BUYER") {
    window.location.href = "/login/buyer";
    alert("권한이 없습니다");
  }

  const getBuyerCart = async () => {
    const data = await getMyCart(token);
    setLoading(false);
    setItems(data.data);

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
      let data;
      if (favorites.indexOf(productId) == -1) {
        data = await favoriteManagement(token, productId);
      } else {
        data = await favoriteDelete(token, productId);
      }

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

  const deleteItem = async (productId) => {
    const data = await deleteItemIntoCart(token, productId);
    alert("상품이 삭제됐습니다.");
    getBuyerCart();
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
        deleteItem={deleteItem}
        loading={loading}
      ></BuyerCartForm>
    </div>
  );
};

export default BuyerCartContainer;
