import { Navigate, Outlet } from "react-router-dom";

const LoginLayout = () => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/" />;
  }

  return <Outlet></Outlet>;
};

export default LoginLayout;
