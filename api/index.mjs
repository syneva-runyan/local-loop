import express from 'express';
import dotenv from 'dotenv';
const app = express();
const port = 6000;

dotenv.config();

import { handler as getItinerary } from "./getItinerary.mjs";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get('/get-itinerary', async (req, res) => {
    const resp = await getItinerary({
        queryStringParameters: req.query
    });
    res.send(resp.body);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
