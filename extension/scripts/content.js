// Variable to store the previous URL
let oldUrl = "";

// Create a MutationObserver to watch for changes in the DOM
const mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach(() => {
        // Check if the URL has changed
        if (location.href !== oldUrl) {
            console.log("YT Cache Clearer: URL changed, sending message to clear cache");
            // Send a message to the background script to clear the cache
            chrome.runtime.sendMessage({ action: "clearCache" }, (response) => {
                console.log("YT Cache Clearer: Cache clear request response", response);
            });
            // Update the oldUrl variable to the new URL
            oldUrl = location.href;
        }
    });
});

// Start observing the document for changes in the DOM
mutationObserver.observe(document.documentElement, { childList: true, subtree: true });
