import TourChat from "./TourChat";
import "./TourStop.css";

function getCitationDomain(citation) {
    try {
        const url = new URL(citation);
        return {
            citation: url.hostname.replace('www.', ''),
            isUrl: true
        }
    } catch(e) {
        return { citation, isUrl: false };
    }
}

function getLocation() {
    return encodeURI("Juneau,Alaska");
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(showPosition);
    // } else {
    //   x.innerHTML = "Geolocation is not supported by this browser.";
    // }
  }

const TourStop = ({ stop, stopNumber, totalStops, isLastStop, onNext, onPrev }) => {
    const citationsArray = Array.isArray(stop.citations) ? stop.citations : [stop.citations];
    return (
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
                    `https://www.google.com/maps/embed/v1/directions?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&origin=${getLocation()}&destination=${encodeURI(stop.stopAddress)}&mode=walking`
                }
                allowFullScreen>
            </iframe>
            <p className="tourStopDetail">{stop?.stopAddress}</p>
            <p className="tourStopDescription">{stop?.detailsAboutStop}</p>
            <p className="tourStopDetail">
                {citationsArray.map((citation, citationIdx) => {
                    const isLast = citationIdx === citationsArray.length - 1;
                    const citationInfo = getCitationDomain(citation)
                    if (citationInfo.isUrl) {
                        return (
                            <a 
                                href={citationInfo.citation} 
                                target="_blank" rel="noopener noreferrer" 
                                key={citationInfo.citation}>
                                    {citationInfo.citation}{isLast ? "" : ", "} 
                            </a>
                        );
                    }
                    return <span key={citationInfo.citation}>{citationInfo.citation}{isLast ? "" : ", "}</span>;
                })}
            </p>
            <TourChat stopName={stop.stopName} />
            <button className="button nextCta" onClick={onNext}>{isLastStop ? "Finish Tour" : "Go To Next Stop"}</button>
        </div>
    );
}

export default TourStop;