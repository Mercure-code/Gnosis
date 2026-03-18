function showElement(element) {

  const elementName = document.getElementById("element-name");
  const elementInfo = document.getElementById("element-info");
  const infoPanel = document.getElementById("info-panel");

  const descriptions = {
  //    "Nucléole": "Le nucléole fabrique les ribosomes qui servent à produire les protéines.",

    //"mitochondrie": "La mitochondrie produit l'énergie de la cellule grâce à la respiration cellulaire.",

    //"lysosomes": "Les lysosomes digèrent les déchets et les éléments inutiles de la cellule.",

    //"appareil de Golgi": "L'appareil de Golgi modifie, trie et transporte les protéines.",

    //"vacuole": "La vacuole stocke de l'eau, des nutriments et des déchets.",

    //"centrosomes": "Le centrosome joue un rôle important dans la division cellulaire.",

    //"noyau": "Le noyau contient l'ADN et dirige les activités de la cellule.",

    //"reticulum endoplasmique rugeux": "Le réticulum endoplasmique rugueux fabrique les protéines grâce aux ribosomes.",

    //"reticulum endoplasmique lisse": "Le réticulum endoplasmique lisse fabrique les lipides et participe à la détoxification.",

    //"ribosome": "Les ribosomes fabriquent les protéines."
  };

  elementName.textContent = element;

  elementInfo.textContent = descriptions[element] || "Information non disponible.";

  infoPanel.style.display = "block";
}