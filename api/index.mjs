import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
const app = express();
const port = 3030;


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
    // const resp = await getItinerary({
    //     queryStringParameters: req.query
    // });
    res.json({
        "statusCode": 200,
        "body": "{\"tourName\":\"Juneau Arts & Boutiques Walking Tour\",\"tourDescription\":\"A charming 2.5-hour walking tour through downtown Juneau focusing on local art galleries, unique boutiques, and cultural spots. This route is easily walkable and showcases the best of Juneau's artistic side.\",\"stops\":[{\"stopName\":\"Juneau Arts & Culture Center\",\"durationToSpendAt\":\"30 minutes\",\"detailsAboutStop\":\"Start at this community hub featuring rotating exhibitions of local artists and Alaska Native art. The center often hosts temporary exhibits and has a gift shop with local artisan works.\",\"stopAddress\":\"350 Whittier St, Juneau, AK 99801\"},{\"stopName\":\"Alaska Native Arts & Crafts\",\"durationToSpendAt\":\"25 minutes\",\"detailsAboutStop\":\"Traditional Native Alaskan art gallery featuring authentic pieces including carved masks, jewelry, and textiles.\",\"stopAddress\":\"348 S Franklin St, Juneau, AK 99801\"},{\"stopName\":\"Annie Kaill's\",\"durationToSpendAt\":\"25 minutes\",\"detailsAboutStop\":\"Local art gallery and gift shop featuring Alaskan artists, jewelry, and unique gifts. Known for its curated collection of contemporary Alaskan art.\",\"stopAddress\":\"244 Front St, Juneau, AK 99801\"},{\"stopName\":\"Sketch\",\"durationToSpendAt\":\"20 minutes\",\"detailsAboutStop\":\"Boutique featuring local designers, unique clothing, and accessories with an Alaskan twist.\",\"stopAddress\":\"113 Seward St, Juneau, AK 99801\"},{\"stopName\":\"The Canvas Community Art Studio & Gallery\",\"durationToSpendAt\":\"30 minutes\",\"detailsAboutStop\":\"Community art space featuring works by local artists with disabilities. Includes a gallery shop with unique pieces.\",\"stopAddress\":\"223 Seward St, Juneau, AK 99801\"},{\"stopName\":\"Caribou Crossing\",\"durationToSpendAt\":\"20 minutes\",\"detailsAboutStop\":\"Boutique featuring Alaskan-made products, art pieces, and unique gifts.\",\"stopAddress\":\"387 S Franklin St, Juneau, AK 99801\"}]}"
    });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
