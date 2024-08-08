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

    // console.log(Email, password);

    const data = await loginBuyer(Email, password);
    // console.log("data: >>", data);

    localStorage.setItem("token", data.data.accessToken);
    localStorage.setItem("role", "BUYER");
    navigate("/");
    window.location.reload();
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <Stack gap="md">
        <TextInput label="Email" placeholder="example@email.com" name="Email" />
        <PasswordInput
          label="Password"
          placeholder="비밀번호를 입력하세요"
          name="password"
        />
        <Button fullWidth type="submit" color="black">
          CONTINUE
        </Button>
      </Stack>
    </form>
  );
};

export default LoginForm;
