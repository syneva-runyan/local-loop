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
            mode: 'no-cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const parsedResponse = response.json()
        return parsedResponse;
    } catch (e) {
        console.error('Error:', e)
    }
}

export default getItinerary;
