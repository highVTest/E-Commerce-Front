import { createBrowserRouter } from "react-router-dom";

import LoginLayout from "./buyer/pages/layout/LoginLayout";
import RootLayout from "./buyer/pages/layout/RootLayout";
import BuyerInfoPage from "./buyer/pages/BuyerInfoPage";
import BuyerLoginPage from "./buyer/pages/BuyerLoginPage";
import BuyerLayout from "./buyer/pages/layout/BuyerLayout";
import BuyerFavoritePage from "./buyer/pages/BuyerFavoritePage";
import BuyerCartPage from "./buyer/pages/BuyerCartPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
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
        element: <BuyerInfoPage />,
      },
      {
        path: "favorite",
        element: <BuyerFavoritePage />,
      },
      {
        path: "cart",
        element: <BuyerCartPage></BuyerCartPage>,
      },
    ],
  },
]);
