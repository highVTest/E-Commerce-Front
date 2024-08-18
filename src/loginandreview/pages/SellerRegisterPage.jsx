import { Button } from "@mantine/core";
import { Link } from "react-router-dom";
import "../../index.css";
import SellerRegisterForm from "../components/login/SellerRegisterForm.jsx";

const SellerRegisterPage = () => {
  return (
    <section className="login-section">
      <h2 style={{width:300, textAlign:"left"}}>판매자 회원가입 페이지</h2>
      <SellerRegisterForm />
      <Link to="/login/seller" className="reg">
        <Button
        color="black" 
          style={{ width: 300 }}
          fullWidth
          variant="filled"
        >
          로그인하기
        </Button>
      </Link>
    </section>
  );
};

export default SellerRegisterPage;
