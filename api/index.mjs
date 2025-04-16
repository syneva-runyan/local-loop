import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { Readable } from 'stream';

const app = express();
const port = 3030;


dotenv.config();

import { handler as getItinerary } from "./get-itinerary/index.mjs";
import { handler as askQuestion } from "./ask-question/index.mjs";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(function(req, res, next) {
    console.log("getting reqest")
    res.header("Access-Control-Allow-Origin", "*");
    res.header("")
    next();
});


app.get('/get-itinerary', async (req, res) => {
    const resp = await getItinerary({
        queryStringParameters: req.query
    });
    res.json(JSON.parse(resp.body));
})

app.get('/ask-question', async (req, res) => {
  const resp = await askQuestion({
      queryStringParameters: req.query
  });
  res.json(JSON.parse(resp.body));
})


app.get('/get-place-photo', async (req, res) => {
    const { ref } = req.query;
    if (!ref) return res.status(400).send('Missing photo reference');
  
    const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxheight=400&photoreference=${ref}&key=${process.env.GOOGLE_PLACES_API_KEY}`;

    console.log(photoUrl);
  
    try {
      const photoResponse = await fetch(photoUrl, { redirect: 'follow' });
      
      // Set appropriate headers
      res.set('Content-Type', photoResponse.headers.get('content-type') || 'image/jpeg');
      res.set('Cache-Control', 'public, max-age=86400');
  
      const webStream = photoResponse.body;
      const nodeStream = Readable.fromWeb(webStream); // 👈 convert
      nodeStream.pipe(res); // ✅ now works!
    } catch (error) {
      console.error('Error fetching photo:', error);
      res.status(500).send('Error retrieving photo');
    }
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
