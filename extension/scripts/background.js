chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "clearCache" && sender.tab) {
    let tabId = sender.tab.id;
    chrome.tabs.get(tabId, (tab) => {
      if (tab && tab.url.startsWith("https://www.youtube.com/")) {
        chrome.browsingData.remove({
          "origins": [new URL(tab.url).origin]
        }, {
          "cache": true
        }, () => {
          console.log('Cache cleared for', tab.url);
          sendResponse({status: "success"});
          showNotification(tabId);
        });
        return true; // Keep the message channel open for sendResponse
      }
    });
  }
});

function showNotification(tabId) {
  chrome.scripting.executeScript({
    target: { tabId: tabId },
    func: () => {
      let notification = document.createElement("div");
      notification.style.position = "fixed";
      notification.style.top = "10px";
      notification.style.right = "195px";
      notification.style.backgroundColor = "#f5f5f5";
      notification.style.color = "black";
      notification.style.fontFamily = "Courier New", "Courier", "monospace";
      notification.style.fontSize = "14px";
      notification.style.padding = "10px";
      notification.style.zIndex = "10000";
      notification.style.borderRadius = "0px";
      notification.textContent = "cache cleared";
      document.body.appendChild(notification);
      
      
      setTimeout(() => {
        notification.remove();
      }, 3000);
    }
  });
}