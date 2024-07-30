import LoginForm from "../components/login/LoginForm.jsx";
import "../index.css"

const LoginPage = () => {
    return (
        <section className="login-section">
        <h2>Login to High-V</h2>
            <LoginForm />
    </section>
    );
};

export default LoginPage;