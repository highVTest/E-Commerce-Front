import LoginForm from "../../buyer/components/LoginForm";
import AdminLoginForm from "./AdminLoginForm.jsx";

const AdminLoginPage = () => {
    return (
        <section className="login-section">
            <h2>Admin Login</h2>
            <AdminLoginForm></AdminLoginForm>
        </section>
    );
};

export default AdminLoginPage;