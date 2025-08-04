let currentTab = null;
let startTime = null;

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  handleTabChange(tab);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.active && changeInfo.status === "complete") {
    handleTabChange(tab);
  }
});

async function handleTabChange(tab) {
  const now = Date.now();

  if (currentTab && startTime) {
    const timeSpent = now - startTime;
    const domain = new URL(currentTab.url).hostname;

    const data = await chrome.storage.local.get("siteData");
    const siteData = data.siteData || {};

    siteData[domain] = (siteData[domain] || 0) + timeSpent;

    chrome.storage.local.set({ siteData });
  }

  currentTab = tab;
  startTime = now;
}

chrome.runtime.onStartup.addListener(() => {
  currentTab = null;
  startTime = null;
});
