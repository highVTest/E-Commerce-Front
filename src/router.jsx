import {createBrowserRouter} from "react-router-dom";
import RootLayout from "./pages/RootLayout.jsx";
import LoginLayout from "./pages/LoginLayout.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import RedirectPage from "./pages/RedirectPage.jsx";

export const router= createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                path: "",
                element: <></>
            }
        ]
    },
    {
        path: '/login',
        element: <LoginLayout />,
        children: [
            {
                path:"",
                element: <LoginPage />,
            },
            {
                path: 'register',
                element: <RegisterPage/>,
            },
        ],
    },
    {
        path:"/redirect",
        element: <RedirectPage />,
    },
]);