// Fonction pour mélanger un tableau
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    // Fonction pour enregistrer un cookie
    function setCookie(name, value, days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      const expires = "expires=" + date.toUTCString();
      document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    // Fonction pour lire un cookie
    function getCookie(name) {
      const cookies = document.cookie.split(';');
      for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        if (cookieName === name) {
          return cookieValue;
        }
      }
      return null;
    }

    // Liste des questions et réponses
    const questions = [
      {
        question: "À quoi sert le Nucléole ?",
        options: [
          "À la biosynthèse des lipides, stéroïdes et nouvelles membranes",
          "À la digestion enzymatique de constituants cellulaires et substances ingérés par endocytose",
          "Fabriquer les Ribosomes et l'ARNr"
        ],
        answer: "Fabriquer les Ribosomes et l'ARNr"
      },
      {
        question: "Quel est le nom de la division permettant la production de gamètes ?",
        options: ["La mitose", "La méïose", "La métaphase", "La cytodiérèse"],
        answer: "La méïose"
      },
      {
        question: "Quelles sont les différentes phases de la mitose et dans quel ordre ?",
        options: [
          "La prophase, la prométaphase, la métaphase, l'anaphase, la télophase, la cytodiérèse",
          "La prophase, la prométaphase, la métaphase, la télophase, l'anaphase, la cytodiérèse",
          "La mitose, la méïose",
          "MCP, DDCP, G1/S, RCP; G2/M"
        ],
        answer: "La prophase, la prométaphase, la métaphase, l'anaphase, la télophase, la cytodiérèse"
      },
      {
        question: "Quelle est la fonction de la mitochondrie ?",
        options: [
            "Produire les protéines",
            "Produire l'énergie de la cellule",
            "Produire l'ARNr et l'ARNm",
            "Produire l'ARNm"
        ],
        answer: "Produire l'énergie de la cellule"
      },
      {
        question: "Quelle est la fonction du lysosome ?",
        options: [
            "Digestion enzymatique de constituants cellulaires et de subtances ingérées par endocytose",
            "Produire l'énergie de la cellule",
            "Maturation des protéines",
            "Biosynthèse des lipides, stéroides et nouvelles membranes"
        ],
        answer: "Digestion enzymatique de constituants cellulaires et de subtances ingérées par endocytose"
      },
      {
        question: "Quelle est la fonction des Réticulum endoplasmique granulaires (ou rugueux) ?",
        options: [
            "Digestion enzymatique de constituants cellulaires et de subtances ingérées par endocytose",
            "Produire l'énergie de la cellule",
            "Maturation des protéines",
            "Biosynthèse des lipides, stéroides et nouvelles membranes"
        ],
        answer: "Maturation des protéines"
      },
      {
        question: "Quelle est la fonction des Réticulum endoplasmique lisse ?",
        options: [
            "Digestion enzymatique de constituants cellulaires et de subtances ingérées par endocytose",
            "Produire l'énergie de la cellule",
            "Maturation des protéines",
            "Biosynthèse des lipides, stéroides et nouvelles membranes"
        ],
        answer: "Biosynthèse des lipides, stéroides et nouvelles membranes"
      }
    ];

    // Variables pour gérer le quiz
    let currentQuestion = 0;
    let score = 0;
    let shuffledQuestions = [];

    // Mélanger les questions au chargement de la page
    shuffledQuestions = shuffleArray([...questions]);

    // Fonction pour afficher une question
    function displayQuestion() {
      const quizElement = document.getElementById("quiz");
      if (!quizElement) {
        console.error("L'élément 'quiz' n'existe pas dans le DOM.");
        return;
      }

      const question = shuffledQuestions[currentQuestion];

      // Mélanger les options de la question
      const shuffledOptions = shuffleArray([...question.options]);

      let questionHTML = `
        <div class="question">
          <h2>${question.question}</h2>
          <div class="options">
      `;

      shuffledOptions.forEach((option, index) => {
        questionHTML += `
          <div class="option" data-option="${option}" onclick="selectOption(this)">${option}</div>
        `;
      });

      questionHTML += `
          </div>
        </div>
      `;

      quizElement.innerHTML = questionHTML;
    }

    // Fonction pour sélectionner une option
    function selectOption(element) {
      const options = document.querySelectorAll(".option");
      options.forEach(option => {
        option.classList.remove("selected");
      });
      element.classList.add("selected");
    }

    // Fonction pour vérifier la réponse
    function checkAnswer() {
      const selectedOption = document.querySelector(".option.selected");
      if (!selectedOption) {
        alert("Veuillez sélectionner une réponse !");
        return;
      }

      const userAnswer = selectedOption.getAttribute("data-option");
      const correctAnswer = shuffledQuestions[currentQuestion].answer;

      if (userAnswer === correctAnswer) {
        score++;
      }

      currentQuestion++;

      if (currentQuestion < shuffledQuestions.length) {
        displayQuestion();
      } else {
        showResult();
      }
    }

    // Fonction pour afficher le résultat
    function showResult() {
      const resultElement = document.getElementById("result");
      if (!resultElement) {
        console.error("L'élément 'result' n'existe pas dans le DOM.");
        return;
      }

      resultElement.innerHTML = `
        <p>Votre score : ${score} / ${shuffledQuestions.length}</p>
      `;

      const submitButton = document.getElementById("submit");
      if (submitButton) {
        submitButton.style.display = "none";
      }

      // Enregistrer le score dans un cookie
      setCookie("quizScore", score, 7);
    }

    // Fonction pour afficher le score enregistré dans le cookie
    function displayCookieScore() {
      const cookieScore = getCookie("quizScore");
      const cookieScoreElement = document.getElementById("cookieScore");
      if (cookieScoreElement) {
        if (cookieScore) {
          cookieScoreElement.innerHTML = `
            <p>Votre dernier score enregistré : ${cookieScore} / ${questions.length}</p>
          `;
        } else {
          cookieScoreElement.innerHTML = `
            <p>Aucun score enregistré pour l'instant.</p>
          `;
        }
      }
    }

    // Écouteur d'événement pour le bouton "Soumettre"
    document.addEventListener("DOMContentLoaded", function() {
      const submitButton = document.getElementById("submit");
      if (submitButton) {
        submitButton.addEventListener("click", checkAnswer);
      }

      // Afficher la première question au chargement de la page
      displayQuestion();

      // Afficher le score enregistré dans le cookie
      displayCookieScore();
    });
