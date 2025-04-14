import { useEffect, useState } from 'react';
import './Tour.css';
import TourPhoto from './TourPhoto';
import TourStop from './TourStop';
import { Accordion, AccordionItem } from '@szhsin/react-accordion';

function TourPreview({ tour, startTour }) {
    return (
    <>
    <div className='tourHeader'>
        <h1 className='functionalAppHeader'>{tour.tourName}</h1>
        <p className='tourAsside'><em>✨A tour made just for you</em></p>
    </div>
    <TourPhoto tourPhoto={tour.photo} />
    <div className='tourBody'>
        <p>{tour.shortTourDescription}</p>
            <Accordion>
                <AccordionItem header="Preview Stops">
                    <ul className='tourStops'>
                        {tour.stops.map(stop => {
                            return (
                                <li className='tourStop' key={`stop=${stop.stopName}`}>
                                    <p className='tourStopName'><strong>{stop.stopName}</strong></p>
                                    <p className='tourAsside'>{stop.durationToSpendAt}</p>
                                    <p>{stop.shortDescription}</p>
                                </li>
                            );
                        })}
                    </ul>
                </AccordionItem>
            </Accordion>
            <button className='button startTour' onClick={() => startTour(0) }>Start Tour</button>
        </div>
    </>);
}


function Tour({tour }) {
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
    }

    useEffect(() =>{
        // scroll to top when tour is created and when stepping through stops
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentStop])
    return (
        <div className='tour'>
            { currentStop !== null ? 
                <TourStop stop={tour.stops[currentStop]} onNext={goToNextStop} stopNumber={currentStop + 1} totalStops={tour.stops.length} isLastStop={currentStop == tour.stops.length - 1} onPrev={goToPreviousStop} /> 
                : <TourPreview tour={tour} startTour={setCurrentStop} /> }
         </div>
    );
}

export default Tour;
