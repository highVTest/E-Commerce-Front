import LoginForm from "../components/login/LoginForm.jsx";
import "../index.css"
import {Link} from "react-router-dom";
import {Button, Stack} from "@mantine/core";
import KakaoLoginButton from "../components/login/KakaoLoginButton.jsx";

const LoginPage = () => {
    return (
        <section className="login-section">
        <h2>Login to High-V</h2>
            <LoginForm />
            <KakaoLoginButton />
            <Stack gap="md"><Button>
                <Link fullWidth to= "/login/register">회원가입하기</Link>
            </Button></Stack>

    </section>
    );
};

export default LoginPage;