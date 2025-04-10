import constants from "./constants";

const mockResponse = {
    "tourName":"Juneau's Historic Pub & Gold Rush Trail",
    "shortTourDescription":"Experience Juneau's rich Gold Rush history while enjoying local craft beers and spirits on this 2.5-hour walking tour through downtown. Visit historic saloons, learn about mining heritage, and discover how alcohol shaped Alaska's capital city.",
    "citations":["Alaska State Library Historical Collections","City and Borough of Juneau Historical Records","Juneau-Douglas City Museum Archives"],
    "stops":[{"stopName":"Alaska State Capitol","durationToSpendAt":"20 minutes","detailsAboutStop":"Start your tour at Alaska's Capitol building, built in 1931. This Art Deco structure represents Juneau's transition from mining town to state capital. The building offers free tours and contains historical exhibits about Alaska's journey to statehood.","shortDescription":"Historical government building marking Juneau's political importance","stopAddress":"120 4th Street, Juneau, AK 99801","citations":"Alaska State Legislature Archives"},{"stopName":"Red Dog Saloon","durationToSpendAt":"45 minutes","detailsAboutStop":"This iconic saloon dates back to Juneau's mining era. Originally opened during the Gold Rush, it features original decor, sawdust floors, and mining memorabilia. Try their famous Duck Fart Shot, a local favorite. Live music often plays during operating hours.","shortDescription":"Historic Gold Rush-era saloon with authentic frontier atmosphere","stopAddress":"278 S Franklin St, Juneau, AK 99801","citations":"National Register of Historic Places"},{"stopName":"Imperial Saloon","durationToSpendAt":"30 minutes","detailsAboutStop":"One of Alaska's oldest bars, operating since 1891. Features original bar fixtures and historical photos. Famous for serving miners during the Gold Rush and surviving prohibition by operating as a 'soft drink parlor.'","shortDescription":"Historic bar with original Gold Rush-era features","stopAddress":"241 Front Street, Juneau, AK 99801","citations":"Juneau Empire Historical Archives"},{"stopName":"Amalga Distillery","durationToSpendAt":"30 minutes","detailsAboutStop":"Modern craft distillery showcasing Alaska's contemporary spirits scene. Their signature Junius gin uses local botanicals. Offers tastings and history of prohibition in Juneau.","shortDescription":"Local distillery connecting historical and modern drinking culture","stopAddress":"134 N Franklin St, Juneau, AK 99801","citations":"Alaska Drinking History Project"},{"stopName":"Last Chance Mining Museum","durationToSpendAt":"25 minutes","detailsAboutStop":"Located in the historic compressor building of the Alaska-Juneau Gold Mining Company. Features mining equipment, photographs, and exhibits about mining life, including how saloons played a central role in miners' social lives.","shortDescription":"Mining museum highlighting Gold Rush history","stopAddress":"1001 Basin Rd, Juneau, AK 99801","citations":"Alaska Mining Hall of Fame Foundation"}],
    "photo":{"height":710,"html_attributions":["<a href=\"https://maps.google.com/maps/contrib/110338195705237783781\">NEHA KANKAR</a>"],
       "photo_reference":"AeeoHcKj7vbyqk34Oh-dA6RRd94OIuxx3BxQjepGhGbQZFWaoKJHgnm575lG7F7S5rjK7RG7OFq3Y5y8kCluaR7r8f8QflusR6O6YARjS66V7y3z_QwHZlTyRVVKivB_7d-u5WyYr8DcYyK28xlKyU5pMa-DG_qS0pvN3kD7pzQ7sCNc3sk8Ugd_bxJ50Eex58lA-odCtVJUcxydh-BQN9D6hXZ2ILVMwTFTUgTCRJGugzh_TU2whxYc_yF1Yzb05Bk3KIoPaqKMoZFUWvIWZxLNAK6IeV3nn39zeaOJhtuFz0-WXScUDJyVvyXZw5TOOP-kmDSLcRB163wxxmO1tlB9IphFiS3gGXDjLllKPx711jMxu0DQNEJN1p9ZFqtrCDO3-KHhifva7zrxkvlay0cxoiZWVtcL0T_auyERqMlj-nhRqYEwCX5Y682O1QBqnPaQHXMGV4wk9PBmLGIeqqV08Rrsfcd9tFYc0WjYS8LKiA39aMocDMGJxxxqCbeAs-Zop-GR78tfyfl4099boc7bt58bNjI25k_f37DlZKM9aLij5RX_gVwrcdjkkwtkvRRNopiN3n6M",
       "width":1080
     }
   };

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
        // // TOOD validate full response
        // const parsedResponseBody = JSON.parse(parsedResponse.body)
        return mockResponse;
    } catch (e) {
        console.error('Error:', e)
    }
}

export default getItinerary;
