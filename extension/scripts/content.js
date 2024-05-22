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
