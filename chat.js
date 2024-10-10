document.addEventListener("DOMContentLoaded", () => {
    const chatBox = document.getElementById("chatBox");
    const messageInput = document.getElementById("messageInput");
    const usernameInput = document.getElementById("username");
    const partnerInput = document.getElementById("partner");
    const sendMessageButton = document.getElementById("sendMessage");
    const clearChatButton = document.getElementById("clearChat");

    // Load existing messages when the page loads
    loadMessages();

    // Send message event
    sendMessageButton.addEventListener("click", () => {
        const message = messageInput.value.trim();
        const username = usernameInput.value.trim();
        const partner = partnerInput.value.trim();

        if (message && username && partner) {
            const chatMessage = {
                from: username,
                to: partner,
                text: message,
                timestamp: new Date().toLocaleTimeString(),
            };

            // Save message to localStorage
            saveMessage(chatMessage);
            messageInput.value = ""; // Clear input
        }
    });

    // Clear chat messages
    clearChatButton.addEventListener("click", () => {
        localStorage.removeItem("chatMessages");
        loadMessages();
    });

    // Load messages from localStorage
    function loadMessages() {
        const messages = JSON.parse(localStorage.getItem("chatMessages")) || [];
        chatBox.innerHTML = ""; // Clear chat box

        const username = usernameInput.value.trim();
        const partner = partnerInput.value.trim();

        messages.forEach(msg
