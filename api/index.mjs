import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { Readable } from 'stream';
import { getFetch } from './util/fetch.mjs';

const app = express();
const port = 3030;

dotenv.config();

import { handler as getItinerary } from "./get-itinerary/index.mjs";
import { handler as askQuestion } from "./ask-question/index.mjs";
import { handler as getTour } from "./get-existing-tour/index.mjs";
import { handler as shareFeedback } from "./share-feedback/index.mjs";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(function(req, res, next) {
    console.log("getting reqest")
    res.header("Access-Control-Allow-Origin", "*");
    res.header("")
    next();
});

function sendLambdaJson(res, resp) {
  if (!resp || typeof resp.body !== 'string') {
    return res.status(500).json({ error: 'Handler returned no body', resp });
  }
  try {
    return res.status(resp.statusCode || 200).json(JSON.parse(resp.body));
  } catch (e) {
    return res.status(500).json({ error: 'Failed to parse handler JSON body', body: resp.body });
  }
}


app.get('/get-itinerary', async (req, res) => {
    const resp = await getItinerary({
        queryStringParameters: req.query
    });
  return sendLambdaJson(res, resp);
})

app.get('/ask-question', async (req, res) => {
  const resp = await askQuestion({
      queryStringParameters: req.query
  });
  console.log("RESPONSE", resp) 
  return sendLambdaJson(res, resp);
})

app.get('/get-existing-tour', async (req, res) => {
  const resp = await getTour({
      queryStringParameters: req.query
  });
  console.log("RESPONSE", resp) 
  return sendLambdaJson(res, resp);
})


app.get('/get-place-photo', async (req, res) => {
    const { ref } = req.query;
    if (!ref) return res.status(400).send('Missing photo reference');
  
    const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxheight=400&photoreference=${ref}&key=${process.env.GOOGLE_PLACES_API_KEY}`;

    console.log(photoUrl);
  
    try {
      const fetch = await getFetch();
      const photoResponse = await fetch(photoUrl, { redirect: 'follow' });
      if (!photoResponse) throw new Error('No response from fetch');
      
      // Set appropriate headers
      res.set('Content-Type', photoResponse.headers.get('content-type') || 'image/jpeg');
      res.set('Cache-Control', 'public, max-age=86400');
  
      const body = photoResponse.body;
      if (!body) throw new Error('Response has no body');

      // Node 18+ fetch => WebReadableStream, node-fetch => Node Readable
      if (typeof body.pipe === 'function') {
        body.pipe(res);
      } else {
        Readable.fromWeb(body).pipe(res);
      }
    } catch (error) {
      console.error('Error fetching photo:', error);
      res.status(500).send('Error retrieving photo');
    }
  });

app.get('/share-feedback', async (req, res) => {
  const resp = await shareFeedback({
    queryStringParameters: req.query
  });
  console.log("RESPONSE", resp) 
  return sendLambdaJson(res, resp);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
