let webhookUrl;

function postToServer() {
    // Tab-URL abrufen
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        let tabUrl = tabs[0].url;

        console.log('Current tab URL:', tabUrl);
        fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({url: tabUrl})
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));

        console.log("Posted")
    });
}

function loadSettings() {
    chrome.storage.sync.get(['webhookUrl'], function(result) {
        webhookUrl = result.webhookUrl;
        console.log('Loaded webhook URL:', webhookUrl);
    });
}

// Beim Laden der Erweiterung die Einstellungen abrufen
document.addEventListener("DOMContentLoaded", function() {
    loadSettings();
});

// Wenn sich die Einstellungen ändern, diese neu laden
chrome.storage.onChanged.addListener(function(changes, namespace) {
    loadSettings();
});


document.addEventListener("DOMContentLoaded", function() {
    var button = document.getElementById("button");
    button.addEventListener("click", function() {
        postToServer();
    });
});
