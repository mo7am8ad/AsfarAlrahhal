import React from "react";
import { useTranslation } from "react-i18next";
import "../Css/TermsOfUse.css";


const PrivacyPolicy = () => {
  const {t,i18n} = useTranslation();
  return (
    <div className="TermsOfUseContianer">
      <div className="TermsOfUseIntroContianer">
        <h1 className="">{t('PrivacyPolicyHeader')}</h1>
        <p>{t('PrivacyPolicyIntro')}</p>
      </div>
      <hr/>
      <section>
        <h2 className="">1. {t('PrivacyPolicyFirstSectionHeader')} </h2>
        <li>{t('PrivacyPolicyFirstSectionFirstPoint')}</li>
        <li> {t('PrivacyPolicyFirstSectionSecondPoint')}</li>
        <li> {t('PrivacyPolicyFirstSectionThirdPoint')}</li>
      </section>

      <section>
        <h2 className="">2. {t('PrivacyPolicySecondSectionHeader')}</h2>
        <li>{t('PrivacyPolicySecondSectionFirstPoint')}</li>
        <li>{t('PrivacyPolicySecondSectionSecondPoint')}</li>
        <li>{t('PrivacyPolicySecondSectionThirdPoint')}</li>
      </section>

      <section>
        <h2 className="">3. {t('PrivacyPolicyThirdSectionHeader')}</h2>
        <li>{t('PrivacyPolicyThirdSectionFirstPoint')}</li>
        <li>{t('PrivacyPolicyThirdSectionSecondPoint')}</li>
      </section>

      <section>
        <h2 className="">{t('PrivacyPolicyContactUsSectionHeader')}</h2>
        <p>{t('PrivacyPolicyContactUsSectionIntro')}</p>
        <li>{t('PrivacyPolicyContactUsSectionEmail')} <a href="mailto:info@asfaralrahal.com" className="asfaralrahal.com">info@asfaralrahal.com</a></li>
        <li>{t('PrivacyPolicyContactUsSectionPhone')} 00966920031549</li>
        <hr/>
        <h3>{t('PrivacyPolicyOutro')}</h3>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
