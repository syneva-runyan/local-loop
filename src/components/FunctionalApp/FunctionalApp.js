import { useEffect, useState } from "react";
import WhatDoYouLike from './WhatDoYouLike';
import WhereAreYou from './WhereAreYou';
import HowMuchTimeDoYouHave from './HowMuchTImeDoYouHave';
import getItineraryRequest from '../../apiRequests/getItineraryRequest';
import getExistingTour from '../../apiRequests/getTour';
import Tour from './Tour/Tour';

import './FunctionalApp.css';
import ItineraryLoading from "./ItineraryLoading.js";
import FadeIn from "./utilComponents/FadeIn";
import AppHeader from "./AppHeader";

function FunctionalApp() {
    const [isCreating, setIsCreating] = useState(false);
    const [tour, setTour] = useState(null);
    const [isError, setIsError] = useState(false);
    const [tourLocation, setTourLocation] = useState("Downtown Juneau, Alaska");

    useEffect(() => {
        const getTour = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const location = decodeURIComponent(urlParams.get('location'));
            const tourId = decodeURIComponent(urlParams.get('tourId'));

            if (location !== "null" && tourId !== "null") {
                setTourLocation(location);
                setIsCreating("Getting tour details...");
                const tour = await getExistingTour(location, tourId);
                if (tour && !tour.error) {
                    setTour(tour);
                    setTourLocation(tour.location);
                    setIsCreating(false);
                }
                setIsCreating(false);
            }
        }
        getTour();
    }, []);

    const onSubmit= async (e) => {
        setIsCreating(true);
        e.preventDefault();
        const location = e.target.elements.location.value;
        const hours = e.target.elements.hours.value;
        const minutes = e.target.elements.minutes.value;
        const vibes = e.target.elements.vibes.value || "free photogenic places";
        // TODO handle error
        const tourItinerary = await getItineraryRequest(location, { hours, minutes}, vibes);
        window.amplitude?.logEvent('Creating tour', {
            location,
            hours,
            minutes,
            vibes
        });
        if (!tourItinerary || tourItinerary.error) {
            setIsError(true);
        } else {
            setTour(tourItinerary);
            const url = new URL(window.location);
            url.searchParams.set('location', encodeURIComponent(location));
            url.searchParams.set('tourId', encodeURIComponent(tourItinerary.tourId));
            window.history.pushState({}, '', url);
        }
        setIsCreating(false);
        setTourLocation(location)

    }

    if (isCreating) {
        return (
            <FadeIn>
                <ItineraryLoading location={tourLocation} msg={isCreating} />
            </FadeIn>
        )
    }

    let innerContent;
    if (tour) {
        innerContent =  (
            <FadeIn>
                <Tour tour={tour} location={tourLocation} />
            </FadeIn>
        )
    } else {
        innerContent = (
            <>
            <h1 className='functionalAppHeader'>Let's Explore Alaska!</h1>
            <form className='tourInput' onSubmit={onSubmit}>
                <WhereAreYou tourLocation={tourLocation} setTourLocation={setTourLocation} />
                <HowMuchTimeDoYouHave />
                <WhatDoYouLike />
                {isError && <p className="error">Uh oh! Something happened. Please try again</p>}
                <button className='button functionalAppSubmission' type="submit" disabled={isCreating}>
                    {isCreating ? "Crafting Tour..." : "Create Tour" }
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