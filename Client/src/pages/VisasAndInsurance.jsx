import React from "react";
import { useTranslation } from "react-i18next";
import '../Css/VisasAndInsurance.css';
import VisaImg from '../assets/VisaImage.png';
import InscuranceImg from '../assets/TravelInsurance1.png';
import SchenginVisaImg from '../assets/SchingenVisaImg.png';
import TurkeyVisaImg from '../assets/TurkeyVisaImg.png';
import UKVisaImg from '../assets/UKVisaImg.png';
import UAEVisaImg from '../assets/UAEVisaImg.png';
import AzarbijanImg from '../assets/azarbaijan.jpg';
import IndonesiaVisaImg from '../assets/IndonesiaVisaImg.png';

const VisasAndInsurance = () => {
  const { t, i18n } = useTranslation();

  const handleVisaWhatsApp = (visaType) => {
    const getWhatsAppMessage = () => {
      if (i18n.language === 'ar') {
        return `أرغب في التقديم على ${visaType} - يرجى التواصل معي لإكمال الإجراءات`;
      } else {
        return `I want to apply for ${visaType} - please contact me to complete the procedures`;
      }
    };

    sendWhatsAppMessage(getWhatsAppMessage());
  };

  const handleInsuranceWhatsApp = () => {
    const getWhatsAppMessage = () => {
      if (i18n.language === 'ar') {
        return `أحتاج إلى المساعدة في الحصول على تأمين السفر - يرجى إرسال التفاصيل`;
      } else {
        return `I need help getting travel insurance - please send me the details`;
      }
    };

    sendWhatsAppMessage(getWhatsAppMessage());
  };

  const sendWhatsAppMessage = (message) => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = navigator.userAgent.includes("Windows")
      ? `https://web.whatsapp.com/send?phone=+971506851559&text=${encodedMessage}`
      : `https://wa.me/+971506851559?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  // Visa card data array
  const visaCards = [
    { type: 'Schengen', image: SchenginVisaImg, className: 'OddVisaCard' },
    { type: 'Turkey', image: TurkeyVisaImg, className: 'EvenVisaCard' },
    { type: 'UK', image: UKVisaImg, className: 'OddVisaCard' },
    { type: 'UAE', image: UAEVisaImg, className: 'EvenVisaCard' },
    { type: 'Indonesia', image: IndonesiaVisaImg, className: 'OddVisaCard' },
    { type: 'Azarbigan', image: AzarbijanImg, className: 'EvenVisaCard' }
  ];

  return (
    <div className="VisasAndInsurancePageContainer">
      {/* Visa Section (unchanged structure) */}
      <div className="VisasContainer">
        <div className="VisasContainerIntroSection">
          <div className="VisasContainerIntroSectionTextContainer">
            <h1>{t('VisasAndInsuranceVisasHeader')}</h1>
            <p>{t('VisasAndInsuranceVisasParagraph')}</p>
          </div>
          <div className="VisasContainerIntroSectionImgContainer">
            <img src={VisaImg} alt="Visa"/>
          </div>
        </div>
        <div className="VisaCardsContainer">
          <div className="VisaCardsHeaderContinaer">
            <h1>{t('VisasAndInsuranceCooseVisaHeader')}</h1>
          </div>
          {/* First line of visa cards */}
          <div className="CardsFirstLineContainer">
            {visaCards.slice(0, 3).map((card, index) => (
              <div key={index} onClick={() => handleVisaWhatsApp(t(`VisasAndInsurance${card.type}VisaCard`))}>
                <div className={`VisaCard ${card.className}`}>
                  <div className="VisaCardFirstLine">
                    <p>{t(`VisasAndInsurance${card.type}VisaCard`)}</p>
                    <div><img src={card.image} alt={`${card.type} Visa`}/></div>
                  </div>
                  <p>{t('VisasAndInsuranceVisaCardApplyNowButton')}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Second line of visa cards */}
          <div className="CardsSecondLineContainer">
            {visaCards.slice(3).map((card, index) => (
              <div key={index + 3} onClick={() => handleVisaWhatsApp(t(`VisasAndInsurance${card.type}VisaCard`))}>
                <div className={`VisaCard ${card.className}`}>
                  <div className="VisaCardFirstLine">
                    <p>{t(`VisasAndInsurance${card.type}VisaCard`)}</p>
                    <div><img src={card.image} alt={`${card.type} Visa`}/></div>
                  </div>
                  <p>{t('VisasAndInsuranceVisaCardApplyNowButton')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Insurance Section with dedicated WhatsApp handler */}
      <div className="InsuranceContainer">
        <div className="InsuranceContainerIntroSectionTextContainer">
          <h1>{t('VisasAndInsuranceInsuranceHeader')}</h1>
          <p>{t('VisasAndInsuranceInsuranceParagraph')}</p>
          <button onClick={handleInsuranceWhatsApp}>
            {t('VisasAndInsuranceInsuranceApplyNowButton')}
          </button>
        </div>
        <div className="InsuranceContainerIntroSectionImgContainer">
          <img src={InscuranceImg} alt="Travel Insurance"/>
        </div>
      </div>
    </div>
  );
};

export default VisasAndInsurance;