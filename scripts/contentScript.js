(function () {
  // Fonction pour appliquer le mode sombre
  function applyDarkMode(isEnabled) {
    const existingLink = document.getElementById("dark-mode-link");
    if (isEnabled) {
      if (!existingLink) {
        const link = document.createElement("link");
        link.id = "dark-mode-link";
        link.rel = "stylesheet";
        link.href = chrome.runtime.getURL("styles/dark-mode.css"); // Chemin vers votre fichier CSS
        document.head.appendChild(link);
      }
    } else if (existingLink) {
      existingLink.remove();
    }
  }

  // Fonction pour précharger toutes les images de la page avec un délai
  function preloadImages() {
    const images = document.querySelectorAll("img._images"); // Sélectionne toutes les images avec la classe _images
    images.forEach((image, index) => {
      const src = image.getAttribute("data-url"); // Récupère l'URL réelle de l'image
      if (src) {
        // Précharge progressivement les images avec un léger délai entre chaque
        setTimeout(() => {
          const img = new Image();
          img.src = src; // Force le préchargement de l'image
        }, index * 500); // Chaque image est chargée avec un intervalle de 500ms
      }
    });
  }

  // Fonction pour auto-charger la page
  function applyAutoLoad(isEnabled) {
    if (isEnabled) {
      console.log("Début du chargement automatique");
      let lastHeight = document.body.scrollHeight;
      let timer = setInterval(function () {
        window.scrollTo(0, document.body.scrollHeight); // Défiler vers le bas
        let newHeight = document.body.scrollHeight;
        if (newHeight > lastHeight) {
          lastHeight = newHeight;
        } else {
          clearInterval(timer);
          window.scrollTo(0, 0); // Remonter en haut de la page après le chargement
        }
      }, 500);
      console.log("Fin du chargement automatique");
    }
  }

  // Récupère les préférences depuis chrome.storage et applique les fonctionnalités
  chrome.storage.sync.get(["autoLoad", "darkMode"], function (result) {
    applyAutoLoad(result.autoLoad !== false); // Active l'auto-load si la préférence est activée
    applyDarkMode(result.darkMode === true); // Applique le mode sombre si activé

    // Délai avant de commencer à précharger les images pour permettre à l'utilisateur de lire le début
    setTimeout(() => {
      preloadImages(); // Précharge les images après un délai de 2 secondes
    }, 2000);
  });

  // Écoute les changements dans chrome.storage (si l'utilisateur change les préférences dans la popup)
  chrome.storage.onChanged.addListener(function (changes) {
    if (changes.autoLoad) {
      applyAutoLoad(changes.autoLoad.newValue);
    }
    if (changes.darkMode) {
      applyDarkMode(changes.darkMode.newValue);
    }
  });
})();
