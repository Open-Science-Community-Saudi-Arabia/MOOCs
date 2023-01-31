import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ns1 from './locales/en/translations.json';
import ns2 from './locales/es/translations.json';

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  lng: 'en',
  resources: {
    en: {
      translations: ns1
    },
    es: {
      translations: ns2
    }
  },
  ns: ['translations'],
  defaultNS: 'translations'
});

i18n.languages = ['en', 'es'];

export default i18n;