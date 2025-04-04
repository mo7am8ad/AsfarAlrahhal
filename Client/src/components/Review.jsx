import React from "react";
import '../Css/Review.css';

const ReviewCard = ({ReviewerImage,ReviewerName,ReviewStars,ReviewText}) => {
  return(
    <div className="ReviewContainer">
      <div className="ReviewHeader">
        <div className="ReviewHeaderImageContainer">
          <img src={ReviewerImage}/>
        </div>

        <div className="ReviewHeaderPersonalInfo">
          <div className="ReviewHeaderRightPartNameContainer"><p>{ReviewerName}</p></div>
          <div className="ReviewHeaderRightPartStarsContainer"><img src={ReviewStars}/></div>
        </div>
      </div>

      <div className="ReviewBody">
        <div className="ReviewTextHolder"><p>{ReviewText}</p></div>
      </div>
    </div>
  )
}

export default ReviewCard