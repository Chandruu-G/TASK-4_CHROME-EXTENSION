function formatTime(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  return `${minutes} min ${seconds % 60} sec`;
}

chrome.storage.local.get("siteData", (data) => {
  const siteList = document.getElementById("siteList");
  const sites = data.siteData || {};

  const sortedSites = Object.entries(sites).sort((a, b) => b[1] - a[1]);

  sortedSites.forEach(([site, time]) => {
    const li = document.createElement("li");
    li.textContent = `${site}: ${formatTime(time)}`;
    siteList.appendChild(li);
  });
});
