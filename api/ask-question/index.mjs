function isValidRequest(parameters) {
  // TODO

  return true;
}

export const handler = async (event) => {
  // validate request
  if (!isValidRequest(event.queryStringParameters)) {
    return returnError("Please provide valid question parameters");
  }

  
  const location = decodeURIComponent(event.queryStringParameters.location);
  console.log(`Received question for ${location}. Question: ${event.queryStringParameters.question}`);

  // Call LLM to answer question
  try {
    const response = await getAnswer(event.queryStringParameters);
    console.log(`Received answer - Answer: ${response.answer}`);
    return returnSuccess(response);
  } catch(e) {
    console.log(`Received error - Error: ${e}`);
    return returnError(e);
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

/**
 * Prints the rows of the wedding RSVP spreadsheet
 */
async function getAnswer(parameters) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.CLAUDE_API_KEY,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2024,
      messages: [
        {
          role: 'user',
          content: `
                You are a friendly. local tour guide. I'm on a tour and have a question about ${parameters.location}. 
                My question is
                QUESTION START
                
                "${parameters.question}"

                QUESTION END
                DO NOT MAKE THINGS UP and include citation urls. Do not elaborate on why you provide or dont provide an answer. Do not apologize.
                If the question does not pertain to ${parameters.location} or the general subject matter around it, let me know you can't help but dont tell me why in detail and dont offer to provide addtional assistances.

                Always respond in a valid JSON format:
                {
                    answer:
                    citations:
                }
                `
        }
      ]
    })
  });

  try {
    const data = await response.json();
    console.log(data);
    const answerJSON = JSON.parse(data.content[0].text);
    return answerJSON;
  } catch (e) {
    return e.toString();
  }
}