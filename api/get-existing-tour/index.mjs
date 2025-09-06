import AWS from 'aws-sdk';

import supportedLocations from './data/supportedLocations.mjs';
  
  export const handler = async (event) => {
    const location = event.queryStringParameters.location;
    const tourId = decodeURIComponent(event.queryStringParameters.tourId);
    console.log(`Getting tour ${tourId} for ${location}`);
  
    try {
      const [itineraryResponse, mainTourPhoto] = await Promise.all([
        getTour(location, tourId),
        getMainTourPhoto(location)
      ]);
  
      const responseBody = {
        ...itineraryResponse,
        photo: mainTourPhoto,
      }
      return returnSuccess(responseBody);
    } catch(e) {
      console.log(`Received error - Error: ${e}`);
      return returnError(e);
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
    const googlePlaceId = supportedLocations[decodeURIComponent(location)]?.googlePlaceId;
    const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${googlePlaceId}&key=${process.env.GOOGLE_PLACES_API_KEY}&maxheight=400`;
    const response = await fetch(url);

    try {
      const json = await response.json();
      // arbitrarily select first photo for now.
      //const randomSelection = Math.round((json.result.photos.length - 1) * Math.random());
      const preferedPhotoIdx = supportedLocations[decodeURIComponent(location)]?.preferedPhotoIdx || 0;
      const photo = json.result.photos[preferedPhotoIdx];
      return photo;
    } catch (e) {
      throw new Error("Could not get tour photo", e.toString());
    }
  
  }
  
  
  /**
   * Get saved tour details
   */
  async function getTour(location,tourId) {
    // Configure your AWS credentials and region
    AWS.config.update({
        region: 'us-east-1', // change to your region
        accessKeyId: process.env.AWS_ACCESS_KEY_ID_LAMBDA,
        secretAccessKey: process.env.AWS_SECRET_KEY,
    });

    // Create S3 client
    const s3 = new AWS.S3();

    console.log(`Getting tour from S3 bucket ${location}/${tourId}.json`);

    // Set params
    const params = {
        Bucket: 'local-loop',
        Key: `tours/${location}/${tourId}.json`
    };

    // Get object
    const tour = await s3.getObject(params).promise();
    const jsonString = tour.Body.toString('utf-8');
    const jsonData = JSON.parse(jsonString);
    return jsonData;
}
