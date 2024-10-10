const fetch = require('node-fetch');  // Ensure node-fetch is installed

exports.handler = async function (event, context) {
    // Use environment variable - to access the API key
    const apiKey = process.env.DATAMIND_AI_API_KEY;

    // Parse the request body (assumes it's a JSON object)
    const body = JSON.parse(event.body);
    const prompt = body.prompt;

    try {
        // Call the Datamind AI API with the prompt and API key
        const response = await fetch('https://api.datamind.ai/v1/data-coach', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,  // Use the API key from environment variables
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: prompt }),  // Send the prompt from the client
        });

        // Parse the response from Datamind AI API
        const data = await response.json();

        // Return the response to the client
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        console.error('Error with GPT request:', error);

        // Return an error response if something went wrong
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error connecting to GPT API' }),
        };
    }
};
