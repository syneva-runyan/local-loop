import { useEffect } from 'react';
import './Tour.css';
import TourPhoto from './TourPhoto';
import { Accordion, AccordionItem } from '@szhsin/react-accordion';


function Tour({tour }) {
    useEffect(() =>{
        // scroll to top when tour is created
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [])
    return (
        <div className='tour'>
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
                                )
                            })}
                        </ul>
                    </AccordionItem>
                </Accordion>
                <button className='button startTour'>Start Tour</button>
            </div>
        </div>
    );
}

export default Tour;
