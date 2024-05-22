var old_url = '';
var mutationObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        if (location.href != old_url) {
            chrome.runtime.sendMessage({action: "clearCache"}, (response) => {
                if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
                } else {
                console.log('Cache clear request sent');
                }
            });
            old_url = location.href;
            console.log('URL was changed');
        }
    });
});

mutationObserver.observe(document.documentElement, {childList: true, subtree: true});
