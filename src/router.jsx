import { createBrowserRouter } from "react-router-dom";
import LoginLayout from "./loginandreview/pages/LoginLayout.jsx";
import LoginPage from "./loginandreview/pages/LoginPage.jsx";
import RootLayout from "./loginandreview/pages/RootLayout.jsx";
import RedirectPage from "./loginandreview/pages/RedirectPage.jsx";
import RegisterPage from "./loginandreview/pages/RegisterPage.jsx";
import UploadPage from "./loginandreview/pages/UploadPage.jsx";
import BuyerCartPage from "./buyer/pages/BuyerCartPage.jsx";
import BuyerFavoritePage from "./buyer/pages/BuyerFavoritePage.jsx";
import BuyerInfoPage from "./buyer/pages/BuyerInfoPage.jsx";
import BuyerLayout from "./buyer/pages/layout/BuyerLayout.jsx";
import ProductLayout from "./buyer/pages/layout/ProductLayout.jsx";
import SellerLoginPage from "./buyer/pages/SellerLoginPage.jsx";
import CouponPage from "./coupon/pages/CouponPage.jsx";
import HomePage from "./homepage/pages/HomePage.jsx";
import ProductDetailPage from "./homepage/pages/ProductDetailPage.jsx";
import BuyerOrderListPage from "./payment/pages/BuyerOrderListPage.jsx";
import ProductCreateContainer from "./sellerbackoffice/component/ProductCreateContainer.jsx";
import ProductListContainer from "./sellerbackoffice/component/ProductListContainer.jsx";
import ProductUpdateContainer from "./sellerbackoffice/component/ProductUpdateContainer.jsx";
import ProductUpdateForm from "./sellerbackoffice/component/ProductUpdateForm.jsx";
import SellerContainer from "./sellerbackoffice/component/SellerContainer.jsx";
import SearchPage from "./homepage/pages/SearchPage.jsx";
import SellerRegisterPage from "./loginandreview/pages/SellerRegisterPage.jsx";
import MyCouponPage from "./coupon/pages/MyCouponPage.jsx";
import MyReviewPage from "./loginandreview/pages/MyReviewPage.jsx";
import AdminPage from "./admin/Pages/AdminPage.jsx";
import StatisticPages from "./sellerbackoffice/Pages/StatisticsPages.jsx";
import ShopCreateContainer from "./sellerbackoffice/component/ShopCreateContainer.jsx";
import OrderStatusPage from "./sellerbackoffice/Pages/OrderStatusPage.jsx";
import OrderListPage from "./sellerbackoffice/Pages/OrderListPage.jsx";
import BuyerShopInfo from "./buyer/pages/BuyerShopInfo.jsx";
import AdminLoginPage from "./admin/Pages/AdminLoginPage.jsx";
import BlackListPage from "./admin/Pages/BlackListPage.jsx";
import * as path from "node:path";
import AdminValidSellerContainer from "./admin/Pages/AdminValidSellerContainer.jsx";

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
        children: [
          {
            path: "shop",
            element: <BuyerShopInfo />,
          },
        ],
      },
      {
        path: ":keyword",
        children: [
          {
            path: ":orderby",
            element: <SearchPage></SearchPage>,
          },
        ],
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
    path: "/register/seller",
    element: <SellerRegisterPage></SellerRegisterPage>,
  },
  {
    path: "/seller/shop",
    element: <ShopCreateContainer></ShopCreateContainer>,
  },
  {
    path: "/orderDetails",
    element: <BuyerOrderListPage></BuyerOrderListPage>,
  },
  {
    path: "/seller/coupon",
    element: <CouponPage></CouponPage>,
  },
  {
    path: "/buyer/coupon-list",
    element: <MyCouponPage></MyCouponPage>,
  },
  {
    path: "/buyer/review-list",
    element: <MyReviewPage></MyReviewPage>,
  },
  {
    path: "/admin-info",
    element: <AdminPage></AdminPage>,
  },
  {
    path: "/seller-statistic",
    element: <StatisticPages />,
  },
  {
    path: "/seller/order-status",
    element: <OrderStatusPage />,
  },
  {
    path: "/seller/order-list",
    element: <OrderListPage />,
  },
  {
    path: "/login/admin",
    element: <AdminLoginPage />,
  },
  {
    path: "/admin/black-list",
    element: <BlackListPage />,
  },
  {
    path: "/admin/seller-accept",
    element: <AdminPage />,
  },
  {
    path: "/admin/seller-accept/:id",
    element: <AdminValidSellerContainer />,
  },
]);
