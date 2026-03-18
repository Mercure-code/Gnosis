const database = [
    {
        noms: [
            "tableau périodique",
        ],
        lien: "tableau2.html"
    },
    {
        noms: [
            "cellule",
        ],
        lien: "cellule.html"
    },
    {
        noms: [
            "accueil"
        ],
        lien: "index.html"
    }
];

function rechercher() {
    let input = document.getElementById("search").value.toLowerCase();
    let results = document.getElementById("results");

    results.innerHTML = "";

    if (input === "") return;

    let found = false;

    database.forEach(item => {
        item.noms.forEach(nom => {
            if (nom.toLowerCase().includes(input)) {
                results.innerHTML += `
                    <div class="result">
                        <a href="${item.lien}">${nom}</a>
                    </div>
                `;
                found = true;
            }
        });
    });

    if (!found) {
        results.innerHTML = "<p>Aucun résultat trouvé.</p>";
    }
}

function toggleMenu() {
    const menu = document.getElementById("burgerContent");
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}
