function newUrlHandler()
{
    let url = document.location.href;
    let query;
    if (url.includes("google.com")) {
        const regex = /(?<=q=).*?(?=&)/s;
        if (url.match(regex) !== null) {
            query = url.match(regex)[0].replace(/\+/g, ' ');
            let behaviorItem = makeBehaviorItem("search", query);
            chrome.runtime.sendMessage(behaviorItem, (response) => {
                console.log("Message Response: ", response); //Response is undefined.
            });
        }
    }
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

