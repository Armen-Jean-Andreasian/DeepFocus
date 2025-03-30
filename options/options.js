/**
 * Gets blacklist from storage
 */
function getBlacklistFromStorage(callback) {
    chrome.storage.sync.get("blacklist", (data) => {
        callback(data.blacklist || []);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const siteInput = document.getElementById("siteInput");
    const addButton = document.getElementById("addButton");
    const blacklistElement = document.getElementById("blacklist");

    // Load current blacklist
    refreshBlockListDisplay();

    // Add site to list
    addButton.addEventListener("click", () => {
        const site = siteInput.value.trim();
        if (!site) return;

        getBlacklistFromStorage((blacklist) => {
            if (!blacklist.includes(site)) {
                chrome.storage.sync.set(
                    { blacklist: [...blacklist, site] },
                    () => {
                        siteInput.value = "";
                        refreshBlockListDisplay();
                    }
                );
            }
        });
    });

    // Refresh the visible list
    function refreshBlockListDisplay() {
        getBlacklistFromStorage((blacklist) => {
            blacklistElement.innerHTML = "";
            blacklist.forEach(site => {
                const li = document.createElement("li");
                li.textContent = site + " ";

                const btn = document.createElement("button");
                btn.textContent = "Remove";
                btn.onclick = () => {
                    getBlacklistFromStorage((currentList) => {
                        chrome.storage.sync.set(
                            { blacklist: currentList.filter(s => s !== site) },
                            refreshBlockListDisplay
                        );
                    });
                };

                li.appendChild(btn);
                blacklistElement.appendChild(li);
            });
        });
    }
});