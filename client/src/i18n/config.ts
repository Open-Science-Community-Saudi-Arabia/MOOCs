import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import backend from "i18next-http-backend";

i18n
  .use(initReactI18next)
  .use(backend)
  .init({
    fallbackLng: "en",
    lng: "en",
    backend: { loadPath: "/src/i18n/locales/{{lng}}.json" },
    interpolation: { escapeValue: false },
    debug: true,
  });

export default i18n;
