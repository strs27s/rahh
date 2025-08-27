const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const port = 3001; // Using a different port to avoid conflict with challenge 1

// THIS IS THE VULNERABILITY: A weak, easily guessable secret key.
const JWT_SECRET = 'secretkey';

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'views')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/login', (req, res) => {
    const { username } = req.body;
    // In a real app, you'd validate the password.
    // For this challenge, any login is successful.

    // Create a JWT for the user. Note the isAdmin: false payload.
    const token = jwt.sign({ username: username, isAdmin: false }, JWT_SECRET, {
        algorithm: 'HS256'
    });

    // Set the token in a cookie
    res.cookie('session_token', token);
    res.redirect('/dashboard');
});

app.get('/dashboard', (req, res) => {
    const token = req.cookies.session_token;

    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Read the dashboard template
        const fs = require('fs');
        let dashboardHtml = fs.readFileSync(path.join(__dirname, 'views', 'dashboard.html'), 'utf8');

        // Personalize the dashboard
        dashboardHtml = dashboardHtml.replace('{{username}}', decoded.username);

        // THIS IS THE GOAL: Display admin content if isAdmin is true
        if (decoded.isAdmin) {
            dashboardHtml = dashboardHtml.replace('{{admin_content}}', '<p><strong>Admin Panel:</strong> You have access to the secret controls!</p>');
        } else {
            dashboardHtml = dashboardHtml.replace('{{admin_content}}', '<p>You are a regular user. No admin controls for you.</p>');
        }
        res.send(dashboardHtml);

    } catch (err) {
        res.status(400).send('Invalid token.');
    }
});

app.get('/logout', (req, res) => {
    res.clearCookie('session_token');
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Challenge 3 running at http://localhost:${port}`);
});
