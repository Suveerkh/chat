document.addEventListener("DOMContentLoaded", () => {
    const notificationsCheckbox = document.getElementById("notifications");
    const saveSettingsButton = document.getElementById("saveSettings");
    const backToChatButton = document.getElementById("backToChat");

    // Load the current notification setting
    notificationsCheckbox.checked = JSON.parse(localStorage.getItem("notificationsEnabled")) !== null 
        ? JSON.parse(localStorage.getItem("notificationsEnabled")) 
        : true;

    // Save notification settings
    saveSettingsButton.addEventListener("click", () => {
        const notificationsEnabled = notificationsCheckbox.checked;
        localStorage.setItem("notificationsEnabled", JSON.stringify(notificationsEnabled));
        alert("Settings saved!");
    });

    // Back to chat button
    backToChatButton.addEventListener("click", () => {
        window.location.href = "chat.html"; // Change to your chat page
    });
});
