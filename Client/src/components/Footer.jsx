import React from "react";
import { useTranslation } from "react-i18next";
import AsfarLogo from '../assets/AsfarLogo.svg';
import MailIcon from '../assets/MailIcon.svg';
import WhatsAppIcon from '../assets/WhatsappIcon.svg';
import InstaIcon from '../assets/InstaIcon.svg';
import TwitterIcon from '../assets/TwitterIcon.svg';
import TiktokIcon from '../assets/tiktokIcon.svg';
import PhoneIcon from '../assets/PhoneIcon.svg'
import '../Css/Footer.css';
import privacyAr from '../pdfs/privacy-ar.pdf'
import privacyEn from '../pdfs/privacy-en.pdf';
import termsAr from '../pdfs/terms-ar.pdf'
import termsEn from '../pdfs/terms-en.pdf';


const Footer = ()=> {
  const {t,i18n} = useTranslation()
  const currentLanguage = i18n.language;

  const privacyPolicyPDF = currentLanguage === "ar" ? privacyAr : privacyEn;
  const termsPDF = currentLanguage === "ar" ? termsAr : termsEn;
  
  const handleWhatsAppChat = () => {
    const whatsAppMessgae = () => {
      if(i18n.language === 'ar'){
        return `مرحبا, أريد أن اخطط رحلتي بأكملها مع شركتكم أسفار الرحال.`;;
      }else{
        return `Hello! I need your help with planning my visit`;
      }
    };
    const message = whatsAppMessgae();
    if (navigator.userAgent.includes("Windows")) {
        window.open(`https://web.whatsapp.com/send?phone=+971506851559&text=${encodeURIComponent(message)}`, "_blank");
      } else {
        window.open(`https://wa.me/+971506851559?text=${encodeURIComponent(message)}`, "_blank");
      }
  };

  return(
    <div className="Footer">
      <div className="FooterContainer">
        <div className="LogoDevelopedContainer">
          <div className="FooterCompanyContainer">
            <div className="FooterCompanyImageContainer"><button className="IconButton"><img src={AsfarLogo}/></button></div>
            <div className="FooterCompanyNameContainer">
              <h1>{t('FooterCompanyName')}</h1>
            </div>
          </div>
          <div className="DevelopedBy">
            <p>{t('DevelopedBy')}</p>
            <a href={'https://nourawshar.com/'} target="_blank" rel="noopener noreferrer">Nour Awshar</a>
          </div>
        </div>

        <div className="FooterLocationContainer">
          <div className="FooterLocationTextContainer">
            <div className="FooterLocationtextContainerSubjectPart"><p>{t('FooterLocation')}</p></div>
            <div className="FooterLocationtextContainerAdressPart"><p>{t('FooterLocationDetails')}</p></div>
          </div>
          <div className="FooterTermsAndPrivacyContianer">
          <a href={"/terms&conditions"}>
            <p>
              {t('TermsOfUsage')}  
            </p>
          </a>

          <a href={"/privacy-policy"}>
            <p>
              {t('PrivacyPolicy')}  
            </p>
          </a>
        </div>
        </div>

        <div className="FooterMailContainer">
            <div className="FooterMailContainerIconContainer"><button className="IconButton FotterMailIcon"><img src={MailIcon}/></button></div>
            <div className="FooterMailContainerTextContainer">
              <p>{t('FooterEmail')}</p>
            </div>
        </div>
        <div className="FooterPhoneContainer">
            <div className="FooterPhoneContainerIconContainer"><button className="IconButton FotterPhoneIcon"><img src={PhoneIcon}/></button></div>
            <div className="FooterPhoneContainerTextContainer">
              <p>+966 92 003 1549</p>
              <p>+996 57 407 1975</p>
              <p>+966 50 699 2055</p>
            </div>
        </div>

        <div className="FooterSocialMediaContainerOuter">
          <div className="FooterSocialMediaContainerInner">
            <div className="FooterSocialMediaContainerInnerHeaderPart"><p>{t('FooterFollowUs')}</p></div>
            <div className="FooterSocialMediaContainerInnerIconsPart">
              <div><button onClick={handleWhatsAppChat} className="IconButton FooterSocialIcon"><img src={WhatsAppIcon}/></button></div>
              <div>
                <a href="https://www.instagram.com/alrahhal_gulf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="IconButton FooterSocialIcon"
                  >
                  <button className="IconButton FooterSocialIcon">
                    <img src={InstaIcon}/>
                  </button>
                </a>
              </div>
              <div>
                <a href="https://x.com/alrahhal_gulf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="IconButton FooterSocialIcon"
                  >
                  <button className="IconButton FooterSocialIcon">
                    <img src={TwitterIcon}/>
                  </button>
                </a>
              </div>
              <div>
                <a 
                  href="https://www.tiktok.com/@alrahhal_gulf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="IconButton FooterSocialIcon"
                >
                  <button className="IconButton FooterSocialIcon">
                    <img src={TiktokIcon}/>
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer;