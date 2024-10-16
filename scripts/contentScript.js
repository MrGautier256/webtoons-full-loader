// scripts/contentScript.js

// Main function encapsulated to avoid variable conflicts
(function () {
  // Check if the extension is enabled
  chrome.storage.sync.get(["enabled"], function (result) {
    if (result.enabled === false) {
      // If the extension is disabled, do nothing
      return;
    }

    // Add an event listener to detect when the page is fully loaded
    window.addEventListener("load", function () {
      // Initialize variables
      let lastHeight = document.body.scrollHeight;

      // Function to scroll to the bottom of the page
      function scrollToBottom() {
        window.scrollTo(0, document.body.scrollHeight);
      }

      // Scroll the page to load dynamic content
      let timer = setInterval(function () {
        scrollToBottom();

        // Check if new content has been loaded
        let newHeight = document.body.scrollHeight;
        if (newHeight > lastHeight) {
          lastHeight = newHeight;
        } else {
          // If no new content, stop scrolling
          clearInterval(timer);
          // Scroll back to the top of the page
          window.scrollTo(0, 0);
        }
      }, 500); // Reduced interval for faster processing
    });
  });
})();
