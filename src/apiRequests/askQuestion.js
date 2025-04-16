import constants from "./constants";

// get a personalized itinerary based on provided params
const askQuestion = async ( question, stopName) => {
    // return mockedResponse;
    // construct request url
    const urlParams = new URLSearchParams();
    urlParams.append("location", encodeURIComponent(stopName));
    urlParams.append("question", encodeURIComponent(question));

    var url = new URL(constants.ASK_QUESTION_ENDPOINT);
    url.search = urlParams;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const parsedResponse = await response.json();
        // TOOD validate response
        return parsedResponse;
    } catch (e) {
        console.error('Error:', e)
        return { error: true };
    }
}

export default askQuestion;
