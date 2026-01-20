import { getFetch } from '../util/fetch.mjs';

export const handler = async (event) => {
  const queryParams = event.queryStringParameters || {};
  const ref = queryParams.ref;

  if (!ref) {
    return {
      statusCode: 400,
      body: 'Missing photo reference',
    };
  }

  const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxheight=400&photoreference=${ref}&key=${process.env.GOOGLE_PLACES_API_KEY}`;

  try {
    const fetch = await getFetch();
    const response = await fetch(photoUrl, { redirect: 'follow' });

    const contentType = response.headers.get('content-type') || 'image/jpeg';
    const arrayBuffer = await response.arrayBuffer();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400',
      },
      body: Buffer.from(arrayBuffer).toString('base64'),
      isBase64Encoded: true,
    };
  } catch (error) {
    console.error('Error fetching photo:', error);
    return {
      statusCode: 500,
      body: 'Error retrieving photo',
    };
  }
};
