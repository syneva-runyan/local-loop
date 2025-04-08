import constants from "./constants";

// get a personalized itinerary based on provided params
const getItinerary = (location, duration, vibes) => {
    var xhr = new XMLHttpRequest();
    
    return new Promise((resolve, reject) => {
        xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            try {
                resolve(JSON.parse(this.responseText));
            } catch(e) {
                reject(e)
            }
        }
        });
        
        xhr.open("GET", `${constants.GET_ITINERARY_ENDPOINT}?location=${encodeURIComponent(location)}&hours=${encodeURIComponent((duration.hours))}&minutes=${encodeURIComponent(duration.minutes)}&vibes=${encodeURIComponent(vibes)}`);
        
        xhr.send();
    });
}

export default getItinerary;
