import constants from "./constants";

// get a existing tour itinerary
const getTour = async (location, tourId) => {
    // construct request url
    const urlParams = new URLSearchParams();
    urlParams.append("location", encodeURIComponent(location));
    urlParams.append("tourId", encodeURIComponent(tourId));
    var url = new URL(constants.GET_TOUR_ENDPOINT);
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
        const parsedResponse = await response.json();
        // TOOD validate response
        return parsedResponse;
    } catch (e) {
        console.error('Error:', e)
        return { error: true };
    }
}

export default getTour;
