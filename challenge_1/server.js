const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'views')));


// In-memory "database" of users
const users = {
    'user1': { id: 1, name: 'Alice', secret: 'Loves chocolate' },
    'user2': { id: 2, name: 'Bob', secret: 'Is a secret agent' }
};

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // In a real app, you'd validate the password. Here, we just check if the user exists.
    if (users[username]) {
        // This is the vulnerability: the user ID is easily guessable.
        res.cookie('userId', users[username].id);
        res.redirect('/profile');
    } else {
        res.redirect('/');
    }
});

app.get('/profile', (req, res) => {
    const userId = req.cookies.userId;
    if (userId) {
        // Find user by ID
        const user = Object.values(users).find(u => u.id == userId);
        if (user) {
            // Read the profile.html template
            const fs = require('fs');
            let profileHtml = fs.readFileSync(path.join(__dirname, 'views', 'profile.html'), 'utf8');
            // Replace placeholders with user data
            profileHtml = profileHtml.replace('{{name}}', user.name);
            profileHtml = profileHtml.replace('{{secret}}', user.secret);
            res.send(profileHtml);

        } else {
            res.redirect('/error.html');
        }
    } else {
        res.redirect('/error.html');
    }
});

app.get('/logout', (req, res) => {
    res.clearCookie('userId');
    res.redirect('/');
});


app.listen(port, () => {
    console.log(`Challenge 1 running at http://localhost:${port}`);
});
