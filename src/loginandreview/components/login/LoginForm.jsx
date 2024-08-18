import { Button, PasswordInput, Stack, TextInput } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { loginBuyer } from "../../../api/v1/auth/auth.js";

const LoginForm = () => {
  const navigate = useNavigate(); //로그인 후 지정한 주소로 이동 아마 메인페이지?

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const Email = formData.get("Email");
    const password = formData.get("password");

    try {
      const data = await loginBuyer(Email, password);
      localStorage.setItem("token", data.data.accessToken);
      localStorage.setItem("role", "BUYER");
      navigate("/");
      window.location.reload();
    } catch (e) {
      const message = e.response.data.errorMessage;
      if (message == "구매자 로그인 실패") {
        alert("로그인 실패");
      }
    }

  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <Stack gap="md">
        <div className="id-pw">
          <p style={{margin:"0",marginBottom:"5px"}}>이메일</p>
          <TextInput placeholder="example@email.com" name="Email" />
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
