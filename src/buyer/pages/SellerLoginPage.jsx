import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { Button } from "@mantine/core";

const SellerLoginPage = () => {
  return (
    <section className="login-section">
      <h2>Seller Login</h2>
      <LoginForm></LoginForm>
      <Link to="/register/seller">
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
    </section>
  );
};

export default SellerLoginPage;
