import { Button, PasswordInput, Stack, TextInput } from "@mantine/core";

import { useNavigate } from "react-router-dom";
import { loginSeller } from "../../api/v1/auth/auth";
import "./css/BuyerCss.css";

const LoginForm = () => {
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const data = await loginSeller(email, password);

      localStorage.setItem("token", data.data.accessToken);
      localStorage.setItem("role", "SELLER");

      navigate("/"); // 일단 구매자 로그인 성공 시 마이페이지로 전환
      window.location.reload();
    } catch (e) {
      console.log(e);
      alert("로그인에 실패했습니다. ");
    }
  };

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <Stack gap="md">
        <TextInput
          label="email"
          placeholder="email을 입력하세요"
          name="email"
        />
        <PasswordInput
          label="Password"
          placeholder="비밀번호를 입력하세요"
          name="password"
        />
        <Button fullWidth type="submit">
          로그인
        </Button>
      </Stack>
    </form>
  );
};

export default LoginForm;
