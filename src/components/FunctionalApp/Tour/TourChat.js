import { useEffect, useState } from "react";
import Citation from "../utilComponents/Citation";
import askQuestion from '../../../apiRequests/askQuestion';
import "./TourChat.css";
import FadeIn from "../utilComponents/FadeIn";

function TourChat({ stopName, location }) {
  const [chatInput, setChatInput] = useState("");
  const [qAndA, setQAndA] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);


  useEffect(() => {
    // clear chats when new stop.
    setChatInput("");
    setQAndA([]);
    setIsLoading(false);
    setIsError(false);
  }, [stopName]
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setIsError(false);
      const answer = await askQuestion(chatInput, stopName, location);
      setIsLoading(false);
      const citationsArray = Array.isArray(answer.citations) ? answer.citations : [answer.citations];
      setQAndA((prevQAndA) => [
        ...prevQAndA,
        { question: chatInput, answer: answer?.answer, citations: citationsArray },
      ]);
      setChatInput("");
    } catch(error) {
      setIsLoading(false);
      setIsError(true);
      console.error("Error sending message:", error);
    }
  }

  const reversedQnA = [...qAndA].reverse();
  return (
    <div className="tourChat">
      <h2>Hi there!</h2>
      <p>{stopName} questions?</p>
      <form className="tourQuestion">
        <input className="tourQuestionInput" onChange={(e) => setChatInput(e.target.value)} value={chatInput}  placeholder={`Type your question here`} />
        <button
          className="tourGuideButton"
          onClick={onSubmit}
          aria-label="Submit message"
          disabled={isLoading || chatInput.length === 0}
        >
          Ask
        </button>
      </form>
      {isLoading && <p className="tourChatLoading">Surfacing with an answer shortly 🐳</p>}
      {isError && <p className="error">Uh oh! Something went wrong... try again</p>}
        <FadeIn>
        { reversedQnA.map((qAndA, index) => (
          <div key={`qna-${index}`} className="tourChatMessage">
            <p className="tourChatUser tourChatAttribution">You:</p>
            <p className="tourChatQuestion">{qAndA.question}</p>
            <p className="tourChatGuide tourChatAttribution">AI Tour Guide:</p>
            <p className="tourChatAnswer">{qAndA.answer}</p>
            {qAndA.citations.map((citation, citationIdx) => {
              const isLast = citationIdx === qAndA.citations.length - 1;
              return <Citation isLast={isLast} citation={citation} key={`qna-${index}-citation-${citationIdx}`} />
            })}
          </div>
        ))}
        </FadeIn>
    </div>
  );
}

export default TourChat;