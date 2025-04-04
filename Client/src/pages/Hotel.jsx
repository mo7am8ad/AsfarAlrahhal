import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Stars from '../assets/Stars.svg';
import LocationPin from '../assets/LocationPin.svg';
import '../Css/Hotel.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Hotel = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();

  // Fetch hotel details from the backend
  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/hotels/${id}`);
        if (!response.ok) throw new Error("Failed to fetch hotel");
        const data = await response.json();
        setHotel(data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading hotel data:", error);
        setLoading(false);
      }
    };
    fetchHotel();
  }, [id]);

  const handleWhatsAppBooking = () => {
    const hotelName = hotel.hotelName[i18n.language];
    const hotelLocation = hotel.location[i18n.language];
    const hotelDetailedLocation = hotel.detailed_location[i18n.language];

    const getWhatsAppMessage = () => {
      if (i18n.language === 'ar') {
        return `مرحبا, أريد حجز إقامة في فندق ${hotelName} الواقع في ${hotelLocation} ${hotelDetailedLocation}`;
      } else {
        return `Hello, I would like to book a stay at: ${hotelName} located in: ${hotelLocation} ${hotelDetailedLocation}`;
      }
    };

    const message = getWhatsAppMessage();
    const encodedMessage = encodeURIComponent(message);

    if (navigator.userAgent.includes("Windows")) {
      window.open(`https://web.whatsapp.com/send?phone=+971506851559&text=${encodedMessage}`, "_blank");
    } else {
      window.open(`https://wa.me/+971506851559?text=${encodedMessage}`, "_blank");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!hotel) {
    return <p>Hotel not found.</p>;
  }

  const language = i18n.language;

  return (
    <div className="SingleHotelPage">
      <div className="SingleHotelPageContainer">
        <div className="SingleHotelImageContainer">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={10}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation
          >
            {hotel.images.map((image, index) => (
              <SwiperSlide key={index}>
                <img src={image} alt={`Hotel ${index + 1}`} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="SingleHotelInfoContainer">
          <div className="SingleHotelInfoContainerUpperPart">
            <div className="SingleHotelInfoContainerUpperPartHeaderSection">
              <div className="SingleHotelInfoContainerUpperPartHotelNameContainer">
                <h1>{hotel.hotelName[language]}</h1> {/* Display localized hotel name */}
              </div>
              <div className="SingleHotelInfoContainerUpperPartHotelRateContainer">
                <div>
                  <p>{t('SingleHotelPageRateTag')}</p>
                  <img src={Stars} alt="Stars" />
                </div>
              </div>
              <div className="SingleHotelInfoContainerUpperPartHotelLocationContainer">
                <img src={LocationPin} alt="Location Pin" />
                <div>
                  <p>{hotel.location[language] + ":   " + hotel.detailed_location[language]}</p> {/* Display localized location */}
                </div>
              </div>
            </div>
            <div className="SingleHotelInfoContainerUpperPartBody">
              <p>{hotel.description[language]}</p> {/* Display localized description */}
            </div>
          </div>
          <div className="SingleHotelInfoContainerLowerPart" onClick={handleWhatsAppBooking}>
            <button>{t('SingleHotelPageButtonTag')}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotel;