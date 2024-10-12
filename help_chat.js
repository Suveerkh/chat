document.addEventListener("DOMContentLoaded", () => {
    // Load dark mode setting
    const isDarkMode = JSON.parse(localStorage.getItem("darkModeEnabled")) !== null 
        ? JSON.parse(localStorage.getItem("darkModeEnabled")) 
        : false;
    toggleDarkMode(isDarkMode); // Apply dark mode if enabled

    // Function to toggle dark mode
    function toggleDarkMode(enabled) {
        if (enabled) {
            document.body.classList.add("dark-mode");
            document.querySelector(".help-container").classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
            document.querySelector(".help-container").classList.remove("dark-mode");
        }
    }
});
