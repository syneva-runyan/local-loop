import "./TourChat.css";

function TourChat({ stopName}) {
  const onSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <div className="tourChat">
      <h2>Hi there!</h2>
      <p>{stopName} questions? Ask me!</p>
      <form className="tourQuestion">
        <input className="tourQuestionInput"></input>
        <button className="tourGuideButton" onClick={onSubmit}>Ask</button>
      </form>
    </div>
  );
}

export default TourChat;