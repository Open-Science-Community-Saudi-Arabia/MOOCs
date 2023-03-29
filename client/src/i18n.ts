import { i18n } from "@lingui/core";
import { en, ar } from "make-plural/plurals";
import { Locale } from "./types";

export const locales = {
  en: "English",
  ar: "Arabic",
};

export async function dynamicActivate(locale: Locale) {


  i18n.loadLocaleData({
    en: { plurals: en },
    ar: { plurals: ar },
  });

  const { messages } = await import(`./locales/${locale}/messages.ts`);
  if (locale === "ar") {
    document.documentElement.dir = "rtl";
    document.documentElement.lang = locale;
    document.body.style.cssText = `fontFamily: "'IBM Plex Sans Arabic', sans-serif"`;

    // document.body.href
    
  } else {
    document.documentElement.lang = locale;
    document.documentElement.dir = "ltr";
    document.body.style.cssText = `fontFamily:  "'Plus Jakarta Sans', sans-serif";`;
  }
  i18n.load(locale, messages);
  i18n.activate(locale);
}
