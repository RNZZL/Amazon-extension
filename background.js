console.log("background running");
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
    let behaviorCodes = ["copy", "select", "search"];
    if (behaviorCodes.includes(request.eventtype)) {
        chrome.storage.local.get(
            ['behaviorItems'],// get the data whose key =behaviorItems
            function (result) {
                let bhvItems = result.behaviorItems;
                if (!Array.isArray(bhvItems)) {
                    update([]);//without this push is undefined?
                } else {
                    console.log("request: ", request);
                    bhvItems.push(request);
                    update(bhvItems);
                    console.log(bhvItems);
                }
            });
    }
    return true;
}





