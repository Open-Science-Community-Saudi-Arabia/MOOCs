import { i18n } from "@lingui/core";
import { en, ar} from "make-plural/plurals";

export const locales = {
  en: "English",
  ar: "Arabic",
};
export const defaultLocale = "en";

i18n.loadLocaleData({
  en: { plurals: en },
  ar: { plurals: ar },
});

// We have to load and activate the default locale before dynamic loading
i18n.load(defaultLocale, {});
i18n.activate(defaultLocale);

export async function dynamicActivate(locale: string) {
  const { messages } = await import(`./locales/${locale}/messages.ts`);
  i18n.load(locale, messages);
  i18n.activate(locale);
}
