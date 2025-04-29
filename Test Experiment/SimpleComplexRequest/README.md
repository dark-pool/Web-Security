# How to use this?
+ `npm install express`  
+ `node server.js`  
+ Open `client.html` in the browser  
+ Click the button on the page, and observe the process in the network TAB of the browser  
In this example,  Simple Request means that sending a GET request without any custom headers to the server;  
Complex Request means that sending a PUT request with custom header to the server

# Output
## Simple Request  
A request is classified as simple if it meets all the following criteria :  
+ HTTP Method: GET/POST/HEAD
+ Headers: Contain only safe-listed headers, including : `Accept`, `Accept-Language`, `Content-Language`, `Content-Type` limited to:`text/plain`, `multipart/form-data`, `application/x-www-form-urlencoded` 
+ No Event Listeners(e.g. UploadProgress to the request object)  
Browsers send requests directly and check the Access-Control-Allow-Origin response header, and do not require pre-inspection.  
![]()



  
