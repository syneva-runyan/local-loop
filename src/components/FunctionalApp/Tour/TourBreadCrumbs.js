import './TourBreadCrumbs.css';

const TourBreadCrumbs = ({ onPrev, onNext, stopNumber, totalStops }) => {
    let prevLabel;
    let stopNumberDisplay = stopNumber + 1;

    switch (stopNumber) {
        case (-1): 
            stopNumberDisplay = "0";
            prevLabel = "Back to Preview"
            break;
        case 0:
            prevLabel = "Back to Intro"
            break;
        default:
            prevLabel = "Previous Stop"
            break;
    }

    return (
        <div className="tourStopBreadCrumbs">
            <div>
                <button className="tourStopBreadcrumb" onClick={onPrev}>{prevLabel}</button>
            </div>
            <p className="tourStopDetail"><strong>Stop {stopNumberDisplay}/{totalStops}</strong></p>
            <div className="tourStopBreadCrumbsNext">
                {!(stopNumber === totalStops - 1) && <button className="tourStopBreadcrumb" onClick={onNext}>Next Stop</button>}
            </div>
        </div>
    );
};

export default TourBreadCrumbs;
