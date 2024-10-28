const toggleAutoLoad = document.getElementById("toggleAutoLoad");
const toggleDarkMode = document.getElementById("toggleDarkMode");
const brightnessSlider = document.getElementById("brightnessSlider");
const brightnessValue = document.getElementById("brightnessValue");

chrome.storage.sync.get(
  ["autoLoad", "darkMode", "brightness"],
  function (result) {
    toggleAutoLoad.checked =
      result.autoLoad !== undefined ? result.autoLoad : true;
    toggleDarkMode.checked =
      result.darkMode !== undefined ? result.darkMode : false;
    brightnessSlider.value =
      result.brightness !== undefined ? result.brightness : 100;
    brightnessValue.textContent = `${brightnessSlider.value}%`; 
  }
);

toggleAutoLoad.addEventListener("change", function () {
  chrome.storage.sync.set({ autoLoad: toggleAutoLoad.checked });
});

toggleDarkMode.addEventListener("change", function () {
  chrome.storage.sync.set({ darkMode: toggleDarkMode.checked });
});

brightnessSlider.addEventListener("input", function () {
  const brightness = brightnessSlider.value;
  chrome.storage.sync.set({ brightness }); 
  brightnessValue.textContent = `${brightness}%`; 
});
