import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import BuyerInfoForm from "./BuyerInforForm";
import { getMyProfile } from "../../api/v1/buyer/buyer";

const BuyerContainer = () => {
  const navigate = useNavigate();

  const [buyer, setBuyer] = useState(null);

  const token = localStorage.getItem("token");
  if (!token) {
    alert("토큰이 없어용 돌아가세요");
    navigate("/");
  }

  const getBuyerDetail = async (token) => {
    const data = await getMyProfile(token);

    setBuyer(data.data);
  };

  useEffect(() => {
    getBuyerDetail(token);
  }, []);

  return (
    <BuyerInfoForm
      buyer={buyer}
      getBuyerDetail={getBuyerDetail}
    ></BuyerInfoForm>
  );
};

export default BuyerContainer;
