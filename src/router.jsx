import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/layout/RootLayout";

import BuyerInfo from "./pages/buyer/BuyerInfo";
import BuyerLoginPage from "./pages/buyer/BuyerLoginPage";
import LoginLayout from "./pages/layout/LoginLayout";
import BuyerLayout from "./pages/layout/BuyerLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    // children: [
    //   {
    //     path: "",
    //     element: <BuyerInfo />,
    //   },
    // ],
  },
  {
    path: "/login",
    element: <LoginLayout></LoginLayout>,
    children: [
      {
        path: "",
        element: <BuyerLoginPage></BuyerLoginPage>,
      },
    ],
  },
  {
    path: "/buyer",
    element: <BuyerLayout></BuyerLayout>,
    children: [
      {
        path: "",
        element: <BuyerInfo />,
      },
    ],
  },
]);
