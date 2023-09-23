// script.js

document.addEventListener('DOMContentLoaded', function () {
    const signupPage = document.getElementById('signup-page');
    const profilePage = document.getElementById('profile-page');

    const signupForm = document.createElement('form');
    signupForm.innerHTML = `
    <h3>Welcome back!</h3>
    <h2>Sign up to your account</h2>
    <h4>Your name</h4>
        <input type="text" id="username" placeholder="Username" class= "box" required>
        <h4>Your email</h4>
        <input type="email" id="email" placeholder="Email" class= "box" required>
        <h4>Password</h4> 
        <input type="password" id="password" placeholder="Password" class= "box" required>
        <h4>Confirm Password</h4> 
        <input type="password" id="password" placeholder="Password" class= "box" required>
        </br>
        </br>
        <button type="submit" id ="btn">Continue</button>
        <p id="signup-message"></p>
    `;
     localStorage.clear();
    signupPage.appendChild(signupForm);

    // Check if the user is already logged in
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
        displayProfilePage(accessToken);
    } else {
        // If not logged in, show the signup page
        signupPage.style.display = 'block';
    }

    signupForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        // Get user input
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const email = document.getElementById('email').value;
        const confirmp = document.getElementById('password').value;


        // Generate a random access token (16-byte string)
        const accessToken = generateAccessToken();

        // Store user data in local storage
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('username', username);
        localStorage.setItem('email', email);

        // Display success message and redirect to profile page
        document.getElementById('signup-message').textContent = 'Signup successful!';
        setTimeout(() => {
            signupPage.style.display = 'none';
            displayProfilePage(accessToken);
        }, 1000);
    });

    function displayProfilePage(accessToken) {
        const username = localStorage.getItem('username');
        const email = localStorage.getItem('email');
        
        profilePage.innerHTML = `
        
        <h2>Signup successful!</h2>
        <h3>Welcome, ${username}!</h3>
        <h3>Profile</h3>
    
        <h4>Full Name : ${username}</h4>
        <h4>Email : ${email}</h4>
        <h4>Token : 10</h4>
    
     <button id="logout-button">Logout</button>
        `;

        profilePage.style.display = 'block';

        const logoutButton = document.getElementById('logout-button');
        logoutButton.addEventListener('click', function () {
            // Clear local storage and redirect to signup page
            localStorage.removeItem('access_token');
            localStorage.removeItem('username');
            localStorage.removeItem('email');
            profilePage.style.display = 'none';
            signupPage.style.display = 'block';
        });
    }

    function generateAccessToken() {
        const byteCount = 16;
        const randomBytes = new Uint8Array(byteCount);
        window.crypto.getRandomValues(randomBytes);
        const token = Array.from(randomBytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
        return token;
    }
});
