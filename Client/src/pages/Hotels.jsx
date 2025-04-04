import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import HotelCard from "../components/HotelCard";
import '../Css/Hotels.css';

const Hotels = () => {
  const { t, i18n } = useTranslation();
  const [activeCity, setActiveCity] = useState("Makkah");
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const language = i18n.language;

  const handleCityChange = (city) => {
    setActiveCity(city);
  };

  // Fetch hotels from the backend
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/hotels?lang=${i18n.language}`);
        if (!response.ok) throw new Error("Failed to fetch hotels");
        const data = await response.json();
        setHotels(data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading hotel data:", error);
        setError(error.message);
        setLoading(false);
      }
    };
    fetchHotels();
  }, []);

  // Filter hotels based on the selected city
  useEffect(() => {
    setFilteredHotels(hotels.filter((hotel) => hotel.location.en === activeCity ));
  }, [activeCity, hotels]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="HotelsPageContainer">
      <div className="HotelsPageUpperSection">
        <div className="HotelsPageUpperSectionDescriptionPart">
          <div className="HotelsPageUpperSectionDescriptionPartHeaderContainer">
            <h1>{t('HotelsHeader')}</h1>
          </div>
          <div className="HotelsPageUpperSectionDescriptionPartParagraphContainer">
            <p>{t('HotelsPargraph')}</p>
          </div>
        </div>
        <div className="HotelsPageUpperSectionChooseCityPart">
          <div className="HotelsPageUpperSectionChooseCityPartPargraphContainer">
            <p>{t('HotelsTextAboveChoosingCity')}</p>
          </div>
          <div className="HotelsPageUpperSectionChooseCityPartButtonsContainer">
            <button
              className={`CityButton ${activeCity === 'Makkah' ? 'active' : ''}`}
              onClick={() => handleCityChange('Makkah')}
            >
              {t('HotelsChooseButtonMakkah')}
            </button>
            <button
              className={`CityButton ${activeCity === 'Madinah' ? 'active' : ''}`}
              onClick={() => handleCityChange('Madinah')}
            >
              {t('HotelsChooseButtonMadinah')}
            </button>
          </div>
        </div>
      </div>
      <div className="HotelsPageCardsSection">
        {filteredHotels.map((hotel) => (
          <HotelCard key={hotel._id} hotel={hotel} />
        ))}
      </div>
    </div>
  );
};

export default Hotels;