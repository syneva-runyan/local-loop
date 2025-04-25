import { useEffect, useState } from "react";


import "./TourCheckIn.css";
import FadeIn from "../utilComponents/FadeIn";

const TourCheckIn = function({ stopName }) {
    const [checkedInFadeOut, setCheckedInFadeOut] = useState(false);
    const [checkedIn, setCheckedIn] = useState(false);

    const finalOut = () => {
        setCheckedIn(false);
        setCheckedInFadeOut(false);
    }

    useEffect(() => {
     const timeout1 = setTimeout(() => {
        setCheckedInFadeOut(true);
     }, 4750); 
     const timeout2 = setTimeout(() => {
        setCheckedIn(false);
        setCheckedInFadeOut(false);
      }, 5000);  
     return () => {
        clearTimeout(timeout1);
        clearTimeout(timeout2);
     } 
    });

    return (
        <div className="tour-checkin">
            <button className="tour-checkin-button button secondaryButton" onClick={() => { setCheckedIn(true) }}>Check-in at { stopName }</button>
            {checkedIn && (
                <FadeIn fadeTimer={100}>
                    <div className={`tour-checkin-animation-container ${checkedInFadeOut ? 'fade-out' : 'nope'}`} onClick={finalOut}>
                    <div className="aurora-bg" onClick={finalOut}></div>
                        <img
                            src="/LocalLoopLogo.png"
                            alt="Flying Raven"
                            className={`raven ${checkedIn ? "landed" : ""}`}
                            />
                            <h2 className="tour-checkin-thankyou-title">Thank you for supporting local businesses!</h2>
                    </div>
                </FadeIn>
            )}
       </div>
    );
}

export default TourCheckIn;
