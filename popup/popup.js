document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("toggleButton");
    const statusText = document.getElementById("status");

    // Load current status
    chrome.storage.sync.get("isActive", (data) => {
        updateButton(data.isActive || false);
    });

    // Toggle button
    toggleButton.addEventListener("click", () => {
        chrome.storage.sync.get("isActive", (data) => {
            const newStatus = !data.isActive;
            chrome.storage.sync.set({ isActive: newStatus }, () => {
                updateButton(newStatus);
            });
        });
    });

    function updateButton(isActive) {
        statusText.textContent = isActive ? "ON" : "OFF";
        toggleButton.textContent = isActive ? "Disable" : "Enable";
    }
});