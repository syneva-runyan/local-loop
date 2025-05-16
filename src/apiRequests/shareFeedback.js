import constants from "./constants";

const shareFeedback = async ( sentiment, feedback) => {
    const urlParams = new URLSearchParams();
    urlParams.append("sentiment", encodeURIComponent(sentiment));
    urlParams.append("feedback", encodeURIComponent(feedback));

    var url = new URL(constants.SHARE_FEEDBACK_ENDPOINT);
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

export default shareFeedback;
