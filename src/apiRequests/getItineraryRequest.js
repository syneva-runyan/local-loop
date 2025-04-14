import constants from "./constants";


// const mockedResponse = {
//     "tourName": "Juneau Heritage & Bites Walk",
//     "shortTourDescription": "A 2.5-hour walkable tour through Downtown Juneau, blending rich historical sites with iconic Alaskan culinary experiences.",
//     "citations": [
//       "https://www.traveljuneau.com/listing/juneau-historical-walking-tour/50303/",
//       "https://www.juneaufoodtours.com/tour/tour-with-taste/",
//       "https://en.wikipedia.org/wiki/Red_Dog_Saloon",
//       "https://en.wikipedia.org/wiki/Front_Street_(Juneau,_Alaska)"
//     ],
//     "stops": [
//       {
//         "stopName": "Alaska State Capitol",
//         "durationToSpendAt": "15 minutes",
//         "detailsAboutStop": "The Alaska State Capitol, completed in 1931, originally served as the Federal and Territorial Building before Alaska achieved statehood in 1959. Notably, it lacks a dome, setting it apart from many other state capitols. Inside, visitors can find Tokeen marble columns and exhibits detailing the state's legislative history.",
//         "shortDescription": "Alaska's unique capitol building, rich in political history.",
//         "stopAddress": "120 4th St, Juneau, AK 99801",
//         "citations": [
//           "https://www.traveljuneau.com/listing/juneau-historical-walking-tour/50303/"
//         ],
//         "timeToNextStop": "5 minutes"
//       },
//       {
//         "stopName": "Juneau-Douglas City Museum",
//         "durationToSpendAt": "20 minutes",
//         "detailsAboutStop": "Located across from the Capitol, the museum offers insights into Juneau's founding, mining heritage, and indigenous cultures. Exhibits include artifacts from the Tlingit people and displays on the city's development.",
//         "shortDescription": "Museum showcasing Juneau's rich cultural and mining history.",
//         "stopAddress": "114 W 4th St, Juneau, AK 99801",
//         "citations": [
//           "https://www.traveljuneau.com/listing/juneau-historical-walking-tour/50303/"
//         ],
//         "timeToNextStop": "7 minutes"
//       },
//       {
//         "stopName": "Red Dog Saloon",
//         "durationToSpendAt": "20 minutes",
//         "detailsAboutStop": "Established during Juneau's mining era, the Red Dog Saloon is recognized as the city's oldest man-made tourist attraction. The saloon features memorabilia like Wyatt Earp's pistol and offers a glimpse into frontier life.",
//         "shortDescription": "Historic saloon offering a taste of frontier-era Juneau.",
//         "stopAddress": "278 S Franklin St, Juneau, AK 99801",
//         "citations": [
//           "https://en.wikipedia.org/wiki/Red_Dog_Saloon"
//         ],
//         "timeToNextStop": "3 minutes"
//       },
//       {
//         "stopName": "Tracy's King Crab Shack",
//         "durationToSpendAt": "20 minutes",
//         "detailsAboutStop": "A must-visit for seafood lovers, Tracy's offers renowned king crab legs and bisque. The shack has become synonymous with fresh Alaskan crab, drawing both locals and tourists.",
//         "shortDescription": "Iconic spot for fresh Alaskan king crab delicacies.",
//         "stopAddress": "432 S Franklin St, Juneau, AK 99801",
//         "citations": [
//           "https://www.juneaufoodtours.com/tour/tour-with-taste/"
//         ],
//         "timeToNextStop": "5 minutes"
//       },
//       {
//         "stopName": "Heritage Coffee Roasting Co.",
//         "durationToSpendAt": "15 minutes",
//         "detailsAboutStop": "Established in 1974, Heritage Coffee has been a staple in Juneau, offering locally roasted beans and a cozy atmosphere. It's a perfect spot to experience the local coffee culture.",
//         "shortDescription": "Long-standing local café serving freshly roasted coffee.",
//         "stopAddress": "130 Front St, Juneau, AK 99801",
//         "citations": [
//           "https://www.heritagecoffee.com/about/locations/"
//         ],
//         "timeToNextStop": "5 minutes"
//       },
//       {
//         "stopName": "Front Street Historic District",
//         "durationToSpendAt": "30 minutes",
//         "detailsAboutStop": "Front Street, once the city's waterfront, is now part of the Juneau Downtown Historic District. Notable sites include the Hellenthal Building, now housing Devil's Club Brewing Co., and the Imperial Bar, originally established in 1891.",
//         "shortDescription": "Historic district featuring preserved architecture and landmarks.",
//         "stopAddress": "Front St, Juneau, AK 99801",
//         "citations": [
//           "https://en.wikipedia.org/wiki/Front_Street_(Juneau,_Alaska)"
//         ],
//         "timeToNextStop": "4 minutes"
//       },
//       {
//         "stopName": "Deckhand Dave's",
//         "durationToSpendAt": "20 minutes",
//         "detailsAboutStop": "Known for its panko-crusted salmon and fish tacos, Deckhand Dave's offers a casual dining experience with fresh, locally sourced seafood. It's a favorite among both locals and visitors.",
//         "shortDescription": "Casual eatery serving fresh, locally sourced seafood.",
//         "stopAddress": "139 S Franklin St, Juneau, AK 99801",
//         "citations": [
//           "https://www.juneaufoodtours.com/tour/tour-with-taste/"
//         ]
//       }
//     ],
//     "photo":{
//         "height":2988,
//         "html_attributions":["<a href=\"https://maps.google.com/maps/contrib/109305833294736688175\">David Biddinger</a>"],
//         "photo_reference":"AeeoHcJ54KqvbX5dmWdSyMdiCaB88IfiLo9l__mWzuM157mbNYjqQ2GQTgcoePCQ8io_VEVOTG1bT07lqk1vv1RXB3D9dObehjp4n-EUp3PA180wXw6zzNSbEmuUYDFK2olhvzhm6Wuk6s4mW-Owicq7c-5IwnoE2Uu1VyC-qu3MMz5ILyOpbuodHKOM58ZroLhdjzLj90Bb1hzHGxZyVE8VlnEl8UMcp2xM4ILRJe_ZXeqYRdw4U-82vmf7Jj14Dpk3mPVHgiytmz8F5MuftEF9BJmOfxKDVMO9cl7TVLFOUCvoSq-0V3vbE7ZllaLNkAr4akLqI_BMp5e_R5bwl7aqFe3x7m82go6XlTbp41fD2K2GpKpcjKQM5knRnF4ZJHsm181Jy9Xsq32GVkjWEDiy76LYEm1X9E5nD02Tdxe-A5uvMZqaHH_tCYhu8MCXBdRycsraLp7GnT6eow7HvNCMh-J_8pELfczi4Wq76fC9-OgvH8Ht-s28Qx5BuJnOAM0wfox8NRqrLBO2Lat6puZP1onXT5S409Uo4XYVuqKBxQi72yROMRQnvCGA3Rc-pCYQY9O1idR8Wv1azxnDSNtUlAIidLhI5MrMl3g9bcfnLUIogqIwdo5K-StKVdN3metsZyuFPg",
//         "width":5312
//     }
// };

// get a personalized itinerary based on provided params
const getItinerary = async (location, duration, vibes) => {
    // return mockedResponse;
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
        const parsedResponse = await response.json();
        // TOOD validate response
        return parsedResponse;
    } catch (e) {
        console.error('Error:', e)
        return { error: true };
    }
}

export default getItinerary;
