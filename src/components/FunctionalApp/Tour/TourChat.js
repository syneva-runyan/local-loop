import { useState } from "react";
import askQuestion from '../../../apiRequests/askQuestion';
import "./TourChat.css";

function TourChat({ stopName }) {
  const [chatInput, setChatInput] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    askQuestion(chatInput, stopName);
  }
  return (
    <div className="tourChat">
      <h2>Hi there!</h2>
      <p>{stopName} questions? Ask me!</p>
      <form className="tourQuestion">
        <input className="tourQuestionInput" onChange={(e) => setChatInput(e.target.value)} value={chatInput} />
        <button className="tourGuideButton" onClick={onSubmit}>Ask</button>
      </form>
    </div>
  );
}

export default TourChat;