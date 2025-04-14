import "./TourPreview.css";
import TourPhoto from './TourPhoto';
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
                    <ul className='tourStopsPreview'>
                        {tour?.stops?.map(stop => {
                            return (
                                <li className='previewTourStop tourStop' key={`stop=${stop.stopName}`}>
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

export default TourPreview;