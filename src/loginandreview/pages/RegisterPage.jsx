import { Button } from "@mantine/core";
import "../../index.css";
import RegisterForm from "../../loginandreview/components/login/RegisterForm.jsx";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <section className="login-section">
      <h2>Hello! Register to get started</h2>
      <RegisterForm />
      <Link to="/login">
        <Button
          style={{ width: 300 }}
          fullWidth
          variant="filled"
          color="rgba(166, 104, 158, 1)"
          radius="md"
        >
          로그인하기
        </Button>
      </Link>
    </section>
  );
};

export default RegisterPage;
