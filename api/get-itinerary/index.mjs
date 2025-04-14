import supportedLocations from './data/supportedLocations.mjs';
const supportedVibes = ['nature', 'drinking', 'boutiques', 'art', 'history', 'food', 'instagramable places'];

function isValidRequest(parameters) {
  if (!parameters || !parameters.hours || !parameters.minutes || !parameters.vibes) {
    return false;
  }

  if (isNaN(parameters.hours) || isNaN(parameters.minutes)) {
    if (!(parameters.duration.hours > 0 && parameters.duration.hours < 12)) {
      return false;
    }
    if (!(parameters.minutes > 0 && parameters.minutes < 60)) {
      return false;
    }
  }

  const vibes = decodeURIComponent(parameters.vibes);

  const vibesArray = vibes.split(",");
  console.log(vibesArray);
  if (!Array.isArray(vibesArray)) {
    return false;
  }

  for (let vibe of vibesArray) {
    if (!supportedVibes.includes(vibe)) {
      return;
    }
  }

  return true;
}

export const handler = async (event) => {
  // validate request
  if (!isValidRequest(event.queryStringParameters)) {
    return returnError("Please provide valid tour parameters");
  }

  
  const location = decodeURIComponent(event.queryStringParameters.location);
  console.log(`Received request for ${location}, duration ${event.queryStringParameters.hours} hours and ${event.queryStringParameters.minutes} minutes with vibes ${event.queryStringParameters.vibes}`);

  // Call LLM & google maps to create tour
  const [itineraryResponse, mainTourPhoto] = await Promise.all([
    getTourItinerary(event.queryStringParameters),
    getMainTourPhoto(location)
  ]);

  const responseBody = {
    ...itineraryResponse,
    photo: mainTourPhoto,
  }
  return returnSuccess(responseBody);
}

function returnSuccess(data) {
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET,OPTIONS",
    },
    body:  JSON.stringify(data),
  };
}

function returnError(error) {
  return {
    statusCode: 500,
    body: JSON.stringify({ error })
  };
}

async function getMainTourPhoto(location) {
  const googlePlaceId = supportedLocations[location]?.googlePlaceId;
  const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${googlePlaceId}&key=${process.env.GOOGLE_PLACES_API_KEY}`;
  const response = await fetch(url);
  try {
    const json = await response.json();
    // arbitrarily select first photo for now.
    const photo = json.result.photos[0];
    return photo;
  } catch (e) {
    throw new Error("Could not get tour photo", e.toString());
  }

}



/**
 * Prints the rows of the wedding RSVP spreadsheet
 */
async function getTourItinerary(parameters) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.CLAUDE_API_KEY,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `
                I'm visiting ${parameters.location} Create a personalized tour itinerary for me and sell me on why I should go on it. 
                Tour should be walkable and fit within ${parameters.hours} hours and ${parameters.minutes} - account for the time it take to walk between stops.
                I'm particularly interested in ${parameters.vibes}.
                Details about the stop should include a paragraph or two of interesting background about the shop, partiularly featuring history. 
                DO NOT MAKE THINGS UP and include citation urls.
                I'm traveling on foot. Minimize Walking distance between stops.

                Always respond in this format:
                {
                    tourName:
                    shortTourDescription:
                    citations:
                    stops: [{
                        stopName: x,
                        durationToSpendAt: x,
                        detailsAboutStop: x,
                        shortDescription: x,
                        stopAddress: x,
                        citations: [x..],
                        timeToNextStop: x or 0,
                    }]
                }
                `
        }
      ]
    })
  });

  try {
    const data = await response.json();
    const tourJSON = JSON.parse(data.content[0].text);
    return tourJSON;
  } catch (e) {
    return returnError(e.toString());
  }
}