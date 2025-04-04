import React from "react";
import '../Css/ServiceCard.css';
import { Navigate, useNavigate } from "react-router-dom";


const ServiceCard = ({Icon,ServiceName,ServiceDetails,ButtonText,url})=>{
  const navigate = useNavigate();

  const handleButtonClick =()=>{
    navigate(url);
  }

  return(
    <div className="ServiceCardOuterContainer">
      <div className="ServiceCardInnerContainer">
        <div className="ServiceCardContentPartContainer">
          <div className="ServiceCardContentPartContainerHeader">
            <div className="ServiceCardContentPartContainerHeaderImageContainer">
              <img src={Icon}/>
            </div>
            <div className="ServiceCardContentPartContainerHeaderServiceNameContainer">
              <h1>{ServiceName}</h1>
            </div>
          </div>
          <div className="ServiceCardContentPartContainerParagraph">
            <p>{ServiceDetails}</p>
          </div>
        </div>

        <div className="ServiceCardButtonPartContainer">
          <button className="LightButton" onClick={handleButtonClick}>
            {ButtonText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ServiceCard;