var old_url = "";

var mutationObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        if (location.href != old_url) {
            console.log("YT Cache Clearer: URL changed, sending message to clear cache");
            chrome.runtime.sendMessage({action: "clearCache"}, (response) => {
                console.log("YT Cache Clearer: Cache clear request response", response);
            });
            old_url = location.href;
        }
    });
});

mutationObserver.observe(document.documentElement, {childList: true, subtree: true});
