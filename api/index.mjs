import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
const app = express();
const port = 8000;


dotenv.config();

import { handler as getItinerary } from "./getItinerary.mjs";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("")
    next();
});


app.get('/get-itinerary', async (req, res) => {
    console.log("got the request");
    res.send(JSON.stringify({ "status": 200, body: "hello word"}));
    // const resp = await getItinerary({
    //     queryStringParameters: req.query
    // });
    // res.send({
    //     statusCode: 200,
    //     body: `{"tourName":"Juneau Nature Walk & Waterfront Experience","tourDescription":"A scenic walking tour through downtown Juneau focusing on natural attractions 
    //       and waterfront views, perfectly suited for nature enthusiasts. This 2.5-hour tour combines urban trails, forest paths, and seaside walks.","stops":[{"stopName":"Mount Roberts Trailhead","durationToSpendAt":"30 minutes","detailsAboutStop":"Start at the lower portion of the famous Mount Roberts Trail. Even a short trek offers 
    //       beautiful forest views and potential wildlife sightings. The beginning section is manageable for most visitors.","stopAddress":"490 S Franklin St, Juneau, AK 99801"},{"stopName":"Cope Park","durationToSpendAt":"25 minutes","detailsAboutStop":"A peaceful urban park with Gold Creek running through it. Offers excellent salmon viewing opportunities (in season) and walking trails surrounded by local vegetation.","stopAddress":"12th Street, Juneau, AK 99801"},{"stopName":"Evergreen Cemetery Trail","durationToSpendAt":"20 minutes","detailsAboutStop":"A serene wooded path with old-growth trees and occasional wildlife sightings. The trail connects to the historic cemetery which tells stories of Juneau's past.","stopAddress":"635 Seater St, Juneau, AK 99801"},{"stopName":"Seawalk","durationToSpendAt":"45 minutes","detailsAboutStop":"A waterfront promenade offering spectacular views of the Gastineau Channel, mountains, and potential whale sightings. Great for spotting seabirds and harbor seals.","stopAddress":"South Franklin Street, Juneau, AK 99801"},{"stopName":"Capital Park and Whale Sculpture","durationToSpendAt":"30 minutes","detailsAboutStop":"End your tour at this waterfront park featuring the famous bronze whale sculpture. Excellent spot for photography and viewing the natural harbor landscape.","stopAddress":"127 S Franklin St, Juneau, AK 99801"}]}`,
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Access-Control-Allow-Origin': '*'
    //     }
    // });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
