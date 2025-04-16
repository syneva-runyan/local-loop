import './Done.css';
import React, { useState } from "react";

const FeedbackButtons = ({ onFeedback }) => {
  return (
    <div>
      <button
        onClick={() => onFeedback("up")}
        className="thumbsUp feedbackButton"
        aria-label="Thumbs up"
      >
        👍
      </button>

      <button
        onClick={() => onFeedback("down")}
        className="thumbsDown feedbackButton"
        aria-label="Thumbs down"
      >
        👎
      </button>
    </div>
  );
};


function Done() {
    const onFeedback = (feedback) => {
        console.log(`User feedback: ${feedback}`);
    };
    return (
        <div className="tour-complete-container">
            <div className="walker">🚶‍♀️</div>
            <h1 className="complete-text">You Finished Your Tour!</h1>
            <div className="confetti"></div>
            <p><strong>Let us know what you thought!</strong></p>
            <FeedbackButtons onFeedback={onFeedback} />
        </div>
    );
}

export default Done;