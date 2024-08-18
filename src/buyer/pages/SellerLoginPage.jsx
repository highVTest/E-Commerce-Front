import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { Button } from "@mantine/core";

const SellerLoginPage = () => {
  return (
    <section className="login-section">
      <h2 style={{ width: 300, textAlign: "left" }}>판매자 전용 로그인</h2>
      <LoginForm></LoginForm>

      <Link to="/register/seller" className="reg">
        <Button color="black"style={{ width: 300 }} fullWidth variant="filled">
          회원 가입
        </Button>
      </Link>
      <Link to="/login/admin" className="reg">
        <Button style={{ width: "300px" }} color="gray" fullWidth type="submit">
          관리자 권한으로 로그인
        </Button>
      </Link>
    </section>
  );
};

export default SellerLoginPage;