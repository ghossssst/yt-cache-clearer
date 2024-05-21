chrome.webNavigation.onCommitted.addListener((details) => {
  if (details.frameId === 0) { 
    chrome.tabs.get(details.tabId, (tab) => {
      if (tab.url.startsWith("https://www.youtube.com/")) { 
        chrome.browsingData.remove({
          "origins": [new URL(tab.url).origin]
        }, {
          "cache": true
        }, () => {
          chrome.scripting.executeScript({
            target: {tabId: tab.id},
            files: ['scripts/content.js'],
          });
        });
      }
    });
  }
});
