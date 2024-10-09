document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Simple validation (you can add more)
    if (username === "" || email === "" || password === "") {
        displayMessage("All fields are required.", "error");
        return;
    }

    // Here you would typically send the data to the server
    // For this example, we just display a message
    displayMessage("Sign up successful!", "success");

    // Reset the form
    document.getElementById("signupForm").reset();
});

function displayMessage(message, type) {
    const messageDiv = document.getElementById("message");
    messageDiv.textContent = message;
    messageDiv.className = type === "error" ? "error" : "success";
}
