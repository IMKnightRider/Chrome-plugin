let timeSpent = {};

chrome.tabs.onActivated.addListener(activeInfo => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    startTimer(tab.url);
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    startTimer(tab.url);
  }
});

function startTimer(url) {
  let domain = (new URL(url)).hostname;
  if (!timeSpent[domain]) {
    timeSpent[domain] = 0;
  }

  setInterval(() => {
    timeSpent[domain] += 10;
    chrome.storage.local.set({ timeSpent: timeSpent });
  }, 10000);
}
