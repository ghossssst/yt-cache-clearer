document.getElementById('clearCache').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      let activeTab = tabs[0];
      chrome.browsingData.remove({
        "origins": [new URL(activeTab.url).origin]
      }, {
        "cache": true
      }, () => {
        chrome.tabs.reload(activeTab.id);
      });
    });
  });
  