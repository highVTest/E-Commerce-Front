import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom";

import SellerInfo from './sellerbackoffice/component/SellerInfoForm';

import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "./index.css";
import { ModalsProvider } from "@mantine/modals";
import ProductForm from './sellerbackoffice/component/ProductForm';
import ProductList from './sellerbackoffice/component/ProductList';
import OrderList from './sellerbackoffice/component/OrderList';
import Overview from './sellerbackoffice/component/Overview'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider>
      <ModalsProvider>
        <ProductForm/>
      </ModalsProvider>
    </MantineProvider>
  </React.StrictMode>,
)
