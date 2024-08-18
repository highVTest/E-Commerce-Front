import LoginForm from "../../buyer/components/LoginForm";
import AdminLoginForm from "./AdminLoginForm.jsx";

const AdminLoginPage = () => {
    return (
        <section className="login-section">
            <h2 style={{textAlign:"left",width:"300px"}}>관리자 로그인</h2>
            <AdminLoginForm></AdminLoginForm>
        </section>
    );
};

export default AdminLoginPage;