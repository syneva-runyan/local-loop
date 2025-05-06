import { useEffect, useState } from "react";
import Citation from "../utilComponents/Citation";


import "./TourCheckIn.css";
import FadeIn from "../utilComponents/FadeIn";

const TourCheckIn = function({ stopName, detailsAboutStop, citationsArray }) {
    const [checkedIn, setCheckedIn] = useState(false);

    useEffect(() => {
        // scroll to top when tour on hide and close of details
         window.scrollTo({ top: 0, behavior: 'smooth' });
        if (checkedIn) {
            document.body.style.overflow = 'hidden'; // Disable scroll
        } else {
            document.body.style.overflow = 'auto'; // Enable scroll
        }
    }, [checkedIn]);

    return (
        <div className="tour-checkin">
            <button className="tour-checkin-button button secondaryButton" onClick={() => { setCheckedIn(true) }}>Check-in at { stopName }</button>
            {checkedIn && (
                <FadeIn fadeTimer={100}>
                    <div className="tour-checkin-animation-container">
                        <div className="tour-checkin-container-content">
                            <div className="imageContainer">
                                <img
                                    src="/LocalLoopLogo.png"
                                    alt="Flying Raven"
                                    className={`raven ${checkedIn ? "landed" : ""}`}
                                    />
                            </div>
                        <h2 className="tourStopDescriptionHeader">Welcome to {stopName}!</h2>
                        <p className="tourStopDescription">{detailsAboutStop}</p>
                        <div className="tourStopCitationContainer">
                            <p className="tourStopDetail">
                                {citationsArray.map((citation, citationIdx) => {
                                    const isLast = citationIdx === citationsArray.length - 1;
                                    return <Citation isLast={isLast} citation={citation} key={`citation-${citationIdx}-${stopName}`} />
                                })}
                            </p>
                        </div>
                        <div className="tourStopCheckinBackContainer">
                            <button className="button tourStopCheckinBack" onClick={() => { setCheckedIn(false); }}>Back to Itinerary</button>
                        </div>
                        </div>
                    </div>
                </FadeIn>
            )}
       </div>
    );
}

export default TourCheckIn;
