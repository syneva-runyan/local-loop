import TourBreadCrumbs from "./TourBreadCrumbs";
import cleanInlineCitations from "../utilComponents/cleanInlineCitations";

function TourWelcome({ welcomeNarration, goToStop, totalStops }) {
    return (
    <>
        <TourBreadCrumbs stopNumber={-1} totalStops={totalStops} onPrev={() => goToStop(null)} onNext={() => goToStop(0)} />
        <div className='tourHeader'>
            <h1 className='functionalAppHeader' style={{"paddingTop": "20px"}}><em>Let's get started!</em></h1>
        </div>
        <div className='tourBody'>
            <p>{cleanInlineCitations(welcomeNarration)}</p>
            <button className='button startTour' onClick={() => goToStop(0) }>Go to First Stop</button><br/>
        </div>
    </>
    );
}

export default TourWelcome;