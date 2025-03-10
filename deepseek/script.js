function checkAnswers() {
    const answers = {
        q1: "b", // f(2) = 2*2 + 3 = 7
        q2: "a", // La médiane de L est 4
        q3: "a"  // cos(60°) = 0.5
    };

    let score = 0;
    let userAnswers = {
        q1: document.querySelector('input[name="q1"]:checked')?.value,
        q2: document.querySelector('input[name="q2"]:checked')?.value,
        q3: document.querySelector('input[name="q3"]:checked')?.value
    };

    // Calcul du score
    for (let key in answers) {
        if (userAnswers[key] === answers[key]) {
            score++;
        }
    }

    // Affichage des résultats
    document.getElementById('score').textContent = `Votre score est : ${score} / 3`;
    document.getElementById('correctAnswers').textContent = `Réponses correctes : 
        1. ${answers.q1}, 
        2. ${answers.q2}, 
        3. ${answers.q3}`;
    document.getElementById('results').style.display = 'block';
}