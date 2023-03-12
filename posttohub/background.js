chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
        console.log('Page loaded: ' + tab.url);
    }
});



