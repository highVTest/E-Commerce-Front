import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router-dom"
import {router} from "./router.jsx"

import "@mantine/core/styles.css"
import "./index.css"
import {MantineProvider} from "@mantine/core";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <MantineProvider>
    <RouterProvider router={router} />
      </MantineProvider>
  </React.StrictMode>
);
