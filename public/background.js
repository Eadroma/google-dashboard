// Opens the dashboard in a new tab when the extension icon is clicked.
// Useful for Opera GX where the new-tab override may not trigger automatically.
chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({ url: chrome.runtime.getURL('index.html') });
});
