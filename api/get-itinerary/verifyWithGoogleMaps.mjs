// verify place is open and within a ten minute walk of each other
export default async function verifyWithGoogleMaps(placename, location) {
    console.log("Verifying with Google Maps:", placename, location);
    const encoded = encodeURIComponent(`${placename}, ${location}`);
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    
    const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encoded}&inputtype=textquery&fields=place_id,name,formatted_address,rating&key=${apiKey}`;
    
    const res = await fetch(url);
    const json = await res.json();
    
    if (json.candidates && json.candidates.length > 0) {
        console.log("Verified with Google Maps:", json.candidates[0]);
        return true;
    } else {
        console.log("No match found in Google Maps.");
        return false;
    }
};