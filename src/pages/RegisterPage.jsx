
import "../index.css"
import RegisterForm from "../components/login/RegisterForm.jsx";
import {Link} from "react-router-dom";

const RegisterPage = () => {
    return (
        <section className="login-section">
            <h2>Hello! Register to get started</h2>
            <RegisterForm />
            <Link to="/login">로그인하기</Link>
        </section>
    );
};

export default RegisterPage;