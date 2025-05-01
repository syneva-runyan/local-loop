import { useEffect, useState } from 'react';
import './Tour.css';
import TourStop from './TourStop';
import Done from './Done';
import TourPreview from './TourPreview';
import TourWelcome from './TourWelcome';


function Tour({tour, location }) {
    const [currentStop, setCurrentStop] = useState(null);
    const [isTourDone, setIsTourDone] = useState(false);

    const goToNextStop = () => {
        if (currentStop < tour.stops.length - 1) {
            setCurrentStop(currentStop + 1);
        } else {
            setIsTourDone(true);
        }
    }

    const goToPreviousStop = () => {
        if (currentStop > -1) {
            setCurrentStop(currentStop - 1);
            return;
        }
        // go back to tour preview
        setCurrentStop(null);
    }

    useEffect(() =>{
        // scroll to top when tour is created and when stepping through stops
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentStop, isTourDone]);

    if(isTourDone) {
        return <Done />
    }
    

    let body = <TourPreview tour={tour} startTour={setCurrentStop} />
    
    switch(currentStop) {
        case -1:
            body = (<TourWelcome 
                welcomeNarration={tour.welcomeNarration} 
                goToStop={setCurrentStop} 
                totalStops={tour.stops.length}
                />);
            break;
        case null:
            body = <TourPreview tour={tour} startTour={setCurrentStop} />
            break;
        default:
            body = <TourStop 
                stop={tour.stops[currentStop]}
                onNext={goToNextStop}
                stopNumber={currentStop} 
                totalStops={tour.stops.length} 
                isLastStop={currentStop === tour.stops.length - 1} 
                onPrev={goToPreviousStop} 
                previousStopName={tour.stops[currentStop -1]?.stopName || null} 
                location={location}
            /> 
            break;

    }

    return (
        <div className='tour'>
            {body}
         </div>
    );
}

export default Tour;
