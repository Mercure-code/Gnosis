function showElement(content) {
  const infoPanel = document.getElementById("element-info");
  const elementName = document.getElementById("element-name");

  // Si le contenu contient déjà du HTML (comme Hydrogène ou Hélium)
  if (content.includes("<")) {
      elementName.innerHTML = "";
      infoPanel.innerHTML = content;
  } else {
      // Sinon on affiche juste le symbole
      elementName.innerHTML = "Élément sélectionné : " + content;
      infoPanel.innerHTML = "";
  }

  // Faire apparaître le panneau si besoin
  document.getElementById("info-panel").style.display = "block";
}

