const local = "http://127.0.0.1:3030";
const prod = "https://mz30hoge6l.execute-api.us-east-1.amazonaws.com";

const useMe = prod;

const constants = {
    GET_ITINERARY_ENDPOINT: `${useMe}/get-itinerary`,
    ASK_QUESTION_ENDPOINT: `${useMe}/ask-question`,
    GET_PHOTO_ENDPOINT: `${useMe}/get-place-photo`,
    GET_TOUR_ENDPOINT: `${useMe}/get-existing-tour`,
    SHARE_FEEDBACK_ENDPOINT: `${useMe}/share-feedback`,
}

export default constants;
