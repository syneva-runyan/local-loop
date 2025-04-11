import constants from "./constants";

// get a personalized itinerary based on provided params
const getItinerary = async (location, duration, vibes) => {
    // construct request url
    const urlParams = new URLSearchParams();
    urlParams.append("location", encodeURIComponent(location));
    urlParams.append("hours", encodeURIComponent(duration.hours));
    urlParams.append("minutes", encodeURIComponent(duration.minutes));
    urlParams.append("vibes", encodeURIComponent(vibes));
    var url = new URL(constants.GET_ITINERARY_ENDPOINT);
    url.search = urlParams;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const parsedResponse = await response.json()
        // TOOD validate response
        return parsedResponse;
    } catch (e) {
        console.error('Error:', e)
        return { error: true };
    }
}

export default getItinerary;
