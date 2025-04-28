export const handler = async (event) => {
  const feedback = decodeURIComponent(event.queryStringParameters.feedback);
  const sentiment = decodeURIComponent(event.queryStringParameters.sentiment);
  console.log(`Received ${sentiment} feedback ${feedback}`);
  
  // Call LLM & google maps to create tour
  try {
    return returnSuccess({ message: "Feedback received" });
  } catch(e) {
    console.log(`Received error - Error: ${e}`);
    returnError(e.toString());
  }
}

function returnSuccess(data) {
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET,OPTIONS",
    },
    body:  JSON.stringify(data),
  };
}

function returnError(error) {
  return {
    statusCode: 500,
    body: JSON.stringify({ error })
  };
}
