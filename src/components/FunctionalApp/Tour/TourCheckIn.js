import { useEffect, useState } from "react";


import "./TourCheckIn.css";
import FadeIn from "../utilComponents/FadeIn";

const TourCheckIn = function({ stopName }) {
    const [checkedIn, setCheckedIn] = useState(false);

    useEffect(() => {
     const timeout = setTimeout(() => {
       // setCheckedIn(false);
     }, 5000);  
     return () => {
        clearTimeout(timeout);
     } 
    });

    return (
        <div className="tour-checkin">
            <button className="tour-checkin-button button secondaryButton" onClick={() => { setCheckedIn(true) }}>Check-in at { stopName }</button>
            {checkedIn && (
                <FadeIn fadeTimer={100}>
                    <div className="tour-checkin-animation-container">
                    <div className="aurora-bg"></div>
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
