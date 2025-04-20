import { useEffect, useState } from "react";
import TourChat from "./TourChat";
import "./TourStop.css";
import Citation from "../utilComponents/Citation";

function cleanName(name) {
    return name.replace(/[^A-Za-z0-9\-._~]/g, '');
}

function getCurrentLocationPromise() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                resolve(position);
            }, (error) => {
                reject(error);
            });
        } else {
            reject(new Error("Geolocation is not supported by this browser."));
        }
    });
}

function getFallbackLocation(previousStop) {
    return encodeURIComponent(cleanName(previousStop) || "Downtown Juneau, Alaska");

}
async function getLocation(previousStop) {
    if (navigator.geolocation) {
        try {
            const location = await getCurrentLocationPromise();
            console.log("user is at location", location);
            console.log(`${location.coords.latitude},${location.coords.longitude}`);
            return encodeURIComponent(`${location.coords.latitude},${location.coords.longitude}`);
        } catch(e) {
            console.warn("Error getting user location:", e);
            getFallbackLocation(previousStop);
        }
    }

    console.warn("Geolocation is not supported by this browser.");
    return getFallbackLocation(previousStop);
}

const TourStop = ({ stop, stopNumber, totalStops, isLastStop, onNext, onPrev, previousStopName, location }) => {
    const [userLocation, setUserLocation] = useState(getFallbackLocation(previousStopName));
    const citationsArray = Array.isArray(stop.citations) ? stop.citations : [stop.citations];

    // get user location for map on component mount
    useEffect(() => {
        async function fetchUserLocation() {
            const location = await getLocation(previousStopName);
            setUserLocation(location);
        }
        
        fetchUserLocation();
        
    }, [previousStopName]);

    return (
        <>
            <div className="tourStop">
                <div className="tourStopBreadCrumbs">
                    <div>
                        {(stopNumber !== 1) &&<button className="tourStopBreadcrumb" onClick={onPrev}>Previous Stop</button>}
                    </div>
                    <p className="tourStopDetail"><strong>Stop {stopNumber}/{totalStops}</strong></p>
                    <div className="tourStopBreadCrumbsNext">
                        {!isLastStop && <button className="tourStopBreadcrumb" onClick={onNext}>Next Stop</button>}
                    </div>
                </div>
                <h1 className="tourStopHeading">{stop?.stopName}</h1>
                <p className="tourStopDetail"><strong>Suggested time at stop - {stop?.durationToSpendAt} </strong></p>
                <iframe
                    title="Embedded Directions"
                    style={{
                        width: "100%",
                        height: "350px",
                        "border":"0"
                    }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={
                        `https://www.google.com/maps/embed/v1/directions?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&origin=${userLocation}&destination=${encodeURI(cleanName(stop.stopName))}&mode=walking`
                    }
                    allowFullScreen>
                </iframe>
                <p className="tourStopDetail">{stop?.stopAddress}</p>
                <p className="tourStopDescription">{stop?.detailsAboutStop}</p>
                <p className="tourStopDetail">
                    {citationsArray.map((citation, citationIdx) => {
                        const isLast = citationIdx === citationsArray.length - 1;
                        return <Citation isLast={isLast} citation={citation} key={`citation-${citationIdx}-${stop.stopName}`} />
                    })}
                </p>
                <button className="button nextCta" onClick={onNext}>{isLastStop ? "Finish Tour" : "Go To Next Stop"}</button>
            </div>
            <TourChat stopName={stop.stopName} location={location} />
        </>
    );
}

export default TourStop;