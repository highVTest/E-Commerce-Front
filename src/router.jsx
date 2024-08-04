import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./loginandreview/pages/RootLayout.jsx";
import LoginLayout from "./loginandreview/pages/LoginLayout.jsx";
import LoginPage from "./loginandreview/pages/LoginPage.jsx";
// import LoginLayout from "./buyer/pages/layout/LoginLayout.jsx";
// import LoginPage from "./buyer/pages/BuyerLoginPage.jsx";
import RegisterPage from "./loginandreview/pages/RegisterPage.jsx";
import RedirectPage from "./loginandreview/pages/RedirectPage.jsx";
import UploadPage from "./loginandreview/pages/UploadPage.jsx";
// import ReviewPage from "./loginandreview/pages/ReviewPage.jsx";
import BuyerFavoritePage from "./buyer/pages/BuyerFavoritePage.jsx";
import BuyerCartPage from "./buyer/pages/BuyerCartPage.jsx";
import ProductLayout from "./buyer/pages/layout/ProductLayout.jsx";
import ProductOnePage from "./buyer/pages/ProductOnePage.jsx";
import ProductPage from "./buyer/pages/ProductPage.jsx";
import BuyerInfoPage from "./buyer/pages/BuyerInfoPage.jsx";
import BuyerLayout from "./buyer/pages/layout/BuyerLayout.jsx";
import BuyerOrderListPage from "./payment/pages/BuyerOrderListPage.jsx";
import ProductUpdateForm from "./sellerbackoffice/component/ProductUpdateForm.jsx";
import SellerContainer from "./sellerbackoffice/component/SellerContainer.jsx";
import ProductListContainer from "./sellerbackoffice/component/ProductListContainer.jsx";
import ProductCreateContainer from "./sellerbackoffice/component/ProductCreateContainer.jsx";
import ProductUpdateContainer from "./sellerbackoffice/component/ProductUpdateContainer.jsx";
import SellerLoginPage from "./buyer/pages/SellerLoginPage.jsx";
import HomePage from "./homepage/pages/HomePage.jsx";
import ProductDetailPage from "./homepage/pages/ProductDetailPage.jsx";
import ProductDetailContainer from "./homepage/components/ProductDetailContainer.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginLayout />,
    children: [
      {
        path: "buyer",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "/redirect",
    element: <RedirectPage />,
  },
  {
    path: "/upload",
    element: <UploadPage />,
  },
  // {
  //     path:'/review',
  //     element: <ReviewPage/>,
  // },
  {
    path: "/buyer",
    element: <BuyerLayout></BuyerLayout>,
    children: [
      {
        path: "info",
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
  {
    path: "/product",
    element: <ProductLayout></ProductLayout>,
    children: [
      {
        path: ":id",
        element: <ProductDetailPage></ProductDetailPage>,
      },
      {
        path: "",
        element: <ProductPage></ProductPage>,
      },
    ],
  },
  {
    path: "/buyer-order",
    element: <BuyerOrderListPage />,
  },
  {
    path: "/product-create",
    element: <ProductCreateContainer></ProductCreateContainer>,
  },
  {
    path: "/product-update",
    element: <ProductUpdateContainer></ProductUpdateContainer>,
    children: [
      {
        path: ":id",
        element: <ProductUpdateForm></ProductUpdateForm>,
      },
    ],
  },
  {
    path: "/product-list",
    element: <ProductListContainer></ProductListContainer>,
  },
  {
    path: "/seller-info",
    element: <SellerContainer></SellerContainer>,
  },
  {
    path: "/login/seller",
    element: <SellerLoginPage></SellerLoginPage>,
  },
  {
    path: "/orderDetails",
    element: <BuyerOrderListPage></BuyerOrderListPage>,
  },
]);
