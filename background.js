// Background service (blocks sites)
chrome.webNavigation.onBeforeNavigate.addListener((details) => {
    // Only block main frame navigations (not iframes/embeds)
    if (details.frameId !== 0) return;

    chrome.storage.sync.get(["blacklist", "isActive"], (data) => {
        if (!data.isActive) return;

        const blockedSites = data.blacklist || [];
        const url = new URL(details.url);

        // Only block direct navigations to blocked sites
        if (blockedSites.some(site =>
            url.hostname === site ||
            url.hostname.endsWith(`.${site}`)
        )) {
            chrome.tabs.update(details.tabId, {
                url: chrome.runtime.getURL("blocked/blocked.html")
            });
        }
    });
});