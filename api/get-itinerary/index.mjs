import { GoogleGenAI } from "@google/genai";
import AWS  from 'aws-sdk';


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
    if (!(parameters.duration.hours >= 0 && parameters.duration.hours < 13)) {
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
      getTourItinerary(event.queryStringParameters, supportedLocations[location]),
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

function getPrompt(parameters, exclude) {
  console.log(exclude);
  return `
  TASK: Generate a personalized walking tour itinerary.
  TOUR PARAMETERS:
    location: ${parameters.location}
    duration: ${parameters.hours} hours and ${parameters.minutes} minutes
    theme: ${parameters.vibes}
  REQUIREMENTS:
    Source of Truth: DO NOT MAKE UP INFORMATION.
    Tour Design:
      Start the tour in  ${parameters.location}.
      Only include stops that are within a ten minute walk (about 1 mile / 1.6 kilometers) of each other
      Reject locations that would require driving, biking, or public transport
      Do not invent places or distances. If unsure about walkability, assume it is NOT walkable.
      The entire itinerary, including walking time, must fit within the allotted time.
  Content Guidelines:
    Focus on locally owned businesses.
    Prefer free stops over paid ones.
    Do not spend more than 20 minutes at a shop.
    Do not spend less than 20 minutes at a restaurant.
    For each stop, include 1 to 2 paragraphs of factual, engaging background, emphasizing historical or cultural significance.
    Include one to two sentences in a short tour description that encourages someone to take the tour.
    Inclue a welcomeNarration for the tour that is 1 paragraph long and kicks off the tour in a friendly and engaging way and references local indigenous culture.
    DO NOT MAKE UP INFORMATION.
    Only include facts you can verify with a reliable source. For each fact, include the source URL where it was found.

    Absolutely do not include ${exclude}`
}

function getSystemInstructions() {
  return `
      Tone and Output Goal: Persuasive and immersive — convince the user why this tour is a unique and valuable experience.
      You have access to Google data and should look up questions about distances, directions, and points of interest.
      Do not abstract citation urls to a different part of the response.

      Always respond in a valid JSON format:
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
  const ai = new GoogleGenAI({ 
    vertexai: true,
    project: 'localloop-456415',
    location: 'us-west1'
  });

  // Set up generation config
  const generationConfig = {
    maxOutputTokens: 8192,
    temperature: 1,
    topP: 0.95,
    responseModalities: ["TEXT"],
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'OFF',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'OFF',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'OFF',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'OFF',
      }
    ],
    tools: [
      { googleSearch: {} },
    ],
  };
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    config: generationConfig,
    contents: `${getPrompt(parameters, locationDetails.exclude)} ${getSystemInstructions()}`,
  });

  try {
    const tourJSON = JSON.parse(cleanResponse(response.text));
    return {
      ...tourJSON,
    }
  } catch (e) {
    console.log(response.text);
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