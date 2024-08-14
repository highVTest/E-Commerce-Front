import {Navigate, Outlet} from "react-router-dom";
import {useEffect} from "react";

const LoginLayout = () => {
    const token = localStorage.getItem("token");

    // useEffect(() => {
    //     if(window.Kakao.isInitialized()) return;

    //     window.Kakao.init(import.meta.env.VITE_KAKAO_API_KEY);

    // }, []);

    if (token) {
        return <Navigate to= "/" />;
    }
    return <Outlet />;
};

export default LoginLayout