import { Button } from "@mantine/core";
import "../../index.css";
import RegisterForm from "../../loginandreview/components/login/RegisterForm.jsx";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <section className="login-section">
      <h2 style={{width:300, textAlign:"left"}}>Made By 회원가입</h2>
      <RegisterForm />
      <Link to="/login/buyer" className="reg">
        <Button
          style={{ width: 300 }}
          fullWidth
          variant="filled"
        >
          로그인 페이지로 돌아가기
        </Button>
      </Link>
    </section>
  );
};

export default RegisterPage;
