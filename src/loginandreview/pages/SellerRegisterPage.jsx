import { Button } from "@mantine/core";
import { Link } from "react-router-dom";
import "../../index.css";
import SellerRegisterForm from "../components/login/SellerRegisterForm.jsx";

const SellerRegisterPage = () => {
  return (
    <section className="login-section">
      <h2>Hello! Register to get started</h2>
      <SellerRegisterForm />
      <Link to="/login/seller">
        <Button
          style={{ width: 300 }}
          fullWidth
          variant="filled"
          // color="rgba(166, 104, 158, 1)"
          color="gray"
          radius="md"
        >
          로그인하기
        </Button>
      </Link>
    </section>
  );
};

export default SellerRegisterPage;
