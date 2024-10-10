document.addEventListener("DOMContentLoaded", () => {
    const notificationsCheckbox = document.getElementById("notifications");
    const darkModeCheckbox = document.getElementById("darkMode");
    const saveSettingsButton = document.getElementById("saveSettings");
    const backToChatButton = document.getElementById("backToChat");

    // Load the current notification setting
    notificationsCheckbox.checked = JSON.parse(localStorage.getItem("notificationsEnabled")) !== null 
        ? JSON.parse(localStorage.getItem("notificationsEnabled")) 
        : true;

    // Load the current dark mode setting
    const isDarkMode = JSON.parse(localStorage.getItem("darkModeEnabled")) !== null 
        ? JSON.parse(localStorage.getItem("darkModeEnabled")) 
        : false;
    darkModeCheckbox.checked = isDarkMode;
    toggleDarkMode(isDarkMode); // Apply dark mode if enabled

    // Save notification and dark mode settings
    saveSettingsButton.addEventListener("click", () => {
        const notificationsEnabled = notificationsCheckbox.checked;
        const darkModeEnabled = darkModeCheckbox.checked;
        
        localStorage.setItem("notificationsEnabled", JSON.stringify(notificationsEnabled));
        localStorage.setItem("darkModeEnabled", JSON.stringify(darkModeEnabled));

        toggleDarkMode(darkModeEnabled); // Apply dark mode if enabled
        alert("Settings saved!");
    });

    // Back to chat button
    backToChatButton.addEventListener("click", () => {
        window.location.href = "chat.html"; // Change to your chat page
    });

    // Function to toggle dark mode
    function toggleDarkMode(enabled) {
        if (enabled) {
            document.body.classList.add("dark-mode");
            document.querySelector(".settings-container").classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
            document.querySelector(".settings-container").classList.remove("dark-mode");
        }
    }
});
