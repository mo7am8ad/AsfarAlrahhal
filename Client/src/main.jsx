import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import i18n from 'i18next';
import App from './App.jsx'
import './index.css'
import './i18n';

const applyLanguageClass = () => {
  if (i18n.language === 'ar') {
      document.body.classList.add('arabic');
  } else {
      document.body.classList.remove('arabic');
  }
};
i18n.on('languageChanged', applyLanguageClass);
applyLanguageClass();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
