import './Tours.css';

function Tour({tour }) {
    return (
        <div className='tour'>
            <h1 className='functionalAppHeader'>{tour.tourName}</h1>
            <p className='tourAsside'><em>✨Made just for you</em></p>
            <p>{tour.tourDescription}</p>
            <ul className='tourStops'>
                {tour.stops.map(stop => {
                    return (
                        <li className='tourStop' key={`stop=${stop.stopName}`}>
                            <strong>{stop.stopName}</strong>
                            <p className='tourAsside'>{stop.durationToSpendAt}</p>
                            <p className='tourAsside'>{stop.stopAddress}</p>
                            <p>{stop.detailsAboutStop}</p>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default Tour;
