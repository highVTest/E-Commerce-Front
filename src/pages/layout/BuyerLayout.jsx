import { Navigate, Outlet, useNavigate } from "react-router-dom";

const BuyerLayout = () => {
  //   const navigate = useNavigate;

  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default BuyerLayout;
