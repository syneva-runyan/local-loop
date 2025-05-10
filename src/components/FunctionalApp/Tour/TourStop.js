import { useEffect, useState } from "react";
import TourChat from "./TourChat";
import "./TourStop.css";
import TourBreadCrumbs from "./TourBreadCrumbs";
import TourCheckIn from "./TourCheckIn"
import cleanInlineCitations from "../utilComponents/cleanInlineCitations";

function cleanName(name) {
    return (name && name.replace(/[^A-Za-z0-9\-._ ~]/g, '')) || null;
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

function getFallbackLocation(previousStop, tourLocation) {
    return encodeURIComponent(cleanName(previousStop) || tourLocation);

}
async function getLocation(previousStop, tourLocation) {
    if (navigator.geolocation) {
        try {
            const location = await getCurrentLocationPromise();
            console.log("user is at location", location);
            console.log(`${location.coords.latitude},${location.coords.longitude}`);
            return encodeURIComponent(`${location.coords.latitude},${location.coords.longitude}`);
        } catch(e) {
            console.warn("Error getting user location:", e);
            getFallbackLocation(previousStop, tourLocation);
        }
    }

    console.warn("Geolocation is not supported by this browser.");
    return getFallbackLocation(previousStop, tourLocation);
}

const TourStop = ({ stop, stopNumber, totalStops, isLastStop, onNext, onPrev, previousStopName, location }) => {
    const [userLocation, setUserLocation] = useState(getFallbackLocation(previousStopName, location));
    const citationsArray = Array.isArray(stop?.citations) ? stop?.citations : [stop?.citations];

    // get user location for map on component mount
    useEffect(() => {
        async function fetchUserLocation() {
            const userLocation = await getLocation(previousStopName, location);
            setUserLocation(userLocation);
        }
        
        fetchUserLocation();
        
    }, [previousStopName, location]);
    
    const destination = stop?.stopName + location;

    return (
        <>
            <div className="tourStop">
                <TourBreadCrumbs onPrev={onPrev} onNext={onNext}  stopNumber={stopNumber} totalStops={totalStops} />
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
                        `https://www.google.com/maps/embed/v1/directions?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&origin=${userLocation}&destination=${encodeURI(cleanName(destination))}&mode=walking`
                    }
                    allowFullScreen>
                </iframe>
                <p className="tourPreviewStopDescription">{cleanInlineCitations(stop.shortDescription)}</p>
                <TourCheckIn stopName={stop?.stopName} detailsAboutStop={cleanInlineCitations(stop?.detailsAboutStop)} citationsArray={citationsArray} />
                <TourChat stopName={stop?.stopName} location={location} />
                <button className="button nextCta" onClick={onNext}>{isLastStop ? "Finish Tour" : "Go To Next Stop"}</button>
            </div>
        </>
    );
}

export default TourStop;