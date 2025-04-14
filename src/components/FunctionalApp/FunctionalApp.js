import { useState } from "react";
import WhatDoYouLike from './WhatDoYouLike';
import WhereAreYou from './WhereAreYou';
import HowMuchTimeDoYouHave from './HowMuchTImeDoYouHave';
import getItineraryRequest from '../../apiRequests/getItineraryRequest';
import Tour from './Tour/Tour';

import './FunctionalApp.css';
import ItineraryLoading from "./ItineraryLoading.js";
import FadeIn from "./utilComponents/FadeIn";
import AppHeader from "./AppHeader";

function FunctionalApp() {
    const [isCreating, setIsCreating] = useState(false);
    const [tour, setTour] = useState(null);
    const [isError, setIsError] = useState(false);

    const onSubmit= async (e) => {
        setIsCreating(true);
        e.preventDefault();
        const location = e.target.elements.location.value;
        const hours = e.target.elements.hours.value;
        const minutes = e.target.elements.minutes.value;
        const vibes = e.target.elements.vibes.value || "free instagramable places";
        // TODO handle error
        const tourItinerary = await getItineraryRequest(location, { hours, minutes}, vibes);
        if (tourItinerary.error) {
            setIsError(true);
        } else {
            setTour(tourItinerary);
        }
        setIsCreating(false);

    }

    if (isCreating) {
        return (
            <FadeIn>
                <ItineraryLoading location={"Juneau, Alaska"} />
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
            <h1 className='functionalAppHeader'>Let's Explore</h1>
            <form className='tourInput' onSubmit={onSubmit}>
                <WhereAreYou />
                <HowMuchTimeDoYouHave />
                <WhatDoYouLike />
                {isError && <p className="error">Uh oh! Something happened. Please try again</p>}
                <button className='button functionalAppSubmission' type="submit" disabled={isCreating}>
                    {isCreating ? "Crafting tour..." : "Create Itinerary" }
                </button>
            </form>
            </>
        )
    }

    return (
      <div className='FunctionalApp'>
        <AppHeader />
        {innerContent}
    </div>
    )
}

export default FunctionalApp;