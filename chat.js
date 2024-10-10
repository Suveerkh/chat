document.addEventListener("DOMContentLoaded", () => {
    const chatBox = document.getElementById("chatBox");
    const messageInput = document.getElementById("messageInput");
    const usernameInput = document.getElementById("username");
    const partnerInput = document.getElementById("partner");
    const sendMessageButton = document.getElementById("sendMessage");
    const clearChatButton = document.getElementById("clearChat");
    const signOutButton = document.getElementById("signOut");
    const dropdownMenu = document.getElementById("dropdownMenu");
    const menuButton = document.getElementById("menuButton");
    const settingsButton = document.getElementById("settings");

    // Load existing messages when the page loads
    loadMessages();

    let notificationsEnabled = JSON.parse(localStorage.getItem("notificationsEnabled")) !== null 
        ? JSON.parse(localStorage.getItem("notificationsEnabled")) 
        : true;
    // Show notification when new message arrives
    function showNotification(message) {
        if (notificationsEnabled) {
            new Notification("New Message", {
                body: message,
            });
        }
    }

    // Toggle dropdown menu on button click
    menuButton.addEventListener("click", () => {
        dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
    });

    // Hide dropdown menu when clicking outside of it
    window.addEventListener("click", (event) => {
        if (!event.target.matches('#menuButton')) {
            dropdownMenu.style.display = "none";
        }
    });
    // Go to settings page
    settingsButton.addEventListener("click", () => {
        window.location.href = "settings.html"; // Change to your settings page
    });

    // Sign out event
    signOutButton.addEventListener("click", () => {
        // Clear username and partner inputs
        usernameInput.value = "";
        partnerInput.value = "";
        // Optionally clear chat messages
        localStorage.removeItem("chatMessages");
        loadMessages();
        // Redirect to the homepage or sign-in page
        window.location.href = "index.html"; // Change to your desired redirect
    });

    // Send message event
    sendMessageButton.addEventListener("click", () => {
        const message = messageInput.value.trim();
        const username = usernameInput.value.trim();
        const partner = partnerInput.value.trim();

        if (message && validateEmail(username) && validateEmail(partner)) {
            const chatMessage = {
                from: username,
                to: partner,
                text: message,
                timestamp: new Date().toLocaleTimeString(),
            };

            // Save message to localStorage
            saveMessage(chatMessage);
            showNotification(`Message from ${username}: ${message}`);
            messageInput.value = ""; // Clear input
        } else {
            alert("Please enter valid Gmail addresses.");
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

        messages.forEach(msg => {
            // Only display messages between the current user and their chat partner
            if ((msg.from === username && msg.to === partner) || (msg.to === username && msg.from === partner)) {
                const messageElement = document.createElement("div");
                messageElement.innerHTML = `<strong>${msg.from}</strong> [${msg.timestamp}]: ${msg.text}`;
                chatBox.appendChild(messageElement);
            }
        });

        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
    }

    // Save message to localStorage
    function saveMessage(chatMessage) {
        const messages = JSON.parse(localStorage.getItem("chatMessages")) || [];
        messages.push(chatMessage);
        localStorage.setItem("chatMessages", JSON.stringify(messages));
    }

    // Validate email format
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Polling mechanism to check for new messages every 1 second
    setInterval(() => {
        loadMessages();
    }, 1000); // Check for new messages every second
});
