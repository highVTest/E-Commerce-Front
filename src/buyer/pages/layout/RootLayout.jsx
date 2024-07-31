import { Navigate, Outlet } from "react-router-dom";

const RootLayout = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <main>
      <h1>시작 페이지 입니다.</h1>
      <Outlet />
    </main>
  );
};

export default RootLayout;
