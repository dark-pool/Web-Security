# Output
If the script is executed by current URL, it will inherit the origin of this URL.  
`about:blank`
`javascript:;`  
![Output](https://github.com/dark-pool/Web-Security/blob/main/Test%20Experiment/InheritanceOfOrigin/Output/67tool-2025-04-24%2022_21_33.png)
From the result, we know that these two methods both can create a blank document that inherits the origin of the parent page. But there are two things need to pay attention :  
When using `about:blank` to open a blank page, new page' s origin is set as `null`, until load specific content in the new page. This is because the browser considers the new blank page as an opaque origin, and the behaviors may differ due to browser or version.
Most modern browser restricts `javascript:` method to open a blank page.
