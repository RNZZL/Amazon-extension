function newUrlHandler() {
    let currentUrl = document.location.href;
    let query;
    //other approach:
    if (currentUrl.includes(".amazon.com")) {
        const regex = /(?<=k=).*?(?=&)/s;//".amazon.com"
        //const regex = /(?<=find_desc=).*?(?=&)/s;//".yelp.com"
        //const regex = /(?<=keywords=).*?(?=&)/s;//".linkedin.com"

        if (currentUrl.match(regex) !== null) {
            query = currentUrl.match(regex)[0].replace(/\+/g, ' ');
            let behaviorItem = makeBehaviorItem("search", query);
            chrome.runtime.sendMessage(behaviorItem, (response) => {
                console.log("Message Response: ", response); //Response is undefined.
            });
        }//for amazon yelp and linkedin
    }
    //const regex = /search_query=(.*)/;//".youtube.com"?
    //const regex = /q=(.*)/;//".github.com"?
    //const regex = /q=(.*)/;//".stackoverflow.com"?
    //const regex = /wiki/(.*)/;//".wikipedia.org"?
    //const regex = /q=(.*)/;//".bbc.co.uk"?//regex=/(?<=q=).*?(?=&)/s
    //const regex = /q=(.*)/;//".ted.com"?
    //const regex = /#search/(.*)/;//".mail.google.com"?
    if (currentUrl.includes(".github.com")) {
        const regex = /q=(.*)/;//".github.com"?
        query = currentUrl.match(regex)[1];
        let behaviorItem = makeBehaviorItem("search", query);
        chrome.runtime.sendMessage(behaviorItem, (response) => {
            console.log("Message Response: ", response); //Response is undefined.
        });
    }//for left
    //TODO: collect url history here.
}

function makeBehaviorItem(event_type, content)
{
    return {
        "eventtype": event_type,
        "time": new Date(),
        "url": document.location.href,
        "title": document.title,
        "data": content,
    };
}

window.addEventListener("load", newUrlHandler);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    newUrlHandler();
});

/*var str = 'http://zhipur.com/item?data=SN120180525FEOCE';
var code2 = str.match(/data=(.*)/)[1];
console.log(code2);*///test zzl
