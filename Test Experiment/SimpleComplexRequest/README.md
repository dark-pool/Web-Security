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
![Simple Request](https://github.com/dark-pool/Web-Security/blob/main/Test%20Experiment/SimpleComplexRequest/Output/67tool-2025-04-25%2017_12_36.png)  

## Complex Request
A request is classified as complex if it violates any of the simple request conditions.  
+ HTTP Method: PUT/DELETE/PATCH/CONNECT/OPTIONS/TRACE(non-simple methods )
+ Headers: Include custom headers(e.g. Authorization,X-Custom-Header) or non-standard `Content-Type`(e.g. `application/json`)
+ Other Features: Require credentials (e.g., `withCredentials: true` in JavaScript ), Uses advanced features like event listeners for request monitoring  

Preflight Request: When a complex request is detected, the browser will automatically sends an OPTIONS preflight request to validate server permissions before sending the actual request.  
In preflight request and responses headers,   
`Access-Control-Request-Method`: Specifies the intended HTTP method (e.g., PUT).  
`Access-Control-Request-Headers`: Lists custom headers (e.g., Authorization).  
![Preflight Request](https://github.com/dark-pool/Web-Security/blob/main/Test%20Experiment/SimpleComplexRequest/Output/20250425171001.png)  
![Complex Request](https://github.com/dark-pool/Web-Security/blob/main/Test%20Experiment/SimpleComplexRequest/Output/67tool-2025-04-25%2017_28_38.png)  

  
