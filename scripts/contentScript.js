(function () {
  function applyDarkMode(isEnabled) {
    const existingStyle = document.getElementById("dark-mode-style");
    if (isEnabled) {
      if (!existingStyle) {
        const darkModeStyle = document.createElement("style");
        darkModeStyle.id = "dark-mode-style";
        darkModeStyle.textContent = `
          body, .viewer_lst, .viewer_img img, .comment_section, .suggestions_section, .episode_area, #notice_detail, footer {
            background-color: #121212 !important;
            color: #e0e0e0 !important;
          }
          .viewer_img img {
            filter: brightness(80%) contrast(110%);
          }
          /* Correction de la couleur des liens */
          a, a:visited {
            color: #bb86fc !important;
          }
          /* Couleur des boutons */
          button {
            background-color: #333 !important;
            color: #fff !important;
          }
          /* Forcer la couleur du texte dans les sections commentaires et suggestions */
          .comment_area, .comment_section, .suggestions_section, .comment_section, .wcc_Editor__root * {
            color: #e0e0e0 !important;
            background-color: #1f1f1f !important;
          }
          /* Pour cibler directement le texte dans les commentaires et suggestions */
          .comment_area p, .suggestions_section p, .comment_area span, .suggestions_section span {
            color: #e0e0e0 !important;
          }
          /* Pour la zone episode_area */
          .episode_area, #bottomEpisodeList {
            background-color: #1f1f1f !important;
            color: #e0e0e0 !important;
          }
          /* Style pour le footer */
          #footer {
            background-color: #222 !important; /* Fond sombre */
            color: #ccc !important; /* Texte clair */
          }
          #footer a {
            color: #00ccff !important; /* Liens en mode sombre */
          }
          .foot_cont .txt {
            color: #ccc !important; /* Texte clair pour les messages */
          }
          .foot_cont .btn_google, .foot_cont .btn_ios {
            background-color: #333 !important; /* Boutons sombres */
            color: #fff !important; /* Texte des boutons en blanc */
          }
          .copyright, .foot_logo {
            color: #ccc !important; /* Couleur du texte pour le copyright et logo */
          }
          .bar {
            color: #555 !important; /* Barre de séparation plus discrète */
          }
          /* Style pour la zone de notice */
          .notice_area {
            background-color: #1f1f1f !important;
            color: #e0e0e0 !important;
          }
          .notice_area a, .notice_area a:visited {
            color: #bb86fc !important; /* Liens de la zone de notice */
          }
          .notice_area .subj {
            color: #e0e0e0 !important; /* Texte de la notice */
          }
          .notice_area .date {
            color: #aaaaaa !important; /* Couleur de la date dans la notice */
          }
          /* Style pour .day_info et .dsc_encourage en mode sombre */
          .day_info, .dsc_encourage {
            color: #ffffff !important; /* Texte blanc */
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
