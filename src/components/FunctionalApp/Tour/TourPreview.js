import "./TourPreview.css";
import TourPhoto from './TourPhoto';
import cleanInlineCitations from "../utilComponents/cleanInlineCitations";

function TourPreview({ tour, startTour, location }) {
    const retry = () => {
        window.location.href =  window.location.href.split("?")[0];
    }
    return (
    <>
    <div className='tourHeader'>
        <h1 className='functionalAppHeader'>{tour.tourName}</h1>
        <p className='tourAsside'><em>✨ A tour made just for you!</em></p>
    </div>
    <TourPhoto tourPhoto={tour.photo} location={location} />
    <div className='tourBody'>
        {/* <p className="tourAsside tourPreviewDurationTitle">Walking Distance: {tour.walkingDistanceCoveredInTour}</p> */}
        <p>{tour.shortTourDescription}</p>
        <h3 className="tourStopsPreviewHeader">Stop Previews</h3>
        <ul className='tourStopsPreview'>
            {tour?.stops?.map(stop => {
                return (
                    <li className='previewTourStop tourStop' key={`stop=${stop.stopName}`}>
                        <p className='tourStopName'><strong>{stop.stopName}</strong></p>
                        <p className='tourAsside tourPreviewDurationTitle'>Suggested duration</p>
                        <p className='tourAsside tourPreviewDuration'>{stop.durationToSpendAt}</p>
                        <p className="tourPreviewStopDescription">{cleanInlineCitations(stop.shortDescription)}</p>
                    </li>
                );
            })}
        </ul>
            <button className='button startTour' onClick={() => startTour(-1) }>Start Tour</button><br/>
            <button className='button secondaryButton startTour' onClick={retry}>Craft a Different Tour</button>
        </div>
    </>);
}

export default TourPreview;