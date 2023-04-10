import { i18n } from "@lingui/core";
import { en, ar } from "make-plural/plurals";
import { Locale } from "./types";

/**
 * @category Frontend
 * @subcategory Component
 * @module Translation
 * @description Translate content to selected language.
 */

/**
 * @description language options.
 */
export const locales = {
  en: "English",
  ar: "Arabic",
};

/**
 * @description load language selection data
 * @param  {string} locale
 */

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
    document.body.classList.add("rtl");
  } else {
    document.documentElement.lang = locale;
    document.documentElement.dir = "ltr";
    document.body.style.cssText = `fontFamily:  "'Plus Jakarta Sans', sans-serif";`;
    document.body.classList.remove("rtl");
  }
  i18n.load(locale, messages);
  i18n.activate(locale);
}
