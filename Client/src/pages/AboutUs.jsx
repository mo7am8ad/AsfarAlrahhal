import React from "react";
import { useTranslation } from 'react-i18next';
import ServiceCard from "../components/ServiceCard";
import ReviewCard from "../components/Review";
import HotelIcon from '../assets/HotelIcon.svg';
import CarIcon from '../assets/CarIcon.svg';
import FlightlIcon from '../assets/FlightIcon.svg';
import WhoAreWeImage from '../assets/WhoAreWe.jpeg';
import WhyUs from '../assets/WhiteIconForAboutUs.png';
import Stars from '../assets/Stars.svg';
import ReviewerImage1 from '../assets/Reviewers/ReviewerImage.svg';
import ReviewerImage2 from '../assets/Reviewers/GirlReviewerImage.svg';
import ReviewerImage3 from '../assets/Reviewers/BoyReviewerImage1.svg';
import ReviewerImage4 from '../assets/Reviewers/reviewerwoman2.svg';
import ReviewerImage5 from '../assets/Reviewers/ReviewerBoy2.svg';
import ReviewerImage6 from '../assets/Reviewers/RevieweMan2.svg';
import '../Css/AboutUs.css';

const AboutUS = ()=>{
  const {t, i18n} = useTranslation();

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

  return(
    <>
      <section className="WhoAreWeSection">
        <div className="WhoAreWeContainer">
          <div className="WhoAreWeLeftPartContainer">
            <div className="WhoAreWeLeftPartContainerHeader"><h1>{t('AboutUsPageAboutUsSectionHeader')}</h1></div>
            <div className="WhoAreWeLeftPartContainerparagraph"><p>{t('AboutUsPageAboutUsSectionPargraph')}</p></div>
            <div className="WhoAreWeLeftPartContainerButton">
              <button onClick={handleWhatsAppChat} className="LightButton ">
                {t('AboutUsPageAboutUsSectionButton')}
              </button>
            </div>
          </div>

          <div className="WhoAreWeRightPartContainer">
            <div className="WhoAreWeRightPartImageContainer"><img src={WhoAreWeImage}/></div>
          </div>
        </div>
      </section>

      <section className="WhyUsSection">
        <div className="WhyUsContainer">
          <div className="WhoAreWeRightPartContainer">
            <div className="WhoAreWeRightPartImageContainer"><img src={WhyUs}/></div>
          </div>

          <div className="WhoAreWeLeftPartContainer">
            <div className="WhoAreWeLeftPartContainerHeader"><h1>{t('AboutUsPageWhyUsSectionHeader')}</h1></div>
            <div className="WhoAreWeLeftPartContainerparagraph"><p>{t('AboutUsPageWhyUsSectionPargraph')}</p></div>
            <div className="WhoAreWeLeftPartContainerButton">
              <button onClick={handleWhatsAppChat} className="LightButton ">
                {t('AboutUsPageWhyUsSectionButton')}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="OurServicesSection">
        <div className="OurServicesContainer">
          <div className="OurServicesHeaderContainer">
            <h1>{t('AboutUsPageOurServiceSectionHeader')}</h1>
          </div>

          <div className="OurServicesCardContainer">
            <ServiceCard
              Icon={HotelIcon}
              ServiceName={t('AboutUsPageOurServiceHotelsCardHeader')}
              ServiceDetails={t('AboutUsPageOurServiceHotelsCardPargraph')}
              ButtonText={t('AboutUsPageOurServiceHotelsCardButton')}
              url="/"
            />

            <ServiceCard
              Icon={FlightlIcon}
              ServiceName={t('AboutUsPageOurServiceFlightsCardHeader')}
              ServiceDetails={t('AboutUsPageOurServiceFlightsCardPargraph')}
              ButtonText={t('AboutUsPageOurServiceFlightsCardButton')}
              url="/flights"
            />

            <ServiceCard
              Icon={CarIcon}
              ServiceName={t('AboutUsPageOurServiceTransportationsCardHeader')}
              ServiceDetails={t('AboutUsPageOurServiceTransportationsCardPargraph')}
              ButtonText={t('AboutUsPageOurServiceTransportationsCardButton')}
              url="/transportations"
            />
          </div>
        </div>
      </section>

      <section className="ReviewsSection">
        <div className="ReviewsContainer">
          <div className="ReviewsHeaderContainer">
            <h1>{t('AboutUsPageReviewsSectionHeader')}</h1>
          </div>

          <div className="ReviewesBodyContainer">
            <div className="aaaa">
              <div className="ReviewesBodyContainerRow">
                <ReviewCard
                ReviewerImage={ReviewerImage1}
                ReviewerName={t('AboutUsPageReviewsSectionFirstCardName')}
                ReviewStars={Stars}
                ReviewText={t('AboutUsPageReviewsSectionFirstCardReview')}
                />

                <ReviewCard
                ReviewerImage={ReviewerImage2}
                ReviewerName={t('AboutUsPageReviewsSectionSecondCardName')}
                ReviewStars={Stars}
                ReviewText={t('AboutUsPageReviewsSectionSecondCardReview')}
                />
                
                <ReviewCard
                ReviewerImage={ReviewerImage3}
                ReviewerName={t('AboutUsPageReviewsSectionThirdCardName')}
                ReviewStars={Stars}
                ReviewText={t('AboutUsPageReviewsSectionThirdCardReview')}
                />
              </div>

              <div className="ReviewesBodyContainerRow">
                <ReviewCard
                ReviewerImage={ReviewerImage4}
                ReviewerName={t('AboutUsPageReviewsSectionForthCardName')}
                ReviewStars={Stars}
                ReviewText={t('AboutUsPageReviewsSectionForthCardReview')}
                />

                <ReviewCard
                ReviewerImage={ReviewerImage5}
                ReviewerName={t('AboutUsPageReviewsSectionFifthCardName')}
                ReviewStars={Stars}
                ReviewText={t('AboutUsPageReviewsSectionFifthCardReview')}
                />

                <ReviewCard
                ReviewerImage={ReviewerImage6}
                ReviewerName={t('AboutUsPageReviewsSectionSixthCardName')}
                ReviewStars={Stars}
                ReviewText={t('AboutUsPageReviewsSectionSixthCardReview')}
                />  
              </div>
            </div>
          </div>
        </div>
        
      </section>
    </>
  )
}

export default AboutUS