// Simulated user database (for demonstration purposes only)
const usersDB = [];

document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Simple validation (you can add more)
    if (username === "" || email === "" || password === "") {
        displayMessage("All fields are required.", "signupMessage", "error");
        return;
    }

    // Check if user already exists
    const userExists = usersDB.some(user => user.email === email);
    if (userExists) {
        displayMessage("User already exists. Please sign in.", "signupMessage", "error");
        return;
    }

    // Register the user
    usersDB.push({ username, email, password });
    displayMessage("Sign up successful! You can now sign in.", "signupMessage", "success");

    // Reset the form
    document.getElementById("signupForm").reset();
});

document.getElementById("signinForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    const email = document.getElementById("signinEmail").value;
    const password = document.getElementById("signinPassword").value;

    // Simple validation
    if (email === "" || password === "") {
        displayMessage("All fields are required.", "signinMessage", "error");
        return;
    }

   // Check if user exists and password is correct
    const user = usersDB.find(user => user.email === email && user.password === password);
    if (user) {
        displayMessage(`Welcome back, ${user.username}!`, "signinMessage", "success");
        
        // Redirect to the desired page after a short delay
        setTimeout(() => {
            window.location.href = "homepage.html"; // Change to your target URL
        }, 2000); // Redirect after 2 seconds
    } else {
        displayMessage("Invalid email or password.", "signinMessage", "error");
    }

    // Reset the form
    document.getElementById("signinForm").reset();
});

// Function to display messages
function displayMessage(message, messageElementId, type) {
    const messageDiv = document.getElementById(messageElementId);
    messageDiv.textContent = message;
    messageDiv.className = type === "error" ? "error" : "success";
}

// Toggle between sign-up and sign-in forms
document.getElementById("toggleForm").addEventListener("click", function() {
    const signupForm = document.getElementById("signupForm");
    const signinForm = document.getElementById("signinForm");
    if (signupForm.style.display === "none") {
        signupForm.style.display = "block";
        signinForm.style.display = "none";
        this.textContent = "Switch to Sign In";
    } else {
        signupForm.style.display = "none";
        signinForm.style.display = "block";
        this.textContent = "Switch to Sign Up";
    }
});
