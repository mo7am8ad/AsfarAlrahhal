import React from "react";
import { useTranslation } from "react-i18next";
import "../Css/TermsOfUse.css";


const TermsOfUse = () => {
  const {t,i18n} = useTranslation();

  return (
    <div className="TermsOfUseContianer">
      <div className="TermsOfUseIntroContianer">
        <h1 className="">{t('TermOfUseHeader')}</h1>
        <p>{t('TermOfUseIntro')}</p>
      </div>
      <hr/>
      <section>
        <h2 className="">1. {t('TermOfUseFirstSectionHeader')} </h2>
        <li>{t('TermOfUseFirstSectionFirstPoint')}</li>
        <li> {t('TermOfUseFirstSectionSecondPoint')}</li>
        <li> {t('TermOfUseFirstSectionThirdPoint')}</li>
      </section>

      <section>
        <h2 className="">2. {t('TermOfUseSecondSectionHeader')}</h2>
        <li>{t('TermOfUseSecondSectionFirstPoint')}</li>
        <li>{t('TermOfUseSecondSectionSecondPoint')}</li>
        <li>{t('TermOfUseSecondSectionThirdPoint')}</li>
        <li>{t('TermOfUseSecondSectionForthPoint')}</li>
      </section>

      <section>
        <h2 className="">3. {t('TermOfUseThirdSectionHeader')}</h2>
        <li>{t('TermOfUseThirdSectionFirstPoint')}</li>
        <li>{t('TermOfUseThirdSectionSecondPoint')}</li>
        <li>{t('TermOfUseThirdSectionThirdPoint')}</li>
      </section>

      <section>
        <h2 className="">{t('TermOfUseContactUsSectionHeader')}</h2>
        <li>{t('TermOfUseContactUsSectionIntro')}</li>
        <li>{t('TermOfUseContactUsSectionEmail')} <a href="mailto:info@asfaralrahal.com" className="asfaralrahal.com">info@asfaralrahal.com</a></li>
        <li>{t('TermOfUseContactUsSectionPhone')} <a> 00966920031549 </a></li>
        <p>{t('TermsOfUSeContactUsApprove')}</p>
        <hr/>
        <h3>{t('TermOfUseOutro')}</h3>
      </section>
    </div>
  );
};

export default TermsOfUse;
