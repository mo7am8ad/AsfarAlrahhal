import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import DropdownIcon from '../assets/dropdownIcon.svg';
import '../Css/Flights.css';

const Flights = () => {
    const { t, i18n } = useTranslation();
    const [tripType, setTripType] = useState("One Way");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState('');

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
        const whatsAppMessage = ()=>{
            if(i18n.language === 'ar'){
                return `مرحبا أود حجز تذكرة طيران \n\n- ${t(tripType)} من مدينة: ${origin}\n\n- إلى:  ${destination}\n\n- بتاريخ:${date} .:`;
            }
            else {
                return `Hello! I would like to book a flight:\n\n- Type: ${t(tripType)}\n- From: ${origin}\n- To: ${destination}\n- Date: ${date}`;
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
        <div className="FlightsPage">
            <div className="FlightsPageContainer">
                <div className="FLightsPageUpperSection">
                    <div className="FLightsPageUpperSectionHeaderContainer">
                        <h1>{t('FLightsHeader')}</h1>
                    </div>
                    <div className="FLightsPageUpperSectionParagraphContainer">
                        <p>{t('FLightsParagraph')}</p>
                    </div>
                </div>
                <div className="FLightsPageLowerSection">
                    <div className="FLightsPageLowerSectionHeaderContainer">
                        <h1>{t('FlightsDirectionHeader')}</h1>
                    </div>
                    <div className="FLightsPageLowerSectionBodyContainer">
                        <div className="FLightsPageLowerSectionDirectionContainer">
                            <p>{t(tripType)}</p>
                            <button onClick={toggleDropdown}>
                                <img src={DropdownIcon} alt="Toggle Dropdown" />
                            </button>
                            {isDropdownOpen && (
                                <ul 
                                    className={`dropdown-menu ${currentLanguageDirection === 'rtl' ? 'rtl-dropdown' : ''}`}

                                    >
                                    <li onClick={() => handleSelection("One Way")}>{t('OneWay')}</li>
                                    <li onClick={() => handleSelection("Round Trip")}>{t('RoundTrip')}</li>
                                </ul>
                            )}
                        </div>
                        <div className="FLightsPageLowerSectionInputsContainer">
                            <input
                                placeholder={t('FlightsDirectionFromInput')}
                                value={origin}
                                onChange={(e) => setOrigin(e.target.value)}
                            />
                            <input
                                placeholder={t('FlightsDirectionToInput')}
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
                                {t('FlightsDirectionCheckFlightButton')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Flights;
