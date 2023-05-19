import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Layout from "./components/Layout.tsx";
import Router from "./routes/Router.tsx";
import {BrowserRouter} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "./services/axios.ts";
import AuthProvider from "./providers/AuthProvider.tsx";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"/>
      <BrowserRouter>
          <AuthProvider>
              <Layout>
                  <Router />
              </Layout>
          </AuthProvider>
      </BrowserRouter>
  </React.StrictMode>,
)
