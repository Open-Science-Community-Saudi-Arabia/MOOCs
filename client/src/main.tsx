import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { dynamicActivate } from "./i18n";

const googleID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const I18nApp = () => {
  useEffect(() => {
    const item: string | any = window.localStorage.getItem("language");
    if (!item) {
      window.localStorage.setItem("language", "en");
      dynamicActivate("en");
    } else {
      dynamicActivate(item);
    }
  },[]);

  return (
    <React.StrictMode>
      <BrowserRouter>
        <GoogleOAuthProvider clientId={googleID}>
          {/* <LocalProvider> */}
          <I18nProvider i18n={i18n}>
            <App />
          </I18nProvider>
          {/* </LocalProvider> */}
        </GoogleOAuthProvider>
      </BrowserRouter>
      <ToastContainer />
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<I18nApp />);
