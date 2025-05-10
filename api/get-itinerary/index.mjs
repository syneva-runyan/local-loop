import { JWT } from 'google-auth-library';
import AWS  from 'aws-sdk';

const secretsManager = new AWS.SecretsManager({ region: 'us-east-1' });

import supportedLocations from './data/supportedLocations.mjs';

const supportedVibes = ['parks', 'drinking', 'boutiques', 'art', 'history', 'food', 'free photogenic places'];

function cleanResponse(text) {
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
    if (!(parameters.duration.hours >= 0 && parameters.duration.hours < 6)) {
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
      getTourItinerary(event.queryStringParameters, supportedLocations[location]?.exclude),
      getMainTourPhoto(location),
    ]);

    const tour = { ...itineraryResponse }

    const tourId = await saveGeneratedTour(location, tour);
    const responseBody = {
      ...itineraryResponse,
      photo: mainTourPhoto,
      tourId,
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
  const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${googlePlaceId}&key=${process.env.GOOGLE_PLACES_API_KEY}&maxheight=400`;
  const response = await fetch(url);
  try {
    const json = await response.json();
    // arbitrarily select first photo for now.
    //const randomSelection = Math.round((json.result.photos.length - 1) * Math.random());
    const photo = json.result.photos[supportedLocations[location]?.preferedPhotoIdx || 0];
    return photo;
  } catch (e) {
    throw new Error("Could not get tour photo", e.toString());
  }

}

async function getDistanceBetweenLocations(location1, location2) {
  const origin = encodeURIComponent(location1);
  const destination = encodeURIComponent(location2);
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&mode=walking&units=imperial&key=${process.env.GOOGLE_PLACES_API_KEY}`;

  const response = await fetch(url);

  try {
    const data = await response.json();

    if (
      data.status === "OK"
    ) {
      return `Origin: ${location1} ${data.origin_addresses}, Destination: ${location2} ${data.destination_addresses}, Distance: ${data.rows[0].elements[0].distance.text}, Walking Distance to Destination: ${data.rows[0].elements[0].duration.text}`;
    } else {
      throw new Error("Could not retrieve distance data");
    } 
  } catch(e) {
    console.log(`Error fetching distance: ${e}`);
  }
}

function getPrompt(parameters, exclude) {
  return `
  TASK: Come up with a personalized walking tour itinerary.
  TOUR PARAMETERS:
    location: ${parameters.location}
    duration: ${parameters.hours} hours and ${parameters.minutes} minutes
    theme: ${parameters.vibes}
  REQUIREMENTS:
    Source of Truth: DO NOT MAKE UP INFORMATION.
    Tour Design:
      Start the tour in  ${parameters.location}.
      Only include stops that are within a ten minute walk (about 1 mile / 1.6 kilometers) of each other.
      The entire itinerary, including walking time, must fit within the allotted time.
      Include backup locations in case the first choice is not available.
  Content Guidelines:
    Only include locations in ${parameters.location}.
    Do not include places that are only open during events or events.
    Focus on unique locally owned businesses.
    Prefer free stops over paid ones.
    Don not spend less than 10 minutes at any stop.
    Do not spend more than 20 minutes at a shop.
    Do not spend less than 20 minutes at a restaurant.
    Do not duplicate stops.
    Do not include ${exclude}`
}

function getSystemInstructions() {
  return `
      After putting together the itinerary, you must verify walking distances between each stop using the getDistanceBetweenLocations. If walking distance is unknown, do not include the stop.
      Do not abstract citation urls to a different part of the response.
 `
}

 function getGroundedResponsePrompt(itinerary, distancesBetweenLocations, parameters, exclude) {
  return `
    Given these distances between locations: ${distancesBetweenLocations},
    
    and the provided walking tour itinerary,  replace stops that have more than a 15 minute walk distance from the destination origin.
    ${itinerary}
    
    Try to verify replacement locations with Google to check that the stop is open and is walkable from the previous stop.
    Exlude these locations when selecting replacement stops: ${exclude}.

    Tour should span ${parameters.hours} hours and ${parameters.minutes} minutes.


    For each stop, include 2 paragraphs of factual, engaging background, emphasizing historical or cultural significance and including why the stop was included on the tour.
    Include one to two sentences in a short tour description that encourages someone to take the tour.
    Inclue a welcomeNarration for the tour that is 1 paragraph long and kicks off the tour in a friendly and engaging way and references local history and if appropriate for the area, indigenous culture.
    DO NOT MAKE UP INFORMATION.
    Only include facts you can verify with a reliable source. For each fact, include the source URL where it was found.


    ALWAYS Response with an itinerary using this format:
    {
          tourName:
          shortTourDescription:
          citations: [URLS]
          walkingDistanceCoveredInTour:
          welcomeNarration:
          stops: [{
              stopName:
              stopAddress:
              durationToSpendAt: "x minutes"
              detailsAboutStop:
              shortDescription:
              citations: [URLS]
              walkingDistanceToNextStop:
          }]
      }
  `
}

async function getTourItinerary(parameters, locationDetails) {
  const gLocation = 'us-west1';
  const projectId = 'localloop-456415';
  const modelId = 'gemini-2.0-flash';
  // Get secret from Secrets Manager
  const secret = await secretsManager.getSecretValue({
    SecretId: 'vertext-service-account-credentials'
  }).promise();

  const keyJson = JSON.parse(JSON.parse(secret.SecretString)?.["service-account.json"]);

  // Create Google Auth client
  const client = new JWT({
    email: keyJson.client_email,
    key: keyJson.private_key,
    scopes: ['https://www.googleapis.com/auth/cloud-platform']
  });


  const { token } = await client.getAccessToken();

  const url = `https://${gLocation}-aiplatform.googleapis.com/v1beta1/projects/${projectId}/locations/${gLocation}/publishers/google/models/${modelId}:generateContent`;

  const body = {
    contents: [{
      "role": "user",
      "parts": [{
        "text": `${getPrompt(parameters, locationDetails)}\n${getSystemInstructions()}`,
      }]
    }],
    "tools": [{
      function_declarations: [{
        name: "getDistanceBetweenLocations",
        description: "Returns the distance in kilometers between two named locations.",
        parameters: {
          type: "object",
          properties: {
            origin: {
              type: "string",
              description: "The starting location name (e.g., 'Shoefly, Juneau')",
            },
            destination: {
              type: "string",
              description: "The ending location name (e.g., 'Hertiage Coffee Downtown Juneau, Alaska')",
            },
          },
          required: ["origin", "destination"],
        }
      }],
    }],
    "model": `projects/${projectId}/locations/${gLocation}/publishers/google/models/${modelId}`,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    const itinerary = data.candidates[0].content.parts[0].text;
    const functionCallsRequested = data.candidates[0].content.parts.filter(part => part.functionCall);
    const functionCallResponses = [];
    console.log("function calls requested", data.candidates[0].content.parts);
    for (let callRequest of functionCallsRequested) {
      const callDetails = callRequest.functionCall;
      if(callDetails?.name == "getDistanceBetweenLocations") {
        const distance = await getDistanceBetweenLocations(
          callDetails?.args.origin, callDetails?.args.destination
        );
        functionCallResponses.push(distance);
      }
    }

    console.log("grounding function callresponses", functionCallResponses);

    const groundedResponse = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          "role": "user",
          "parts": [{ 
            "text": getGroundedResponsePrompt(itinerary, functionCallResponses, parameters, locationDetails)
          }],  
        }],
        "tools": [{
          "googleMaps": {
            "authConfig": {
              "apiKeyConfig": {
                "apiKeyString": process.env.GEMINI_API_KEY,
              }
            }
          }
        }],
        "toolConfig": {
          "retrievalConfig": {
            "latLng": {
              "latitude": locationDetails?.latitude || 0,
              "longitude": locationDetails?.longitude || 0,
            }
          }
        },
        "model": `projects/${projectId}/locations/${gLocation}/publishers/google/models/${modelId}`,
      })
    }); 
    

    const finalData = await groundedResponse.json();
    console.log("successfully got tour", finalData.candidates[0].content.parts);
    const importantPartOfResponse = finalData.candidates[0].content.parts.filter(part => part?.text.indexOf("```json") !== -1);
    console.log(importantPartOfResponse)
    const tourJSON = JSON.parse(cleanResponse(importantPartOfResponse[0].text));
    return tourJSON
  } catch (e) {
    throw new Error(e.toString());
  }
}

async function saveGeneratedTour(location, tour) {
  const uniqueId = Math.random().toString(36);
  // Configure your AWS credentials and region
  AWS.config.update({
    region: 'us-east-1', // change to your region
    accessKeyId: process.env.AWS_ACCESS_KEY_ID_LAMBDA,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  });

  // Create S3 instance
  const s3 = new AWS.S3();

  // Upload to S3
  const params = {
    Bucket: 'local-loop',
    Key: `tours/${encodeURIComponent(location)}/${uniqueId}.json`, // Specify the path and filename
    Body: JSON.stringify({
      location,
      ...tour
    }),
    ContentType: 'application/json'
  };

  const response = await s3.upload(params).promise();
  return uniqueId;
}