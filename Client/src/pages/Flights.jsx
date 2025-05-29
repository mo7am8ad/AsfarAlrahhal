import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import DropdownIcon from "../assets/dropdownIcon.svg";
import "../Css/Flights.css";
import FlightsImage from "../assets/FlightsImage1.png";
import SaudiFLag from "../assets/SaudiFlag.png";
import UAEFlag from "../assets/UAEVisaImg.png";
import UKFlag from "../assets/UKVisaImg.png";
import TurkeyFlag from "../assets/TurkeyVisaImg.png";
import IndonesiaFlag from "../assets/IndonesiaVisaImg.png";
import GermanyFlag from "../assets/GermanyFlag.png";
import EgyptFlag from "../assets/EgyptFlag.png";
import AzarbijanFlag from "../assets/azarbaijan.jpg";
import GeorgiaFlag from "../assets/GeorgeaFlag.png";

const Flights = () => {
  const { t, i18n } = useTranslation();
  const [tripType, setTripType] = useState("One Way");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");

  const currentLanguageDirection = i18n.dir();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelection = (type) => {
    setTripType(type);
    setIsDropdownOpen(false);
  };

  // Generate WhatsApp link
  const handleWhatsAppBooking = () => {
    const whatsAppMessage = () => {
      if (i18n.language === "ar") {
        return `مرحبا أود حجز تذكرة طيران \n\n- ${t(
          tripType
        )} من مدينة: ${origin}\n\n- إلى:  ${destination}\n\n- بتاريخ:${date} .:`;
      } else {
        return `Hello! I would like to book a flight:\n\n- Type: ${t(
          tripType
        )}\n- From: ${origin}\n- To: ${destination}\n- Date: ${date}`;
      }
    };
    const message = whatsAppMessage();
    if (navigator.userAgent.includes("Windows")) {
      window.open(
        `https://web.whatsapp.com/send?phone=+971506851559&text=${encodeURIComponent(
          message
        )}`,
        "_blank"
      );
    } else {
      window.open(
        `https://wa.me/+971506851559?text=${encodeURIComponent(message)}`,
        "_blank"
      );
    }
  };

  const handleTicketWhatsApp = (countryName) => {
    const getWhatsAppMessage = () => {
      if (i18n.language === 'ar') {
        return `أرغب في حجز تذكرة إلى ${countryName} - يرجى التواصل معي لإكمال الإجراءات`;
      } else {
        return `I want to book a ticket to ${countryName} - please contact me to complete the procedures`;
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

  const flightCards = [
    { country: "SaudiArabia", image: SaudiFLag, className: "OddVisaCard" },
    { country: "UAE", image: UAEFlag, className: "EvenVisaCard" },
    { country: "UK", image: UKFlag, className: "OddVisaCard" },
    { country: "Turkey", image: TurkeyFlag, className: "EvenVisaCard" },
    { country: "Indonesia", image: IndonesiaFlag, className: "OddVisaCard" },
    { country: "Germany", image: GermanyFlag, className: "EvenVisaCard" },
    { country: "Egypt", image: EgyptFlag, className: "OddVisaCard" },
    { country: "Azarbigan", image: AzarbijanFlag, className: "EvenVisaCard" },
    { country: "Georgia", image: GeorgiaFlag, className: "OddVisaCard" },
  ];

  return (
    <div className="FlightsPage">
      <div className="FlightsPageContainer">
        <div className="FLightsPageUpperSection">
          <div className="FlightsContainerIntroSectionTextContainer">
            <div className="FLightsPageUpperSectionHeaderContainer">
              <h1>{t("FLightsHeader")}</h1>
            </div>
            <div className="FLightsPageUpperSectionParagraphContainer">
              <p>{t("FLightsParagraph")}</p>
            </div>
          </div>

          <div className="FlightsContainerIntroSectionImgContainer">
            <img src={FlightsImage} alt="Visa" />
          </div>
        </div>

        <div className="FLightsPageMiddleSection">
          <div>
            <h1>{t("FlightsCardsHeader")}</h1>
          </div>
          <div className="FlightsCardsContainer">
            <div className="FlightsCardsFirstLine">
              {flightCards.slice(0, 5).map((card, index) => (
                <div
                  key={index}
                  onClick={() =>
                    handleTicketWhatsApp(t(`Flights${card.country}FlightCard`))
                  }
                >
                  <div className={`FlightCard ${card.className}`}>
                    <div className="FlightCardFirstLine">
                      <p>{t(`Flights${card.country}FlightCard`)}</p>
                      <div>
                        <img src={card.image} alt={`${card.country} Flight`} />
                      </div>
                    </div>
                    <p>{t("FlightsFlightCardApplyNowButton")}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="FlightsCardsSecondLine">
              {flightCards.slice(5, 9).map((card, index) => (
                <div
                  key={index}
                  onClick={() =>
                    handleTicketWhatsApp(t(`Flights${card.country}FlightCard`))
                  }
                >
                  <div className={`FlightCard ${card.className}`}>
                    <div className="FlightCardFirstLine">
                      <p>{t(`Flights${card.country}FlightCard`)}</p>
                      <div>
                        <img src={card.image} alt={`${card.country} Flight`} />
                      </div>
                    </div>
                    <p>{t("FlightsFlightCardApplyNowButton")}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="FLightsPageLowerSection">
          <div className="FLightsPageLowerSectionHeaderContainer">
            <h1>{t("FlightsDirectionHeader")}</h1>
          </div>
          <div className="FLightsPageLowerSectionBodyContainer">
            <div className="FLightsPageLowerSectionDirectionContainer">
              <p>{t(tripType)}</p>
              <button onClick={toggleDropdown}>
                <img src={DropdownIcon} alt="Toggle Dropdown" />
              </button>
              {isDropdownOpen && (
                <ul
                  className={`dropdown-menu ${
                    currentLanguageDirection === "rtl" ? "rtl-dropdown" : ""
                  }`}
                >
                  <li onClick={() => handleSelection("One Way")}>
                    {t("OneWay")}
                  </li>
                  <li onClick={() => handleSelection("Round Trip")}>
                    {t("RoundTrip")}
                  </li>
                </ul>
              )}
            </div>
            <div className="FLightsPageLowerSectionInputsContainer">
              <input
                placeholder={t("FlightsDirectionFromInput")}
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
              />
              <input
                placeholder={t("FlightsDirectionToInput")}
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
              <input
                placeholder="Date:"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <button className="DarkButton" onClick={handleWhatsAppBooking}>
                {t("FlightsDirectionCheckFlightButton")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flights;
