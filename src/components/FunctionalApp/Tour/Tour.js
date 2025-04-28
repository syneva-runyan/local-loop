import { useEffect, useState } from 'react';
import './Tour.css';
import TourStop from './TourStop';
import Done from './Done';
import TourPreview from './TourPreview';


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
        if (currentStop > 0) {
            setCurrentStop(currentStop - 1);
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

    return (
        <div className='tour'>
            { currentStop !== null ? 
                <TourStop 
                    stop={tour.stops[currentStop]}
                    onNext={goToNextStop} 
                    stopNumber={currentStop + 1} 
                    totalStops={tour.stops.length} 
                    isLastStop={currentStop === tour.stops.length - 1} 
                    onPrev={goToPreviousStop} 
                    previousStopName={tour.stops[currentStop -1]?.stopName || null} 
                    location={location}
                /> 
                : <TourPreview tour={tour} startTour={setCurrentStop} /> }
         </div>
    );
}

export default Tour;
