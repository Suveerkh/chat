document.addEventListener("DOMContentLoaded", function() {
    const signedInUser = JSON.parse(localStorage.getItem("signedInUser"));
    const chatBox = document.getElementById("chatBox");
    const messageInput = document.getElementById("messageInput");
    const sendMessageButton = document.getElementById("sendMessage");

    if (!signedInUser) {
        // If the user is not signed in, redirect to the login page
        window.location.href = "index.html";
    }

    // Load messages from localStorage
    let messages = JSON.parse(localStorage.getItem("chatMessages")) || [];

    // Function to render messages
    function renderMessages() {
        chatBox.innerHTML = '';
        messages.forEach((message) => {
            const messageDiv = document.createElement("div");
            messageDiv.textContent = `${message.username}: ${message.text}`;
            chatBox.appendChild(messageDiv);
        });

        // Scroll to the bottom of the chat
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Render existing messages
    renderMessages();

    // Send message
    sendMessageButton.addEventListener("click", function() {
        const messageText = messageInput.value;

        if (messageText) {
            const newMessage = {
                username: signedInUser.username,
                text: messageText
            };

            // Add new message to messages array
            messages.push(newMessage);

            // Save messages to localStorage
            localStorage.setItem("chatMessages", JSON.stringify(messages));

            // Clear the input
            messageInput.value = '';

            // Render updated messages
            renderMessages();
        }
    });

    // Sign out functionality
    document.getElementById("signOut").addEventListener("click", function() {
        localStorage.removeItem("signedInUser");
        window.location.href = "index.html";
    });

    // Polling to update chat in real-time
    setInterval(function() {
        messages = JSON.parse(localStorage.getItem("chatMessages")) || [];
        renderMessages();
    }, 1000); // Check for new messages every second
});
