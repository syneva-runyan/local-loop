import './Done.css';
import React, { useState } from "react";
import shareFeedback from "../../../apiRequests/shareFeedback";

const FeedbackButtons = ({ onFeedback }) => {
  return (
    <div>
      <button
        onClick={() => onFeedback(true)}
        className="thumbsUp feedbackButton"
        aria-label="Thumbs up"
      >
        👍
      </button>

      <button
        onClick={() => onFeedback(false)}
        className="thumbsDown feedbackButton"
        aria-label="Thumbs down"
      >
        👎
      </button>
    </div>
  );
};

const Details = ({ isPositive, onSubmit }) => {
  return (
    <form className='detailedFeedbackContainer' onSubmit={onSubmit}>
      <label htmlFor="detafeedbackDetailsils">{isPositive ? "What did you like?" : "What could we improve?"}</label>
      <textarea id="feedbackDetails" className='detailedFeedbackContainerInput' />
      <button className="submitFeedbackButton button">Submit</button>
    </form>
  )
}


function FeedbackForm({ setFeedbackSumbited }) {
  const [thumbSelected, setThumbSelected] = useState(null);
  
  const onThumbClick = (isPositive) => {
      console.log(`User feedback: ${isPositive}`);
      setThumbSelected(isPositive);
  };

  const onSubmit = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const feedbackDetails = e.target.elements.feedbackDetails.value;
      console.log(`Feedback details: ${feedbackDetails}`);
      setFeedbackSumbited(true);
      const sentiment = thumbSelected ? "positive" : "negative";
      shareFeedback(sentiment, feedbackDetails);
      // Here you would typically send the feedback to your server
  };

  return (
    <>
     <p><strong>Let us know what you thought!</strong></p>
      { thumbSelected !== null ?
        <Details isPositive={thumbSelected} onSubmit={onSubmit} />  :
      <FeedbackButtons onFeedback={onThumbClick} />
    }
    </>
  )
}

function Done() {
  const [feedbackSumbited, setFeedbackSumbited] = useState(false);

    return (
        <div className="tour-complete-container">
            <div className="walker">🚶‍♀️</div>
            <h1 className="complete-text">You Finished Your Tour!</h1>
            <div className="confetti"></div>

            {feedbackSumbited ? <p>Thank you for your feedback!</p>: <FeedbackForm setFeedbackSumbited={setFeedbackSumbited} />}
        </div>
    );
}

export default Done;