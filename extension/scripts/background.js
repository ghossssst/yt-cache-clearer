chrome.action.onClicked.addListener((tab) => {
    chrome.browsingData.remove({
      "origins": [new URL(tab.url).origin]
    }, {
      "cache": true
    }, () => {
      chrome.tabs.reload(tab.id);
    });
});
  