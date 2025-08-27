const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const port = 3002; // Using a new port

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'views')));

// In-memory user data store
let userData = {
    isLoggedIn: false,
    email: 'user@example.com'
};

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/login', (req, res) => {
    // This is a mock login. In a real app, you'd check a password.
    userData.isLoggedIn = true;
    // Set a simple session cookie
    res.cookie('session', 'user_is_logged_in');
    res.redirect('/settings');
});

app.get('/settings', (req, res) => {
    // Check if user is logged in
    if (req.cookies.session !== 'user_is_logged_in') {
        return res.redirect('/');
    }

    const fs = require('fs');
    let settingsHtml = fs.readFileSync(path.join(__dirname, 'views', 'settings.html'), 'utf8');
    // Display the current email
    settingsHtml = settingsHtml.replace('{{current_email}}', userData.email);
    res.send(settingsHtml);
});

// THIS IS THE VULNERABLE ENDPOINT
app.post('/update-email', (req, res) => {
    // It checks for a session cookie...
    if (req.cookies.session !== 'user_is_logged_in') {
        return res.status(401).send('Not authenticated.');
    }

    // ...but it does NOT check for a CSRF token.
    // Any request from any origin with the right cookie will be processed.
    const newEmail = req.body.email;
    if (newEmail) {
        userData.email = newEmail;
        console.log(`User email changed to: ${newEmail}`);
        res.redirect('/settings');
    } else {
        res.status(400).send('No email provided.');
    }
});

app.get('/logout', (req, res) => {
    userData.isLoggedIn = false;
    res.clearCookie('session');
    res.redirect('/');
});


app.listen(port, () => {
    console.log(`Challenge 4 running at http://localhost:${port}`);
});
