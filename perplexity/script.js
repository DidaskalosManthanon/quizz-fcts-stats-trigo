const questions = [
    {
    question: "Quelle est l'image de 2 par la fonction f(x) = 2x + 3 ?",
    answers: ["5", "7", "6", "8"],
    correctAnswer: "7"
    },
    {
    question: "Quel est l'antécédent de 11 par la fonction f(x) = 3x + 2 ?",
    answers: ["3", "4", "5", "6"],
    correctAnswer: "3"
    },
    {
    question: "Si un ensemble de données est L = {1, 2, 3, 4, 5}, quelle est la moyenne ?",
    answers: ["1", "2", "3", "4"],
    correctAnswer: "3"
    },
    {
    question: "Dans un triangle rectangle, si l'angle est de 30 degrés et l'hypoténuse est de 10, quelle est la longueur du côté opposé?",
    answers: ["4", "5", "6", "7"],
    correctAnswer: "5"
    }
   ];
   
   const questionEl = document.getElementById("question");
   const answerBtns = document.querySelectorAll(".btn");
   const submitBtn = document.getElementById("submit-btn");
   const resultEl = document.getElementById("result");
   
   let currentQuestionIndex = 0;
   let score = 0;
   
   function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
   
    answerBtns.forEach((button, index) => {
    button.textContent = currentQuestion.answers[index];
    button.addEventListener("click", () => {
    if (button.textContent === currentQuestion.correctAnswer) {
    score++;
    }
    });
    });
   }
   
   function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
    loadQuestion();
    } else {
    showResult();
    }
   }
   
   function showResult() {
    questionEl.textContent = "";
    answerBtns.forEach(button => button.style.display = "none");
    submitBtn.style.display = "none";
    resultEl.textContent = `Votre score est de ${score} sur ${questions.length}`;
   }
   
   loadQuestion();
   
   submitBtn.addEventListener("click", () => {
    nextQuestion();
   });
   