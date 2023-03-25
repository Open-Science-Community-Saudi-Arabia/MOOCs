import { createContext, ReactNode, useState } from "react";
import { Locale, LocaleContextType } from "./types";

const LocaleContext = createContext<LocaleContextType | null>(null);

const LocalProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [locale, setLocale] = useState<Locale>("en");
  window.localStorage.setItem('language', locale);
  return (
    <LocaleContext.Provider value={{ locale: locale, changeLocale: setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
};
export { LocalProvider, LocaleContext };
