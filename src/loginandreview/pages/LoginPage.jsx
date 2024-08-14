import LoginForm from "../../loginandreview/components/login/LoginForm.jsx";
import "../../index.css";
import { Link } from "react-router-dom";
import { Button, Stack } from "@mantine/core";
import KakaoLoginButton from "../../loginandreview/components/login/KakaoLoginButton.jsx";

const LoginPage = () => {
  return (
    <section className="login-section">
      <h2>Login to High-V</h2>
      <LoginForm />
      <Link to="/login/register">
        <Button
          style={{ width: 300 }}
          fullWidth
          variant="filled"
          // color="rgba(166, 104, 158, 1)"
          color="gray"
          radius="md"
        >
          SIGN UP
        </Button>
      </Link>
      {/* <KakaoLoginButton /> */}
    </section>
  );
};

export default LoginPage;
