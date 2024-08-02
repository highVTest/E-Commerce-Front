import {createBrowserRouter} from "react-router-dom";
import RootLayout from "./loginandreview/pages/RootLayout.jsx";
import LoginLayout from "./loginandreview/pages/LoginLayout.jsx";
import LoginPage from "./loginandreview/pages/LoginPage.jsx";
import RegisterPage from "./loginandreview/pages/RegisterPage.jsx";
import RedirectPage from "./loginandreview/pages/RedirectPage.jsx";
import UploadPage from "./loginandreview/pages/UploadPage.jsx";
import ReviewPage from "./loginandreview/pages/ReviewPage.jsx";


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
    {
        path: '/upload',
        element: <UploadPage/>,
    },
    {
        path:'/review',
        element: <ReviewPage/>,
    },

]);