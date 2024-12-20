document.getElementById('send-btn').addEventListener('click', function () {
    const userInput = document.getElementById('user-input').value.trim();
    if (userInput) {
        // Display user message in the chat log
        appendMessage(userInput, 'user');

        // Clear the input field
        document.getElementById('user-input').value = '';

        // Process user input for specific commands
        processInput(userInput);
    }
});

function appendMessage(message, sender) {
    const chatLog = document.getElementById('chat-log');
    const messageElement = document.createElement('p');
    messageElement.classList.add(sender === 'user' ? 'user-message' : 'ai-message');
    messageElement.textContent = message;
    chatLog.appendChild(messageElement);
    chatLog.scrollTop = chatLog.scrollHeight; // Auto-scroll to the bottom
}

function processInput(input) {
    if (input.toLowerCase() === '/start') {
        // Call the function to display the welcome message with instructions
        sendWelcomeMessage();
    } else if (input.toLowerCase() === '/loli') {
        // Fetch the loli image from the API
        fetchLoliImage();
    } else {
        // If the input doesn't match /start, send a default AI response
        sendDefaultResponse();
    }
}

function sendWelcomeMessage() {
    const welcomeMessage = `
        Selamat Datang Di DecaChat
        Bot Dibuat Oleh: Wisnu

        Informasi
        Tanggal: ${new Date().toLocaleDateString()}
        Hari: ${new Date().toLocaleDateString('id-ID', { weekday: 'long' })}
        Jam: ${new Date().toLocaleTimeString()}

        Informasi Bot
        Nama Bot: Deca V2.31.1
        Pembuat Bot: Nao Team And Rencang Rencang

        Fitur Bot

        Anime Fitur:
        /husbu
        /waifu
        /loli

        Maker Fitur:
        /cmeme <text1> <text2>
        /cutepig <text>
        /water <text>
        /choror <text>
    `;
    
    appendMessage(welcomeMessage, 'ai');
}

function sendDefaultResponse() {
    const defaultMessage = "Perintah tidak dikenali. Ketik '/start' untuk panduan.";
    setTimeout(() => {
        appendMessage(defaultMessage, 'ai');
    }, 1000);
}

function fetchLoliImage() {
    const apiUrl = 'https://beforelife.me/api/anime/loli?apikey=HC-9NRYRw0xbyuGn3P';

    fetch(apiUrl)
        .then(response => response.json()) // Parse the JSON response
        .then(data => {
            if (data && data.url) {
                appendMessage("Berikut gambar Loli:", 'ai');
                const imageElement = document.createElement('img');
                imageElement.src = data.url;
                imageElement.alt = 'Loli Image';
                imageElement.style.maxWidth = '100%';
                imageElement.style.height = 'auto';
                appendMessage(imageElement, 'ai'); // Append the image to the chat
            } else {
                appendMessage("Maaf, gambar tidak dapat ditemukan.", 'ai');
            }
        })
        .catch(error => {
            console.error("Error fetching loli image:", error);
            appendMessage("Terjadi kesalahan saat mengambil gambar.", 'ai');
        });
}
