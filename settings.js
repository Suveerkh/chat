document.addEventListener("DOMContentLoaded", () => {
    const darkModeToggle = document.getElementById("darkModeToggle");
    const notificationToggle = document.getElementById("notificationToggle");
    const menuButton = document.getElementById("menuButton");
    const dropdownMenu = document.getElementById("dropdownMenu");
    const goToChatButton = document.getElementById("goToChat");
    const signOutButton = document.getElementById("signOut");

    // Load dark mode setting
    const isDarkMode = JSON.parse(localStorage.getItem("darkModeEnabled")) || false;
    darkModeToggle.checked = isDarkMode;
    toggleDarkMode(isDarkMode); // Apply dark mode if enabled

    // Load notification setting
    const notificationsEnabled = JSON.parse(localStorage.getItem("notificationsEnabled")) !== null 
        ? JSON.parse(localStorage.getItem("notificationsEnabled")) 
        : true;
    notificationToggle.checked = notificationsEnabled;

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

    // Navigate to chat page
    goToChatButton.addEventListener("click", () => {
        window.location.href = "chat.html"; // Change to your chat page
    });

    // Sign out event
    signOutButton.addEventListener("click", () => {
        localStorage.removeItem("chatMessages");
        localStorage.removeItem("darkModeEnabled");
        localStorage.removeItem("notificationsEnabled");
        window.location.href = "index.html"; // Change to your desired redirect
    });

    // Toggle dark mode
    darkModeToggle.addEventListener("change", () => {
        const isChecked = darkModeToggle.checked;
        toggleDarkMode(isChecked);
        localStorage.setItem("darkModeEnabled", JSON.stringify(isChecked));
    });

    // Toggle notifications
    notificationToggle.addEventListener("change", () => {
        const isChecked = notificationToggle.checked;
        localStorage.setItem("notificationsEnabled", JSON.stringify(isChecked));
    });

    // Function to toggle dark mode
    function toggleDarkMode(enabled) {
        if (enabled) {
            document.body.classList.add("dark-mode");
            document.querySelector(".settings-container").classList.add("dark-mode");
            document.querySelectorAll('.menu-button').forEach(button => button.classList.add("dark-mode"));
            document.querySelectorAll('.dropdown-content').forEach(dropdown => dropdown.classList.add("dark-mode"));
            document.querySelectorAll('.setting-item label').forEach(label => label.classList.add("dark-mode"));
            document.querySelectorAll('input[type="checkbox"]').forEach(input => input.classList.add("dark-mode"));
        } else {
            document.body.classList.remove("dark-mode");
            document.querySelector(".settings-container").classList.remove("dark-mode");
            document.querySelectorAll('.menu-button').forEach(button => button.classList.remove("dark-mode"));
            document.querySelectorAll('.dropdown-content').forEach(dropdown => dropdown.classList.remove("dark-mode"));
            document.querySelectorAll('.setting-item label').forEach(label => label.classList.remove("dark-mode"));
            document.querySelectorAll('input[type="checkbox"]').forEach(input => input.classList.remove("dark-mode"));
        }
    }
});
