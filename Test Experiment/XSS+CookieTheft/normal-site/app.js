const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Database 
let comments = [];
let users = {
    'admin': 'admin123',
    'user1': 'password1'
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Login 
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (users[username] && users[username] === password) {
        res.cookie('username', username, { httpOnly: false });
        res.cookie('secret', 'SIMULATED_COOKIE_DATA', { httpOnly: false });
        res.redirect('/');
    } else {
        res.send('Login Failed.');
    }
});

// POST comment to page(XSS vulnerability)
app.post('/comment', (req, res) => {
    comments.push(req.body.comment); // Dangerous! Does not restrict characters of comment input
    res.redirect('/');
});

// Get Comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

app.listen(port, () => {
    console.log(`This normal site is running on: http://localhost:${port}`);
});

