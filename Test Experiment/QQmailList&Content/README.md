# What is it about?

# How to use this?
+ For `payload.js`:  
Modify the value of `serverURL` to your server 's IP address  
(Not essential)Modify the value of `page` to any non-negative integer, each page contains 25 mails  
+ `npm install express cors`
+ `node .\evil-server.js` (The evil-server is running on: http://localhost:4000)
+ Open the browser, log in QQ mail website, copy JavaScript code from `payload.js` and paste it in the console Tab of browser(This step is for simulating innocent users who click on the XSS attacked page)
+ Evil server will receive the mail list and content data from users, which will be stored in `/mails` directory
Mail list naming format: `sid + _mailList.html`  
Mail Content naming format: `sid + _mailContent_ + mid + .html`  

# Limitations
+ This only works in old version of QQ mail website, new version has different URL rules
+ This script did not use Regex Rules or other methods to filter the responses, so that whole dataset is posted to server(Payload too large error)  
+ The `payload.js` only gets the first page(page=0) of mails(latest 25 mails) for testing  
