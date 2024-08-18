import LoginForm from "../../loginandreview/components/login/LoginForm.jsx";
import "../../index.css";
import { Link } from "react-router-dom";
import { Button } from "@mantine/core";

const LoginPage = () => {
  return (
    <section className="login-section">
      <h2 style={{width:300, textAlign:"left"}}>Login</h2>
      <LoginForm />
      <Link to="/login/register" className="reg">
        <Button
        color="black" 
          style={{ width: 300 }}
          fullWidth
          variant="filled"
        >
          회원 가입
        </Button>
      </Link>
    </section>
  );
};

export default LoginPage;
