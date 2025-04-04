import React from "react";
import { useTranslation } from 'react-i18next';
import Hotels from "./Hotels";
import '../Css/HomePage.css';
import LandigSectionImage from '../assets/NewBG.png';

function Homepage() {
  const {t,i18n} = useTranslation();

  const whatsAppMessage = ()=>{
    if (i18n.language === 'ar') {
      return `السلام عليكم , أريد أن اخطط رحلتي بأكملها مع شركة أسفار الرحال.`;
    } else {
      return `Hello! I need your help with planning my visit`;
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
    <div className="HomePageContainer">
      <section className="LandingPage">
        <div className="LandingPageContainer">
          <div className="LandingPageContainerContentPartContainer">
            <div className="LandingPageCOntentPartHeaderContainer">
              <h1>
                {t('LandingPageHeader')} <span>{t('LandingPageHeaderSpan1')}</span>  
                {t('LandingPageHeader2')} <span>{t('LandingPageHeaderSpan2')}</span>  
                {t('LandingPageHeader3')}
              </h1>
            </div>

            <div className="LandingPageCOntentPartParagraphContainer">
              <p>{t('LandingPagePargraph')}</p>
            </div>
            <div className="LandingPageContainerButtonContainer">
              <button onClick={handleWhatsAppChat}
                      className="DarkButton"
              >
                {t('LandingPagButton')}
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <section className="HotelsSection">
        <Hotels/>
      </section>
    </div>
  )
}

export default Homepage;