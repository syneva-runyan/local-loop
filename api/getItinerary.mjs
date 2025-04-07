import fetch from 'node-fetch';
const supportedVibes = ['nature', 'drinking', 'botiques', 'art', 'history'];

function isValidRequest(parameters) {
    if(!parameters ||  !parameters.duration || !parameters.vibes) {
        return false;
    }
    if (isNaN(parameters.duration.hours) || isNaN(parameters.duration.minutes)) {
        if (!(parameters.duration.hours > 0 && parameters.duration.hours < 12)) {
            return false;
        }
        if (!(parameters.duration.hours > 0 && parameters.duration.hours < 60)) {
            return false;
        }
    }

    if (!Array.isArray(parameters.vibes)) {
        return false;
    }

    for (vibe of parameters.vibes) {
        if (!supportedVibes.contains(vibe)) {
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

  console.log(`Received request duration ${event.queryStringParameters.duration.hours} hours and ${event.queryStringParameters.duration.minutes} minutes with vibes ${event.queryStringParameters.vibes}`);


  // Call LLM to create tour
  const itineraryResponse = await getTourItinerary(event.queryStringParameters);
  return itineraryResponse;
}

function returnSuccess(guestData) {
  return {
    statusCode: 200,
    body: JSON.stringify({ guestData: guestData }),
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*",

    },
  };
}

function returnError(error) {
  return {
    statusCode: 500,
    body: JSON.stringify({ error }),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
  };
}

  

/**
 * Prints the rows of the wedding RSVP spreadsheet
 */
async function getTourItinerary(parameters) {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'x-api-key': '',
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
                Create a personalized tour itinerary for me.  Tour should be walkable and fit within ${parameters.duration.hours} hours and ${parameters.duration.minutes}.
                I'm particularly interested in ${parameters.vibes}.

                Respond with the format:
                {
                    destination:
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

    const data = await response.json();
    console.log(data);
}