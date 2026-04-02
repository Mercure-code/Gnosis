// 1. Remplace par l'URL brute de ton Gist
const GIST_URL = "https://gist.githubusercontent.com/Mercure-code/4166229fbd40c73a8b460554d8485aca/raw/users.json";
// 2. Remplace par ton token GitHub
const GITHUB_TOKEN = "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";
// 3. Remplace par l'ID de ton Gist
const GIST_ID = "4166229fbd40c73a8b460554d8485aca";

// Fonction pour afficher un message en haut de la page
function showMessage(message, isError = true) {
  const messageElement = document.getElementById("message");
  messageElement.textContent = message;
  messageElement.className = isError ? "message error" : "message success";
  messageElement.style.display = "block";

  // Cache le message après 5 secondes
  setTimeout(() => {
    messageElement.style.display = "none";
  }, 5000);
}

// Charge les utilisateurs depuis le Gist
async function loadUsers() {
  try {
    const url = `${GIST_URL}?t=${Date.now()}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Erreur : ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Erreur chargement :", error);
    showMessage(`Erreur lors du chargement des utilisateurs : ${error.message}`);
    return [];
  }
}

// Sauvegarde les utilisateurs dans le Gist
async function saveUsers(users) {
  try {
    const response = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        files: {
          "users.json": {
            content: JSON.stringify(users, null, 2),
          },
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`GitHub API Error: ${errorData.message}`);
    }

    showMessage("Inscription réussie !", false);
    return true;
  } catch (error) {
    console.error("Erreur sauvegarde :", error);
    showMessage(`Erreur lors de la sauvegarde : ${error.message}`);
    return false;
  }
}

// Affiche le formulaire d'inscription
function showRegister() {
  document.getElementById("auth-form").style.display = "none";
  document.getElementById("register-form").style.display = "block";
  document.getElementById("message").style.display = "none";
}

// Affiche le formulaire de connexion
function showLogin() {
  document.getElementById("register-form").style.display = "none";
  document.getElementById("auth-form").style.display = "block";
  document.getElementById("message").style.display = "none";
}

// Inscription
async function register() {
  const username = document.getElementById("new-username").value.trim();
  const password = document.getElementById("new-password").value.trim();
  const email = document.getElementById("new-email").value.trim();
  const age = document.getElementById("new-age").value.trim();

  if (!username || !password || !email || !age) {
    showMessage("Veuillez remplir tous les champs.");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showMessage("Veuillez entrer un email valide.");
    return;
  }

  const users = await loadUsers();
  if (users.some((user) => user.username === username)) {
    showMessage("Ce nom d'utilisateur est déjà pris.");
    return;
  }

  users.push({ username, password, email, age });
  const success = await saveUsers(users);
  if (success) {
    setTimeout(() => {
      showLogin();
    }, 2000);
  }
}

// Connexion
async function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    showMessage("Veuillez remplir tous les champs.");
    return;
  }

  const users = await loadUsers();
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    showMessage("Identifiants incorrects.");
    return;
  }

  localStorage.setItem("currentUser", JSON.stringify(user));
  showWelcome();
}

// Déconnexion
function logout() {
  localStorage.removeItem("currentUser");
  document.getElementById("welcome").style.display = "none";
  document.getElementById("auth-form").style.display = "block";
  document.getElementById("message").style.display = "none";
}

// Affiche la page de bienvenue
function showWelcome() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  document.getElementById("welcome-username").textContent = user.username;
  document.getElementById("welcome-email").textContent = user.email;
  document.getElementById("welcome-age").textContent = user.age;

  document.getElementById("auth-form").style.display = "none";
  document.getElementById("register-form").style.display = "none";
  document.getElementById("welcome").style.display = "block";
  document.getElementById("message").style.display = "none";
}

// Vérifie si un utilisateur est déjà connecté
if (localStorage.getItem("currentUser")) {
  showWelcome();
}








// enregistrement du score quiz
// Fonction pour mettre à jour le score d'un utilisateur dans le Gist
async function updateUserScore(username, score) {
  try {
    const users = await loadUsers();
    const userIndex = users.findIndex(user => user.username === username);

    if (userIndex === -1) {
      throw new Error("Utilisateur non trouvé.");
    }

    // Ajoute ou met à jour le score de l'utilisateur
    users[userIndex].score = score;

    // Sauvegarde les utilisateurs mis à jour dans le Gist
    const success = await saveUsers(users);
    if (success) {
      console.log("Score mis à jour avec succès !");
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour du score :", error);
    showMessage(`Erreur lors de la mise à jour du score : ${error.message}`);
  }
}
