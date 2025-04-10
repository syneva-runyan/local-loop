const local = "http://127.0.0.1:3030";
// const prod = "";

const useMe = local;

const constants = {
    GET_ITINERARY_ENDPOINT: `${useMe}/get-itinerary`,
    GET_PHOTO_ENDPOINT: `${useMe}/get-place-photo`,
}

export default constants;