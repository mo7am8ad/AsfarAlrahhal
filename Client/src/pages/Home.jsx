import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import "../Css/home.css";
import HotelCard from "../components/HotelCard";

function Home(){
  const {t,i18n} = useTranslation();
  const [MakkahAndMadinahHotels,setMakkahAndMadinahHotels] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [error,setError] = useState(null);

  //fetch makkah and madinah hotels from the backend 
  useEffect(()=>{
    const FetchMakkahMadinahHotels = async () =>{
      try{
        const response = await fetch(`https://api.asfaralrahhal.net/api/hotels?lang=${i18n.language}`);
        if (!response.ok) throw new Error ("Failed To fetch Makkah and madinah hotels in the homne page");
        const data = await response.json();
        setMakkahAndMadinahHotels(data);
        setLoading(false);
      } catch (error){
        console.error("error laoding the makkah and madinah hotels data in the home page");
        setError(error.message);
        setLoading(false);
      }
    };
    FetchMakkahMadinahHotels(); 
  },[]);

  return(
    <div className="homeContainer">
      <section className="HomeHeroSection">
        <div className="HomeBackGround">
          <div className="HomeHeroSectionContentContianer">
            <div className="HomeHeroSectionHeaderContainer">
              <h1>{t('HomeHeroHeader1')}</h1>
              <h1>{t('HomeHeroHeader2')}</h1>
            </div>
            <div className="HomeHeroSectionParagraphContainer">
              <p>{t('HomeHeroParagraph')}</p>
            </div>
            <div className="HomeHeroSectionButtonContainer">
              <button className="DarkButton">
                {t('HomeHeroButton')}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="HomeSecondSection">
        <div className="HomeSecondSectionContianer">
          <h1>{t('HomeOurServices')}</h1>

          <div>
            <div>
              <h1>{t('HomeOurServicesHotelReservation')}</h1>
            </div>
            <div>
              <div>
                <h1>{t('HomeOurServicesHotelsMakkahAndMadinah')}</h1>
              </div>
              <div>
                <div>
                  {MakkahAndMadinahHotels.map((hotel) => (
                    <HotelCard key={hotel._id} hotel={hotel} />
                  ))}
                </div>
                <div>

                </div>
              </div>
            </div>
          </div>

          <div>

          </div>

          <div>

          </div>

          <div>

          </div>

          <div>

          </div>
        </div>
      </section>
    </div>
  )
}

export default Home;