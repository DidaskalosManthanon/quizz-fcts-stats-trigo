const quizData = [
    {
        question: "Pour la fonction f(x) = 2x + 3, quelle est l'image de x = 2 ?",
        options: ["5", "7", "8", "11"],
        answer: "7",
        feedback: "Pour trouver l'image, remplacez x par 2 dans f(x) = 2x + 3 : f(2) = 2(2) + 3 = 7"
    },
    {
        question: "Dans le tableau L = {9, 7, 7, 7, 7, 4, 4, 4, 5, 5, 3, 3, 3, 3, 3, 2, 2, 1}, quel est l'effectif total ?",
        options: ["16", "17", "18", "19"],
        answer: "17",
        feedback: "Comptez chaque nombre dans le tableau : il y a 17 valeurs au total"
    },
    {
        question: "Quelle est la valeur de sin(60°) ?",
        options: ["1/2", "√3/2", "2/3", "3/4"],
        answer: "√3/2",
        feedback: "À 60°, le sinus vaut √3/2 soit environ 0,866"
    },
    {
        question: "Pour la fonction g(x) = 3x² - 5, quelle est l'image de x = 1 ?",
        options: ["-2", "-1", "0", "2"],
        answer: "-2",
        feedback: "Pour trouver l'image, remplacez x par 1 dans g(x) = 3x² - 5 : g(1) = 3(1)² - 5 = -2"
    },
    {
        question: "Dans le tableau L donné, quelle est la fréquence du nombre 7 ?",
        options: ["3", "4", "5", "6"],
        answer: "4",
        feedback: "Le nombre 7 apparaît 4 fois dans le tableau"
    }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 60;
let timerInterval;

const timerEl = document.getElementById("time");
const questionEl = document.querySelector(".question");
const optionsEl = document.querySelector(".options");
const restartBtn = document.querySelector(".restart-btn");
const progressEl = document.querySelector(".progress");

function loadQuestion() {
    if (currentQuestion >= quizData.length) {
        endQuiz();
        return;
    }
    
    clearInterval(timerInterval);
    timeLeft = 60;
    timerEl.textContent = timeLeft;
    startTimer();
    
    const currentQuiz = quizData[currentQuestion];
    questionEl.textContent = currentQuiz.question;
    optionsEl.innerHTML = "";
    
    currentQuiz.options.forEach(option => {
        const button = document.createElement("button");
        button.classList.add("option");
        button.textContent = option;
        button.onclick = () => selectAnswer(option);
        optionsEl.appendChild(button);
    });
    
    updateProgress();
}

function selectAnswer(selectedOption) {
    const buttons = document.querySelectorAll(".option");
    buttons.forEach(btn => btn.classList.remove("selected"));
    event.target.classList.add("selected");

    const correct = selectedOption === quizData[currentQuestion].answer;
    if (correct) score++;

    showFeedback(correct);
    setTimeout(nextQuestion, 1500);
}

function showFeedback(isCorrect) {
    const feedbackDiv = document.createElement("div");
    feedbackDiv.className = `feedback ${isCorrect ? "correct" : "incorrect"}`;
    feedbackDiv.textContent = quizData[currentQuestion].feedback;
    optionsEl.after(feedbackDiv);
}

function nextQuestion() {
    currentQuestion++;
    loadQuestion();
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;

        if (timeLeft <= 0) {
            endQuiz();
        }
    }, 1000);
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    progressEl.style.width = `${progress}%`;
}

function endQuiz() {
    clearInterval(timerInterval);
    questionEl.style.display = "none";
    optionsEl.style.display = "none";
    restartBtn.style.display = "block";
    
    const resultHtml = `
        <div class="result">
            Score final : ${score}/${quizData.length}<br><br>
            ${score >= quizData.length * 0.7 ? 
                "Excellent travail !" : 
                score >= quizData.length * 0.5 ? 
                    "Continue comme ça !" : 
                    "Revise ces concepts"}
        </div>
    `;
    document.querySelector(".quiz-container").insertAdjacentHTML("beforeend", resultHtml);
}

restartBtn.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    progressEl.style.width = "0%";
    questionEl.style.display = "block";
    optionsEl.style.display = "block";
    restartBtn.style.display = "none";
    document.querySelectorAll(".feedback").forEach(el => el.remove());
    loadQuestion();
});

loadQuestion();