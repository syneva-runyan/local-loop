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
        const parsedResponse =  {body: "{\"tourName\":\"Juneau Arts & Boutiques Walking Tour\",\"tourDescription\":\"A charming 2.5-hour walking tour through downtown Juneau focusing on local art galleries, unique boutiques, and cultural spots. This route is easily walkable and showcases the best of Juneau's artistic side.\",\"stops\":[{\"stopName\":\"Juneau Arts & Culture Center\",\"durationToSpendAt\":\"30 minutes\",\"detailsAboutStop\":\"Start at this community hub featuring rotating exhibitions of local artists and Alaska Native art. The center often hosts temporary exhibits and has a gift shop with local artisan works.\",\"stopAddress\":\"350 Whittier St, Juneau, AK 99801\"},{\"stopName\":\"Alaska Native Arts & Crafts\",\"durationToSpendAt\":\"25 minutes\",\"detailsAboutStop\":\"Traditional Native Alaskan art gallery featuring authentic pieces including carved masks, jewelry, and textiles.\",\"stopAddress\":\"348 S Franklin St, Juneau, AK 99801\"},{\"stopName\":\"Annie Kaill's\",\"durationToSpendAt\":\"25 minutes\",\"detailsAboutStop\":\"Local art gallery and gift shop featuring Alaskan artists, jewelry, and unique gifts. Known for its curated collection of contemporary Alaskan art.\",\"stopAddress\":\"244 Front St, Juneau, AK 99801\"},{\"stopName\":\"Sketch\",\"durationToSpendAt\":\"20 minutes\",\"detailsAboutStop\":\"Boutique featuring local designers, unique clothing, and accessories with an Alaskan twist.\",\"stopAddress\":\"113 Seward St, Juneau, AK 99801\"},{\"stopName\":\"The Canvas Community Art Studio & Gallery\",\"durationToSpendAt\":\"30 minutes\",\"detailsAboutStop\":\"Community art space featuring works by local artists with disabilities. Includes a gallery shop with unique pieces.\",\"stopAddress\":\"223 Seward St, Juneau, AK 99801\"},{\"stopName\":\"Caribou Crossing\",\"durationToSpendAt\":\"20 minutes\",\"detailsAboutStop\":\"Boutique featuring Alaskan-made products, art pieces, and unique gifts.\",\"stopAddress\":\"387 S Franklin St, Juneau, AK 99801\"}]}"}
        // const response = await fetch(url, {
        //     method: 'GET',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        // });
        // if (!response.ok) {
        //     throw new Error(`HTTP error! status: ${response.status}`);
        // }
        // const parsedResponse = await response.json()
        // TOOD validate full response
        const parsedResponseBody = JSON.parse(parsedResponse.body)
        return parsedResponseBody;
    } catch (e) {
        console.error('Error:', e)
    }
}

export default getItinerary;
