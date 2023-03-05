import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { defaultLocale, dynamicActivate } from "./i18n";

const googleID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const I18nApp = () => {
  useEffect(() => {
    dynamicActivate(defaultLocale);
  }, []);
  return (
    <React.StrictMode>
      <BrowserRouter>
        <GoogleOAuthProvider clientId={googleID}>
          <I18nProvider i18n={i18n}>
            <App />
          </I18nProvider>
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
