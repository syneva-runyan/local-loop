import WhatDoYouLike from './WhatDoYouLike';
import WhereAreYou from './WhereAreYou';
import HowMuchTimeDoYouHave from './HowMuchTImeDoYouHave';
import Header from '../Header';
import getItineraryRequest from '../../apiRequests/getItineraryRequest';

import './FunctionalApp.css';

function FunctionalApp() {

    const onSubmit=(e) => {
        e.preventDefault();
        const location = e.target.elements.location.value.replace(",", "+");
        const hours = e.target.elements.hours.value;
        const minutes = e.target.elements.minutes.value;
        const vibes = e.target.elements.vibes.value;
        
        getItineraryRequest(location, { hours, minutes}, vibes)

    }

    return (
      <div className='FunctionalApp'>
        <Header />
        <form className='tourInput' onSubmit={onSubmit}>
            <WhereAreYou />
            <HowMuchTimeDoYouHave />
            <WhatDoYouLike />
            <button className='button' type="submit">Build an Itinerary</button>
        </form>
    </div>
    )
}

export default FunctionalApp;