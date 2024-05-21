let notification = document.createElement('div');
notification.style.position = 'fixed';
notification.style.top = '10px';
notification.style.right = '10px';
notification.style.backgroundColor = '#44c767';
notification.style.color = 'white';
notification.style.padding = '10px';
notification.style.zIndex = '10000';
notification.style.borderRadius = '5px';
notification.textContent = 'Page cache has been cleared!';
document.body.appendChild(notification);


setTimeout(() => {
  notification.remove();
}, 3000);
