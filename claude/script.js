// Fonction pour générer un nombre aléatoire entre min et max (inclus)
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Fonction pour arrondir à un nombre spécifique de décimales
function roundToDecimal(num, decimals) {
    return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

// Générateur de questions aléatoires
function generateRandomQuestions() {
    const questionBank = [];
    
    // 1. Question sur f(x) = ax + b
    const a = getRandomInt(1, 5);
    const b = getRandomInt(-5, 5);
    const x = getRandomInt(1, 5);
    const result = a * x + b;
    
    const resultOptions = [
        result,
        result + getRandomInt(1, 3),
        result - getRandomInt(1, 3),
        result * getRandomInt(2, 3)
    ].sort(() => Math.random() - 0.5); // Mélanger les options
    
    questionBank.push({
        question: `Si \(f(x) = ${a}x ${b >= 0 ? '+ ' + b : '- ' + Math.abs(b)}\), quelle est la valeur de \(f(${x})\) ?`,
        options: resultOptions.map(String),
        correctAnswer: resultOptions.indexOf(result),
        explanation: `\(f(${x}) = ${a} × ${x} ${b >= 0 ? '+ ' + b : '- ' + Math.abs(b)} = ${a * x} ${b >= 0 ? '+ ' + b : '- ' + Math.abs(b)} = ${result}\)`
    });
    
    // 2. Question sur g(x) = ax² + b
    const g_a = getRandomInt(1, 4);
    const g_b = getRandomInt(-5, 5);
    const g_result = getRandomInt(10, 30);
    
    // Calculer x (solution de ax² + b = result)
    const discriminant = g_result - g_b;
    const x_value = Math.sqrt(discriminant / g_a);
    const x_rounded = Math.round(x_value);
    
    const x_options = [
        x_rounded,
        -x_rounded,
        x_rounded + 1,
        -(x_rounded + 1)
    ];
    
    questionBank.push({
        question: `Si \(g(x) = ${g_a}x² ${g_b >= 0 ? '+ ' + g_b : '- ' + Math.abs(g_b)}\), trouvez l'antécédent de \(${g_result}\) par la fonction \(g\).`,
        options: x_options.map(x => `\(x = ${x}\)`),
        correctAnswer: 0, // Nous considérons la valeur positive comme la réponse correcte pour simplifier
        explanation: `On cherche \(x\) tel que \(g(x) = ${g_result}\). \n\(${g_a}x² ${g_b >= 0 ? '+ ' + g_b : '- ' + Math.abs(g_b)} = ${g_result} \n${g_a}x² = ${discriminant} \nx² = ${discriminant / g_a} \nx = ±${x_value.toFixed(2)}\) \nParmi les options, \(x = ${x_rounded}\) est le plus proche.`
    });
    
    // 3. Générer une liste aléatoire pour les statistiques
    const list = [];
    const length = getRandomInt(15, 20);
    const uniqueValues = getRandomInt(5, 8);
    const values = [];
    
    for (let i = 0; i < uniqueValues; i++) {
        values.push(getRandomInt(1, 9));
    }
    
    for (let i = 0; i < length; i++) {
        list.push(values[getRandomInt(0, uniqueValues - 1)]);
    }
    
    list.sort((a, b) => a - b);
    
    // Calculer la médiane
    let median;
    if (list.length % 2 === 0) {
        median = (list[list.length / 2 - 1] + list[list.length / 2]) / 2;
    } else {
        median = list[Math.floor(list.length / 2)];
    }
    
    // Générer des options pour la médiane
    const medianOptions = [
        median,
        median + 0.5,
        median - 0.5,
        median + 1
    ].sort(() => Math.random() - 0.5);
    
    questionBank.push({
        question: `Pour la liste \(L = \{${list.join(', ')}\}\), quelle est la médiane ?`,
        options: medianOptions.map(String),
        correctAnswer: medianOptions.indexOf(median),
        explanation: `En ordonnant la liste par ordre croissant et comme il y a \(${list.length}\) valeurs (nombre ${list.length % 2 === 0 ? 'pair' : 'impair'}), la médiane est ${list.length % 2 === 0 ? `la moyenne des ${list.length/2}ème et ${list.length/2 + 1}ème valeurs, soit (${list[list.length/2 - 1]}+${list[list.length/2]})/2 = ${median}` : `la ${Math.floor(list.length/2) + 1}ème valeur, soit ${median}`}`
    });
    
    // 4. Calculer la moyenne de la liste
    const sum = list.reduce((a, b) => a + b, 0);
    const mean = sum / list.length;
    const roundedMean = roundToDecimal(mean, 2);
    
    const meanOptions = [
        roundedMean,
        roundToDecimal(roundedMean + 0.33, 2),
        roundToDecimal(roundedMean - 0.22, 2),
        roundToDecimal(roundedMean + 0.67, 2)
    ].sort(() => Math.random() - 0.5);
    
    questionBank.push({
        question: `Quelle est la moyenne de la liste L = {${list.join(', ')}} ?`,
        options: meanOptions.map(String),
        correctAnswer: meanOptions.indexOf(roundedMean),
        explanation: `La moyenne est égale à la somme des valeurs divisée par le nombre de valeurs. \nSomme = ${list.join('+')} = ${sum} \nNombre de valeurs = ${list.length} \nMoyenne = ${sum}/${list.length} = ${roundedMean}`
    });
    
    // 5. Question sur le cosinus
    const angles = [
        { angle: 0, cos: 1 },
        { angle: 30, cos: 0.866 },
        { angle: 45, cos: 0.707 },
        { angle: 60, cos: 0.5 },
        { angle: 90, cos: 0 }
    ];
    
    const selectedAngle = angles[getRandomInt(1, 4)]; // Éviter 0 degrés pour plus d'intérêt
    const cosOptions = [
        selectedAngle.angle,
        (selectedAngle.angle + 30) % 180,
        (selectedAngle.angle + 45) % 180,
        (selectedAngle.angle + 60) % 180
    ].sort(() => Math.random() - 0.5);
    
    questionBank.push({
        question: `Si \(\cos(\theta) = ${selectedAngle.cos}\), quelle est la valeur de \(\theta\) (en degrés) ?`,
        options: cosOptions.map(a => `${a}°`),
        correctAnswer: cosOptions.indexOf(selectedAngle.angle),
        explanation: `L'angle \(\theta\) dont le cosinus vaut \(${selectedAngle.cos}\) est \(${selectedAngle.angle}\)° (ou aussi ${(360 - selectedAngle.angle) % 360}° dans le cercle trigonométrique).`
    });
    
    // 6. Question sur un diagramme circulaire
    const percentage = getRandomInt(1, 4) * 10; // 10%, 20%, 30% ou 40%
    const angle = (percentage / 100) * 360;
    
    const angleOptions = [
        angle,
        angle - 30,
        angle + 30,
        angle + 45
    ].sort(() => Math.random() - 0.5);
    
    questionBank.push({
        question: `Dans un diagramme circulaire représentant les résultats d'un sondage où ${percentage}% des personnes préfèrent le bleu, quel angle central correspond à cette proportion ?`,
        options: angleOptions.map(a => `${a}°`),
        correctAnswer: angleOptions.indexOf(angle),
        explanation: `Dans un diagramme circulaire, l'angle central est proportionnel à la fréquence. \n${percentage}% de 360° = ${percentage/100} × 360° = ${angle}°`
    });
    
    // 7. Question sur la composition de fonctions
    const f_a = getRandomInt(1, 3);
    const f_b = getRandomInt(1, 5);
    const g_a_comp = getRandomInt(1, 3);
    const g_b_comp = getRandomInt(-3, 3);
    const x_comp = getRandomInt(1, 3);
    
    const g_result_comp = g_a_comp * (x_comp * x_comp) + g_b_comp;
    const f_result_comp = f_a * g_result_comp + f_b;
    
    const compOptions = [
        f_result_comp,
        f_result_comp + 2,
        f_result_comp - 2,
        f_result_comp + 4
    ].sort(() => Math.random() - 0.5);
    
    questionBank.push({
        question: `Si \(f(x) = ${f_a}x + ${f_b}\) et \(g(x) = ${g_a_comp}x^2 ${g_b_comp >= 0 ? '+ ' + g_b_comp : '- ' + Math.abs(g_b_comp)}\), quelle est la valeur de \(f(g(${x_comp}))\) ?`,
        options: compOptions.map(String),
        correctAnswer: compOptions.indexOf(f_result_comp),
        explanation: `\(f(g(${x_comp}))\) signifie qu'on applique d'abord g à ${x_comp}, puis f au résultat. \ng(${x_comp}) = ${g_a_comp}×${x_comp}² ${g_b_comp >= 0 ? '+ ' + g_b_comp : '- ' + Math.abs(g_b_comp)} = ${g_a_comp}×${x_comp * x_comp} ${g_b_comp >= 0 ? '+ ' + g_b_comp : '- ' + Math.abs(g_b_comp)} = ${g_a_comp * (x_comp * x_comp)} ${g_b_comp >= 0 ? '+ ' + g_b_comp : '- ' + Math.abs(g_b_comp)} = ${g_result_comp} \nf(${g_result_comp}) = ${f_a}×${g_result_comp} + ${f_b} = ${f_a * g_result_comp} + ${f_b} = ${f_result_comp}`
    });
    
    // 8. Question sur la tangente
    const sin_options = [0.5, 0.707, 0.866];
    const sin_value = sin_options[getRandomInt(0, 2)];
    const cos_values = {
        0.5: 0.866,
        0.707: 0.707,
        0.866: 0.5
    };
    const cos_value = cos_values[sin_value];
    const tan_value = roundToDecimal(sin_value / cos_value, 3);
    
    const tanOptions = [
        tan_value,
        roundToDecimal(sin_value, 3),
        roundToDecimal(cos_value, 3),
        roundToDecimal(tan_value * 2, 3)
    ].sort(() => Math.random() - 0.5);
    
    questionBank.push({
        question: `Si \(\sin(\alpha) = ${sin_value}\) et \(\cos(\alpha) = ${cos_value}\), quelle est la valeur approximative de \(\tan(\alpha)\) ?`,
        options: tanOptions.map(String),
        correctAnswer: tanOptions.indexOf(tan_value),
        explanation: `La tangente est définie par \(\tan(\alpha) = \dfrac{\sin(\alpha)}{\cos(\alpha)}\) \n\(\tan(\alpha) = \dfrac{${sin_value}}{${cos_value}} \simeq ${tan_value}\)`
    });
    
    // 9. Question sur le mode (valeur la plus fréquente)
    // Créer une distribution avec un mode clair
    const modeList = [...list]; // Copier la liste précédente
    const modeValue = values[getRandomInt(0, uniqueValues - 1)];
    
    // Ajouter plus d'occurrences de la valeur du mode
    for (let i = 0; i < 5; i++) {
        modeList.push(modeValue);
    }
    
    // Calculer les fréquences
    const frequencies = {};
    for (let val of modeList) {
        frequencies[val] = (frequencies[val] || 0) + 1;
    }
    
    // Déterminer le mode (valeur la plus fréquente)
    let mode = modeValue;
    let maxFreq = 0;
    for (let val in frequencies) {
        if (frequencies[val] > maxFreq) {
            maxFreq = frequencies[val];
            mode = parseInt(val);
        }
    }
    
    const modeOptions = [
        mode,
        values.find(v => v !== mode && v !== mode + 1 && v !== mode - 1),
        mode + 1,
        mode - 1
    ].filter(Boolean).sort(() => Math.random() - 0.5);
    
    questionBank.push({
        question: `Pour la liste L = {${modeList.sort((a, b) => a - b).join(', ')}}, quel est le mode (la valeur la plus fréquente) ?`,
        options: modeOptions.map(String),
        correctAnswer: modeOptions.indexOf(mode),
        explanation: `Le mode est la valeur qui apparaît le plus fréquemment dans la liste. \nEffectifs : ${Object.entries(frequencies).map(([val, freq]) => `\n- ${val} apparaît ${freq} fois`).join('')} \nDonc le mode est ${mode}.`
    });
    
    // 10. Question sur la fonction réciproque
    const recip_a = getRandomInt(1, 3);
    const recip_b = getRandomInt(1, 5);
    
    const recipOptions = [
        `\(f^{-1}(x) = \dfrac{x + ${recip_b}}{${recip_a}}\)`,
        `\(f^{-1}(x) = \dfrac{x - ${recip_b}}{${recip_a}}`,
        `\(f^{-1}(x) = ${recip_a}x-${recip_b}`,
        `\(f^{-1}(x) = \dfrac{x}{${recip_a}} - \dfrac{${recip_b}}{${recip_a}}`
    ];
    
    questionBank.push({
        question: `Si \(f(x) = ${recip_a}x + ${recip_b}\), quelle est l'expression de la fonction réciproque f⁻¹(x) ?`,
        options: recipOptions,
        correctAnswer: 1, // La deuxième option est correcte
        explanation: `Pour trouver la fonction réciproque : \n1. On écrit \(y = ${recip_a}x + ${recip_b}\) \n2. On isole \(x : x = \dfrac{y-${recip_b}}{${recip_a}}\) \n3. On remplace y par x : \(f^{-1}(x) = \dfrac{x - ${recip_b}}{${recip_a}}\)`
    });
    
    // Mélanger les questions
    return questionBank.sort(() => Math.random() - 0.5);
}

// Variables globales
let questions = [];
let currentQuestion = 0;
let userAnswers = [];

// Éléments DOM
const questionContainer = document.getElementById('question-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const questionNumber = document.getElementById('question-number');
const resultsContainer = document.getElementById('results-container');
const scoreDisplay = document.getElementById('score');
const detailedResults = document.getElementById('detailed-results');
const restartBtn = document.getElementById('restart-btn');

// Initialisation du quiz
function initQuiz() {
    // Générer des questions aléatoires
    questions = generateRandomQuestions();
    userAnswers = Array(questions.length).fill(null);
    
    // Afficher la première question
    showQuestion(currentQuestion);
    
    // Ajouter les écouteurs d'événements
    prevBtn.addEventListener('click', showPreviousQuestion);
    nextBtn.addEventListener('click', showNextQuestion);
    submitBtn.addEventListener('click', submitQuiz);
    restartBtn.addEventListener('click', restartQuiz);
}

// Afficher une question donnée
function showQuestion(index) {
    // Mettre à jour l'affichage du numéro de question
    questionNumber.textContent = `Question ${index + 1}/${questions.length}`;
    
    // Activer/désactiver les boutons de navigation
    prevBtn.disabled = (index === 0);
    nextBtn.disabled = (index === questions.length - 1);
    
    // Récupérer la question courante
    const question = questions[index];
    
    // Créer le HTML pour la question
    let questionHTML = `
        <div class="question">
            <h3>${index + 1}. ${question.question}</h3>
            <ul class="options">
    `;
    
    // Ajouter les options
    question.options.forEach((option, i) => {
        const isSelected = userAnswers[index] === i;
        questionHTML += `
            <li class="option ${isSelected ? 'selected' : ''}" data-index="${i}">
                <input type="radio" name="q${index}" id="q${index}o${i}" ${isSelected ? 'checked' : ''}>
                <label for="q${index}o${i}">${option}</label>
            </li>
        `;
    });
    
    questionHTML += `
            </ul>
        </div>
    `;
    
    // Insérer le HTML dans le conteneur
    questionContainer.innerHTML = questionHTML;
    
    // Ajouter les écouteurs d'événements pour les options
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.addEventListener('click', selectOption);
    });
}

// Sélectionner une option
function selectOption(e) {
    const selectedOption = e.currentTarget;
    const optionIndex = parseInt(selectedOption.dataset.index);
    
    // Mettre à jour la réponse de l'utilisateur
    userAnswers[currentQuestion] = optionIndex;
    
    // Mettre à jour l'affichage
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.classList.remove('selected');
    });
    selectedOption.classList.add('selected');
    
    // Cocher le bouton radio correspondant
    const radio = selectedOption.querySelector('input[type="radio"]');
    radio.checked = true;
}

// Afficher la question précédente
function showPreviousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion(currentQuestion);
    }
}

// Afficher la question suivante
function showNextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion(currentQuestion);
    }
}

// Soumettre le quiz
function submitQuiz() {
    // Vérifier si toutes les questions ont été répondues
    const unansweredQuestions = userAnswers.map((answer, index) => 
        answer === null ? index + 1 : null
    ).filter(q => q !== null);
    
    if (unansweredQuestions.length > 0) {
        const confirmation = confirm(`Vous n'avez pas répondu aux questions: ${unansweredQuestions.join(', ')}. Voulez-vous quand même soumettre vos réponses ?`);
        if (!confirmation) {
            return;
        }
    }
    
    // Calculer le score
    let score = 0;
    userAnswers.forEach((answer, index) => {
        if (answer === questions[index].correctAnswer) {
            score++;
        }
    });
    
    // Afficher le score
    scoreDisplay.textContent = score;
    
    // Générer les résultats détaillés
    let detailedResultsHTML = '';
    questions.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === question.correctAnswer;
        
        detailedResultsHTML += `
            <div class="detailed-result ${isCorrect ? 'correct' : 'incorrect'}">
                <h4>Question ${index + 1}: ${isCorrect ? '✓' : '✗'}</h4>
                <p>${question.question}</p>
                <p>Votre réponse: ${userAnswer !== null ? question.options[userAnswer] : 'Aucune réponse'}</p>
                <p>Réponse correcte: ${question.options[question.correctAnswer]}</p>
                <div class="answer-explanation">
                    <p><strong>Explication:</strong> ${question.explanation}</p>
                </div>
            </div>
        `;
    });
    
    detailedResults.innerHTML = detailedResultsHTML;
    
    // Masquer le quiz et afficher les résultats
    document.getElementById('quiz-container').classList.add('hidden');
    resultsContainer.classList.remove('hidden');
}

// Redémarrer le quiz
function restartQuiz() {
    // Réinitialiser les variables et générer de nouvelles questions
    questions = generateRandomQuestions();
    currentQuestion = 0;
    userAnswers = Array(questions.length).fill(null);
    
    // Masquer les résultats et afficher le quiz
    resultsContainer.classList.add('hidden');
    document.getElementById('quiz-container').classList.remove('hidden');
    
    // Afficher la première question
    showQuestion(currentQuestion);
}

// Démarrer le quiz
document.addEventListener('DOMContentLoaded', initQuiz);