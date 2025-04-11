import { useState } from "react";
import WhatDoYouLike from './WhatDoYouLike';
import WhereAreYou from './WhereAreYou';
import HowMuchTimeDoYouHave from './HowMuchTImeDoYouHave';
import Header from '../Header';
import getItineraryRequest from '../../apiRequests/getItineraryRequest';
import Tour from './Tour/Tour';

import './FunctionalApp.css';
import WhaleLoading from "./WhaleLoading.js";
import FadeIn from "./utilComponents/FadeIn";

function FunctionalApp() {
    const [isCreating, setIsCreating] = useState(false);
    const [tour, setTour] = useState(null);

    const onSubmit= async (e) => {
        setIsCreating(true);
        e.preventDefault();
        const location = e.target.elements.location.value;
        const hours = e.target.elements.hours.value;
        const minutes = e.target.elements.minutes.value;
        const vibes = e.target.elements.vibes.value;
        // TODO handle error
        const tourItinerary = await getItineraryRequest(location, { hours, minutes}, vibes);
        setTour(tourItinerary);
        setIsCreating(false);

    }

    if (isCreating) {
        return (
            <FadeIn>
                <WhaleLoading />
            </FadeIn>
        )
    }

    let innerContent;
    if (tour) {
        innerContent =  (
            <FadeIn>
                <Tour tour={tour} />
            </FadeIn>
        )
    } else {
        innerContent = (
            <>
            <h1 className='functionalAppHeader'>Craft a tour</h1>
            <form className='tourInput' onSubmit={onSubmit}>
                <WhereAreYou />
                <HowMuchTimeDoYouHave />
                <WhatDoYouLike />
                <button className='button functionalAppSubmission' type="submit" disabled={isCreating}>
                    {isCreating ? "Crafting tour..." : "Create Itinerary" }
                </button>
            </form>
            </>
        )
    }

    return (
      <div className='FunctionalApp'>
        <Header />
        {innerContent}
    </div>
    )
}

export default FunctionalApp;