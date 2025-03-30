document.addEventListener("DOMContentLoaded", () => {
    const siteInput = document.getElementById("siteInput");
    const addButton = document.getElementById("addButton");
    const blacklistElement = document.getElementById("blacklist");

    // Load current blacklist
    loadBlacklist();

    // Add site to list
    addButton.addEventListener("click", () => {
        const site = siteInput.value.trim();
        if (!site) return;

        chrome.storage.sync.get("blacklist", (data) => {
            const blacklist = data.blacklist || [];
            if (!blacklist.includes(site)) {
                blacklist.push(site);
                chrome.storage.sync.set({ blacklist }, () => {
                    siteInput.value = "";
                    loadBlacklist();
                });
            }
        });
    });

    // Remove site from list
    blacklistElement.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
            const site = e.target.dataset.site;
            chrome.storage.sync.get("blacklist", (data) => {
                const updatedList = data.blacklist.filter(item => item !== site);
                chrome.storage.sync.set({ blacklist: updatedList }, loadBlacklist);
            });
        }
    });

    // Render blacklist
    function loadBlacklist() {
        chrome.storage.sync.get("blacklist", (data) => {
            blacklistElement.innerHTML = ""; // This is safe (clearing only)
            (data.blacklist || []).forEach(site => {
                const li = document.createElement("li");

                // Safe text content
                const siteText = document.createTextNode(site + " ");

                // Safe button creation
                const button = document.createElement("button");
                button.className = "delete-btn";
                button.textContent = "Remove";
                button.dataset.site = site;

                // Build DOM safely
                li.appendChild(siteText);
                li.appendChild(button);
                blacklistElement.appendChild(li);
            });
        });
    }
});