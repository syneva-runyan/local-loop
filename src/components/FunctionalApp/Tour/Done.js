import './Done.css';

function Done() {
    return (
        <div className="tour-complete-container">
            <div className="walker">🚶‍♀️</div>
            <h1 className="complete-text">You Finished Your First Tour!</h1>
            <div className="confetti"></div>
            <button className='button'>Let us know what you thought!</button>
        </div>
    );
}

export default Done;