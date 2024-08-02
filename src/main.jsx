import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom";

import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "./index.css";
import { ModalsProvider } from "@mantine/modals";

import ProductForm from './sellerbackoffice/component/ProductForm';
import ProductList from './sellerbackoffice/component/ProductList';
import OrderList from './sellerbackoffice/component/OrderList';
import Overview from './sellerbackoffice/component/Overview'
import SellerInfoForm from './sellerbackoffice/component/SellerInfoForm';
import SellerContainer from './sellerbackoffice/component/SellerContainer';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider>
      <ModalsProvider>
        <SellerContainer/>
      </ModalsProvider>
    </MantineProvider>
  </React.StrictMode>,
)
