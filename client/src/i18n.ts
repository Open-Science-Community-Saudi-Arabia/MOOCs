import { i18n } from "@lingui/core";
import { en, ar} from "make-plural/plurals";
import { Locale } from "./types";

export const locales = {
  en: "English",
  ar: "Arabic",
};
export const defaultLocale = "en";


export async function dynamicActivate(locale:Locale) {
  i18n.loadLocaleData({
    en: { plurals: en },
    ar: { plurals: ar },
  });
  
  const { messages } = await import(`./locales/${locale}/messages.ts`);
  i18n.load(locale, messages);
  i18n.activate(locale);
}


