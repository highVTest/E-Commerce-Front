import { useEffect, useState } from "react";
import BuyerFavoriteForm from "./BuyerFavoriteForm";
import { getFavorites } from "../../api/v1/favorite/favorite";

const BuyerFavoriteContainer = () => {
  const token = localStorage.getItem("token");

  const [favorites, setFavorites] = useState([]);

  const buyerGetFavorite = async () => {
    const data = await getFavorites(token);

    setFavorites(data.data);
  };

  useEffect(() => {
    buyerGetFavorite();
  }, []);

  return <BuyerFavoriteForm favorites={favorites}></BuyerFavoriteForm>;
};

export default BuyerFavoriteContainer;
