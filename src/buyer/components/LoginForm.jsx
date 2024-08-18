import { Button, PasswordInput, Stack, TextInput } from "@mantine/core";

import { useNavigate } from "react-router-dom";
import { loginSeller } from "../../api/v1/auth/auth";

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

      navigate("/");
      window.location.reload();
    } catch (e) {
      alert("로그인에 실패했습니다. ");
    }
  };

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <Stack gap="md">
        <div className="id-pw">
          <p style={{margin:"0",marginBottom:"5px"}}>이메일</p>
          <TextInput placeholder="example@email.com" name="email" />
          <p style={{margin:"0",marginBottom:"5px",marginTop:"15px"}}>비밀번호</p>
          <PasswordInput
            placeholder="비밀번호를 입력하세요"
            name="password"
          />
        </div>
        <Button color="black" fullWidth type="submit" style={{marginTop:"10px"}}>
          로그인
        </Button>
      </Stack>
    </form>
  );
};

export default LoginForm;
