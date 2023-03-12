document.addEventListener('DOMContentLoaded', function() {
    // Felder aus dem Storage laden
    chrome.storage.sync.get(['webhookUrl'], function(result) {
        document.getElementById('webhookUrl').value = result.webhookUrl;
    });

    // Speicher-Button-Click-Handler
    document.getElementById('saveButton').addEventListener('click', function() {
        var webhookUrl = document.getElementById('webhookUrl').value;

        // Felder in Storage speichern
        chrome.storage.sync.set({webhookUrl: webhookUrl}, function() {
            // Feedback für den Benutzer
            var status = document.getElementById('status');
            status.textContent = 'Options saved.';
            setTimeout(function() {
                status.textContent = '';
            }, 2000);
        });
    });
});
