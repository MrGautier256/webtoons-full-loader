// scripts/popup.js

const toggle = document.getElementById("toggleExtension");
const statusText = document.getElementById("status");

chrome.storage.sync.get(["enabled"], function (result) {
  const isEnabled = result.enabled !== undefined ? result.enabled : true;
  toggle.checked = isEnabled;
  statusText.textContent = isEnabled ? "Enabled" : "Disabled";
});

toggle.addEventListener("change", function () {
  const isEnabled = toggle.checked;
  chrome.storage.sync.set({ enabled: isEnabled });
  statusText.textContent = isEnabled ? "Enabled" : "Disabled";
});
