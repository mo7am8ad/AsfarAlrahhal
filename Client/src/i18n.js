import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './locales/en/translation.json';
import translationAR from './locales/ar/translation.json';

// Get saved language or default to Arabic
const savedLanguage = localStorage.getItem("appLanguage") || "ar";

i18n.use(initReactI18next).init({
    resources: {
        en: { translation: translationEN },
        ar: { translation: translationAR }
    },
    lng: savedLanguage, // Use saved language or Arabic
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
});

export default i18n;