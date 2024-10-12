// Load existing users from localStorage when the page loads
let usersDB = JSON.parse(localStorage.getItem("usersDB")) || [];

// Sign-up functionality
document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Validation: Check if fields are empty
    if (!username || !email || !password) {
        displayMessage("All fields are required.", "signupMessage", "error");
        return;
    }

    // Check if user already exists
    if (usersDB.some(user => user.email === email)) {
        displayMessage("User already exists. Please sign in.", "signupMessage", "error");
        return;
    }

    // Register the new user
    usersDB.push({ username, email, password });

    // Save updated usersDB to localStorage
    localStorage.setItem("usersDB", JSON.stringify(usersDB));

    displayMessage("Sign up successful! You can now sign in.", "signupMessage", "success");

    // Reset the form
    document.getElementById("signupForm").reset();
});

// Sign-in functionality
document.getElementById("signinForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    const email = document.getElementById("signinEmail").value.trim();
    const password = document.getElementById("signinPassword").value.trim();

    // Validation: Check if fields are empty
    if (!email || !password) {
        displayMessage("All fields are required.", "signinMessage", "error");
        return;
    }

    // Check if user exists and password matches
    const user = usersDB.find(user => user.email === email && user.password === password);

    if (user) {
        displayMessage(`Welcome back, ${user.username}!`, "signinMessage", "success");

        // Store signed-in user's info in localStorage for session persistence
        localStorage.setItem("signedInUser", JSON.stringify(user));

        // Redirect to homepage after 2 seconds
        setTimeout(() => {
            window.location.href = "homepage.html"; // Update this with your homepage URL
        }, 2000);
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
    messageDiv.className = type === "error" ? "message error" : "message success";
}

// Toggle between sign-up and sign-in forms
document.getElementById("toggleForm").addEventListener("click", function() {
    const signupForm = document.getElementById("signupForm");
    const signinForm = document.getElementById("signinForm");

    // Toggle visibility between the two forms
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
function signUp() {
    const userEmail = document.getElementById("signUpEmail").value;
    localStorage.setItem("registeredEmail", userEmail); // Store the email in localStorage
    alert("Sign-up successful!");
