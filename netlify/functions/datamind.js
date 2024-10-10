const fetch = require('node-fetch');

exports.handler = async function (event, context) {
    const apiKey = process.env.DATAMIND_AI_API_KEY;

    const body = JSON.parse(event.body);
    const prompt = body.prompt;

    try {
        const response = await fetch('https://api.datamind.ai/v1/data-coach', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: prompt }),
        });

        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error connecting to GPT API' }),
        };
    }
};
