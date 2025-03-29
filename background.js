// Background service (blocks sites)
chrome.webNavigation.onBeforeNavigate.addListener((details) => {
    chrome.storage.sync.get(["blacklist", "isActive"], (data) => {
        if (!data.isActive) return;  // Skip if inactive

        const blockedSites = data.blacklist || [];
        const url = new URL(details.url);
        const domain = url.hostname;

        // Check if site is blacklisted
        if (blockedSites.some(site => domain.includes(site))) {
            chrome.tabs.update(details.tabId, {
                url: chrome.runtime.getURL("blocked/blocked.html") // Redirect to block page
            });
        }
    });
});