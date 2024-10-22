(function () {
  function applyDarkMode(isEnabled) {
    const existingLink = document.getElementById("dark-mode-link");
    if (isEnabled) {
      if (!existingLink) {
        const link = document.createElement("link");
        link.id = "dark-mode-link";
        link.rel = "stylesheet";
        link.href = chrome.runtime.getURL("styles/dark-mode.css"); // chemin vers votre fichier CSS
        document.head.appendChild(link);
      }
    } else if (existingLink) {
      existingLink.remove();
    }
  }

  function applyAutoLoad(isEnabled) {
    if (isEnabled) {
      let lastHeight = document.body.scrollHeight;
      let timer = setInterval(function () {
        window.scrollTo(0, document.body.scrollHeight);
        let newHeight = document.body.scrollHeight;
        if (newHeight > lastHeight) {
          lastHeight = newHeight;
        } else {
          clearInterval(timer);
          window.scrollTo(0, 0);
        }
      }, 500);
    }
  }

  chrome.storage.sync.get(["autoLoad", "darkMode"], function (result) {
    applyAutoLoad(result.autoLoad !== false);
    applyDarkMode(result.darkMode === true);
  });

  chrome.storage.onChanged.addListener(function (changes) {
    if (changes.autoLoad) {
      applyAutoLoad(changes.autoLoad.newValue);
    }
    if (changes.darkMode) {
      applyDarkMode(changes.darkMode.newValue);
    }
  });
})();
