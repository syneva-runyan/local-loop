import supportedLocations from './data/supportedLocations.mjs';
const supportedVibes = ['nature', 'drinking', 'boutiques', 'art', 'history', 'food', 'free photogenic places', 'pottery', 'books', 'sweets'];

function cleanClaudeResponse(text) {
  return text
    .replace(/^```json\n/, '')   // Remove leading ```json\n
    .replace(/^```/, '')         // Just in case it's only ``` at the start
    .replace(/```$/, '')         // Remove trailing ```
    .trim();                     // Trim extra whitespace
}

function isValidRequest(parameters) {
  if (!parameters || !parameters.hours || !parameters.minutes || !parameters.vibes) {
    return false;
  }

  if (isNaN(parameters.hours) || isNaN(parameters.minutes)) {
    if (!(parameters.duration.hours > 0 && parameters.duration.hours < 7)) {
      return false;
    }
    if (!(parameters.minutes > 0 && parameters.minutes < 60)) {
      return false;
    }
  }

  const vibes = decodeURIComponent(parameters.vibes);

  const vibesArray = vibes.split(",");
  if (!Array.isArray(vibesArray)) {
    return false;
  }

  for (let vibe of vibesArray) {
    if (!supportedVibes.includes(vibe)) {
      return false;
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
  try {
    const [itineraryResponse, mainTourPhoto] = await Promise.all([
      getTourItinerary(event.queryStringParameters),
      getMainTourPhoto(location)
    ]);

    const responseBody = {
      ...itineraryResponse,
      photo: mainTourPhoto,
    }
    return returnSuccess(responseBody);
  } catch(e) {
    console.log(`Received error - Error: ${e}`);
    returnError(e.toString());
  }
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
      model: 'claude-3-5-haiku-latest',
      max_tokens: 3024,
      messages: [
        {
          role: 'user',
          content: `
          TASK: Generate a personalized walking tour itinerary.
          TOUR PARAMETERS:
            location: ${parameters.location}
            duration: ${parameters.hours} hours and ${parameters.minutes} minutes
            theme: ${parameters.vibes}
          REQUIREMENTS:
            Source of Truth: Only use locations currently listed on https://www.traveljuneau.com. Do not fabricate information.
            Tour Design:
              All stops must be within a 20-minute walking distance of each other.
              The entire itinerary must fit within the allotted time, including walking time.
          Content Guidelines:
            Focus on locally owned businesses.
            Prioritize highly reviewed locations.
            For each stop, include 1 to 2 paragraphs of factual, engaging background, emphasizing historical or cultural significance.
            Provide citation URLs for all factual claims or recommendations.

          Tone and Output Goal: Persuasive and immersive — convince the user why this tour is a unique and valuable experience.
                Always respond in a valid JSON format:
                {
                    tourName:
                    shortTourDescription:
                    citations:
                    walkingDistanceCoveredInTour:
                    stops: [{
                        stopName:
                        stopAddress:
                        durationToSpendAt: "x minutes"
                        detailsAboutStop:
                        shortDescription:
                        citations:
                    }]
                }
                `
        }
      ]
    })
  });

  try {
    const data = await response.json();

    const tourJSON = JSON.parse(cleanClaudeResponse(data.content[0].text));
    
    return tourJSON;
  } catch (e) {
    console.log(response.json());
    throw new Error(e.toString());
  }
}