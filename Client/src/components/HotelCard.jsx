import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Stars from '../assets/Stars.svg';
import '../Css/HotelCard.css';

const HotelCard = ({ hotel }) => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  return (
    <Link to={`/hotels/${hotel._id}`} className="HotelCardAnchor">
      <div className="HotelCardContainer">
        <div className="HotelCardImageContainer">
          <img src={hotel.images[0]} alt={hotel.hotelName[language]} />
        </div>
        <div className="HotelCardLowerPart">
          <div className="HotelCardLowerPartNameContainer">
            <p>{hotel.hotelName[language]}</p>
          </div>
          <div className="HotelCardLowerPartInfoContainer">
            <div className="HotelCardLowerPartInfoContainerStarsHolder">
              <div className="StarsHolderTextContainer">
                <p>{t('HotelsPageHotelCardHotelStars')}</p>
              </div>
              <div className="HotelCardStarsHolderImgContainer">
                <img src={Stars} alt="Stars" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;