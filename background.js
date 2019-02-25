console.log("background running");
let searchFlag;
let searchQuery;
let searchTime;//by ZZL


chrome.runtime.onMessage.addListener(handleMessage);
chrome.runtime.onInstalled.addListener(function (details) {
    chrome.storage.local.clear(function () {
        const error = chrome.runtime.lastError;
        if (error) {
            console.error(error);
        }
    });
});

function update(array)//array = behaviorItem in content.js
{
    console.log("Updated? ", array);
    //then call the set to update with modified value
    chrome.storage.local.set({
        behaviorItems: array//The item named behaviorItems in storage that corresponds to the items.
    }, function () {
        console.log("local storage updated");
        console.log("number of items: " + array.length);
    });
}

function handleMessage(request, sender, sendResponse) {
    if (request.eventtype === 'search') {
        searchFlag = true;
        console.log(request.data);
        searchQuery = request.data;
        searchTime = request.time;
    }//byZZL
    return true;
}


chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {

    if (changeInfo.status === "complete") {
        console.log("new url detected:" + tab.url);
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {url: tab.url}, function (response) {
            });
        });
    }
    if (searchFlag === true) {//by ZZL
        chrome.storage.local.get(
            ['behaviorItems'],
            function (result) {
                console.log(result);
                let searchItems = result.behaviorItems;
                if (!Array.isArray(searchItems)) {
                    update([]);
                } else {
                    let srchItem = {
                        "eventtype": "search",
                        "time": searchTime,
                        "url": tab.url,
                        "title": tab.title,
                        "data": searchQuery,
                    };
                    searchItems.push(srchItem);
                    update(searchItems);
                }
            }
        );
    }
    searchFlag = false;//by ZZL
});



