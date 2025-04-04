import React from "react";
import { useTranslation } from 'react-i18next';
import '../Css/Transportation.css';

const Transportations = ()=>{
  const {t,i18n} = useTranslation();

  const handleWhatsAppBookingCar = () => {
    const whatsAppMessage = ()=>{
      if(i18n.language === 'ar'){
        return `مرحبا, أريد حجز سيارة او وسيلة مواصلات أثناء رحلتي`;
      }else{
        return `Hello! I would like to rent a car from you`;
      }
    };
    const message = whatsAppMessage();
    if (navigator.userAgent.includes("Windows")) {
        window.open(`https://web.whatsapp.com/send?phone=+971506851559&text=${encodeURIComponent(message)}`, "_blank");
      } else {
        window.open(`https://wa.me/+971506851559?text=${encodeURIComponent(message)}`, "_blank");
      }
  };

  return (
    <div className="TransportationPage">
      <div className="TransportationPageContainer">
        <div className="TransportationPageUpperPartContainer">
          <div className="TransportationPageUpperPartHeaderContainer">
            <h1>
              {t('TransportationHeader')}
            </h1>
          </div>
          <div className="TransportationPageUpperPartParagraphContainer">
            <p>
              {t('TransportationPargraph')}
            </p>
          </div>
        </div>
        <div className="TransportationPageButtonContainer">
          <button onClick={handleWhatsAppBookingCar}
          >
            {t('TransportationButton')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Transportations;