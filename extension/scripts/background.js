// Listen for messages from content scripts or other parts of the extension
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("YT Cache Clearer: Message received", request);

  // Check if the message action is "clearCache" and if it has a valid tab sender
  if (request.action === "clearCache" && sender.tab) {
    let tabId = sender.tab.id;  // Get the tab ID of the sender

    // Get the details of the tab
    chrome.tabs.get(tabId, (tab) => {
      // Check if the tab URL is valid and starts with "https://www.youtube.com/"
      if (tab && tab.url && tab.url.startsWith("https://www.youtube.com/")) {
        // Remove the cache for the origin of the tab URL
        chrome.browsingData.remove({
          "origins": [new URL(tab.url).origin]
        }, {
          "cache": true
        }, () => {
          console.log('YT Cache Clearer: Cache cleared for', tab.url);
          sendResponse({status: "success"});  // Send a success response
          showNotification(tabId);  // Show a notification in the tab
        });
        return true;  // Indicates that the response will be sent asynchronously
      } else {
        console.error("YT Cache Clearer: Invalid tab or URL", tab);
      }
    });
  } else {
    console.error("YT Cache Clearer: Invalid request or sender", request, sender);
  }
  return true;  // Indicates that the response will be sent asynchronously
});

// Function to show a notification in the tab
function showNotification(tabId) {
  chrome.scripting.executeScript({
    target: { tabId: tabId },
    func: () => {
      // Create a notification element
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
      notification.textContent = "cache cleared";  // Set the notification text
      document.body.appendChild(notification);
      
      // Remove the notification after 3 seconds
      setTimeout(() => {
        notification.remove();
      }, 3000);
    }
  });
}
