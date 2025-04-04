import React from 'react';
import WhatsAppIcon from '../assets/WhatsappIcon.svg'; // Replace with your actual path
import '../Css/WhatsAppFloatingButton.css'; // Import CSS for styling
import { useTranslation } from 'react-i18next';

const WhatsAppFloatingButton = () => {
  const {i18n} = useTranslation();
  const whatsAppMessage = ()=>{
    if (i18n.language === 'ar') {
      return `مرحبا, أريد أن اخطط رحلتي بأكملها مع شركتكم أسفار الرحال.`;
    } else {
      return `Hello! I need your help with planning my visit`;;
    }
  }
  const handleWhatsAppChat = () => {
    const message = whatsAppMessage();
    if (navigator.userAgent.includes("Windows")) {
        window.open(`https://web.whatsapp.com/send?phone=+971506851559&text=${encodeURIComponent(message)}`, "_blank");
      } else {
        window.open(`https://wa.me/+971506851559?text=${encodeURIComponent(message)}`, "_blank");
      }
  };

  return (
    <button onClick={handleWhatsAppChat} className="whatsapp-button">
      <img src={WhatsAppIcon} alt="WhatsApp" />
    </button>
  );
};

export default WhatsAppFloatingButton;
