
const crypto = require('crypto');

exports.handler = async (event) => {
  const secret = process.env.HASH_SECRET_KEY_TEST;

  let userId;

  if (event.httpMethod === 'GET') {
    userId = event.queryStringParameters?.userId;
  } else if (event.httpMethod === 'POST') {
    try {
      const body = JSON.parse(event.body);
      userId = body.userId;
    } catch (error) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          message: "Invalid JSON body",
        }),
      };
    }
  } else {
    return {
      statusCode: 405,
      body: JSON.stringify({
        success: false,
        message: "Method not allowed",
      }),
    };
  }

  if (!secret || !userId) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        success: false,
        message: "Missing secret or userId",
      }),
    };
  }

  const hash = crypto
    .createHmac('sha256', secret)
    .update(userId)
    .digest('hex');

  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      hash,
    }),
  };
};