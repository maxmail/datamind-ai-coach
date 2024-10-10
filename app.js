async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    
    // Display user message in the chat
    displayMessage(userInput, 'user');

    // Clear input field
    document.getElementById('user-input').value = '';

    // Call the OpenAI API with the user's input (Replace API key and URL as needed)
    const response = await getChatGPTResponse(userInput);

    // Display the AI's response in the chat
    displayMessage(response, 'bot');
}

function displayMessage(message, sender) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.innerText = message;
    chatBox.appendChild(messageElement);

    // Scroll to the bottom of the chatbox
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function getChatGPTResponse(userInput) {
        const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: 'gpt-4',
            prompt: userInput,
            max_tokens: 150,
            temperature: 0.7,
        }),
    });
    
    const data = await response.json();
    return data.choices[0].text.trim();
}
