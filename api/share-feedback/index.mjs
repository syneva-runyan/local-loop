import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

export const handler = async (event) => {
  const feedback = decodeURIComponent(event.queryStringParameters.feedback);
  const sentiment = decodeURIComponent(event.queryStringParameters.sentiment);
  console.log(`Received ${sentiment} feedback ${feedback}`);
  
  try {
    return await sendEmail(sentiment, feedback);
  } catch(e) {
    console.log(`Received error - Error: ${e}`);
    return returnError(e.toString());
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

async function sendEmail(sentiment, feedback) {
  const htmlBody = `
  <!DOCTYPE html>
  <html>
    <head>
    </head>
    <body>
      <p>${sentiment} Feedback for Local Loop.</p>
      <p>${feedback}.</p>
    </body>
  </html>
  `;

  console.log("composed htmlBody");

  const textBody = `${sentiment} Feedback for Local Loop \n ${feedback}`;
  console.log("composed textBody");


  // Create sendEmail params
  const params = {
    Destination: {
      ToAddresses: ['syneva@localloopcommunity.com']
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: htmlBody
        },
        Text: {
          Charset: "UTF-8",
          Data: textBody
        }
      },
      Subject: {
        Charset: "UTF-8",
        Data: `🔄 ${sentiment} feedback for Local Loop!`
      }
    },
    Source: "syneva@localloopcommunity.com"
  };

  console.log("creating email client...")
  const client = new SESClient({ region: 'us-east-1' });


  try {
    const command = new SendEmailCommand(params);
    const response = await client.send(command); 
    console.log("Successfully sent email");  
  } catch (e) {
    console.log("FAILURE IN SENDING MAIL!!", e);
    return returnError("failed to send email")
  }  
  return returnSuccess({ status: 'ok'});
}
