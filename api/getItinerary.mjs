import fetch from 'node-fetch';
const supportedVibes = ['nature', 'drinking', 'boutiques', 'art', 'history'];

function isValidRequest(parameters) {
    if(!parameters ||  !parameters.hours || !parameters.minutes || !parameters.vibes) {
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
    const vibesArray = vibes.split("+");
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

export const handler =  async (event) => {
  // validate request
  if (!isValidRequest(event.queryStringParameters)) {
    return  returnError("Please provide valid tour parameters");
  }

  console.log(`Received request duration ${event.queryStringParameters.hours} hours and ${event.queryStringParameters.minutes} minutes with vibes ${event.queryStringParameters.vibes}`);


  // Call LLM to create tour
  const itineraryResponse = await getTourItinerary(event.queryStringParameters);
  return itineraryResponse;
}

function returnSuccess(data) {
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
}

function returnError(error) {
  return {
    statusCode: 500,
    body: JSON.stringify({ error })
  };
}

  

/**
 * Prints the rows of the wedding RSVP spreadsheet
 */
async function getTourItinerary(parameters) {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'x-api-key': 'xxx',
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
                I'm visiting ${parameters.location} Create a personalized tour itinerary for me.  Tour should be walkable and fit within ${parameters.hours} hours and ${parameters.minutes}.
                I'm particularly interested in ${parameters.vibes}. I'm traveling on foot.

                Respond with the format:
                {
                    tourName:
                    tourDescription:
                    stops: [{
                        durationToSpendAt: x,
                        detailsAboutStop: x,
                        stopAddress: x,
                    }]
                }
                `
            }
            ]
        })
    });

    try {
    const data = await response.json();
    const constructJSON = JSON.parse(data.content[0].text);
    return returnSuccess(constructJSON);
    } catch(e) {
      return returnError(e.toString());
    }
}