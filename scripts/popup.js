const toggleAutoLoad = document.getElementById("toggleAutoLoad");
const toggleDarkMode = document.getElementById("toggleDarkMode");

chrome.storage.sync.get(["autoLoad", "darkMode"], function (result) {
  toggleAutoLoad.checked =
    result.autoLoad !== undefined ? result.autoLoad : true;
  toggleDarkMode.checked =
    result.darkMode !== undefined ? result.darkMode : false;
});

toggleAutoLoad.addEventListener("change", function () {
  chrome.storage.sync.set({ autoLoad: toggleAutoLoad.checked });
});

toggleDarkMode.addEventListener("change", function () {
  chrome.storage.sync.set({ darkMode: toggleDarkMode.checked });
});
