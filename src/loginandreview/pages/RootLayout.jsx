import {Navigate, Outlet} from "react-router-dom";

const RootLayout = () => {
    const token = localStorage.getItem("token")

    if(!token) {
    return <Navigate to= "/login" />;
    }
    return <Outlet />;
};

export default RootLayout