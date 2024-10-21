(function () {
  function applyDarkMode(isEnabled) {
    const existingStyle = document.getElementById("dark-mode-style");
    if (isEnabled) {
      if (!existingStyle) {
        const darkModeStyle = document.createElement("style");
        darkModeStyle.id = "dark-mode-style";
        darkModeStyle.textContent = `
          body, .viewer_lst, .viewer_img img {
            background-color: #121212 !important;
            color: #e0e0e0 !important;
          }
          .viewer_img img {
            filter: brightness(80%) contrast(110%);
          }
        `;
        document.head.appendChild(darkModeStyle);
      }
    } else if (existingStyle) {
      existingStyle.remove();
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
