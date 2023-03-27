import { i18n } from "@lingui/core";
import { en, ar } from "make-plural/plurals";
import { Locale } from "./types";

export const locales = {
  en: "English",
  ar: "Arabic",
};

export async function dynamicActivate(locale: Locale) {
  // let x = document.querySelectorAll(".aligned");
  let x = document.getElementsByClassName(
    "aligned"
  ) as HTMLCollectionOf<HTMLElement>;

  i18n.loadLocaleData({
    en: { plurals: en },
    ar: { plurals: ar },
  });

  const { messages } = await import(`./locales/${locale}/messages.ts`);
  if (locale === "ar") {
    document.documentElement.dir = "rtl";
    document.documentElement.lang = locale;
    document.body.style.cssText = `fontFamily: "'IBM Plex Sans Arabic', sans-serif"`;

    // if (x != null) {
    //   console.log(typeof(x));
    //   for (var i = 0; i < x.length; i++) {
    // x[i].classList.replace("aligned", "right-aligned");
    //   }
    //   console.log(x);
    //   // x.classList.replace("aligned ", "right-aligned")
    // }
    // [...x].forEach((el) => {
    //   el.style.backgroundColor = "red";
    //   // console.log(x);
    //   return x;
    // });
    
  } else {
    document.documentElement.lang = locale;
    document.documentElement.dir = "ltr";
    document.body.style.cssText = `fontFamily:  "'Plus Jakarta Sans', sans-serif";`;
  }
  i18n.load(locale, messages);
  i18n.activate(locale);
}
