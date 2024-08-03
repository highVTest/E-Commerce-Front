import {createBrowserRouter} from "react-router-dom";
import RootLayout from "./loginandreview/pages/RootLayout.jsx";
import LoginLayout from "./buyer/pages/layout/LoginLayout.jsx";
import LoginPage from "./buyer/pages/BuyerLoginPage.jsx";
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
    // {
    //     path:'/review',
    //     element: <ReviewPage/>,
    // },
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
  {
    path: "/product",
    element: <ProductLayout></ProductLayout>,
    children: [
      {
        path: ":id",
        element: <ProductOnePage></ProductOnePage>,
      },
      {
        path: "",
        element: <ProductPage></ProductPage>,
      },
    ],
  },
  {
    path:"/product-create",
    element:<ProductCreateContainer></ProductCreateContainer>
  },
  {
    path:"/product-update",
    element:<ProductUpdateContainer></ProductUpdateContainer>,
    children:[
      {
        path:":id",
        element:<ProductUpdateForm></ProductUpdateForm>
      }
    ]
  },
  {
    path:"/product-list",
    element:<ProductListContainer></ProductListContainer>
  },
  {
    path:"/seller-info",
    element:<SellerContainer></SellerContainer>
  }
]);

