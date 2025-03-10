document.getElementById('quizForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Réponses correctes
    const answers = {
        q1: '13',  // f(5) = 2*5 + 3 = 13
        q2: '4',   // Médiane de la série triée (18 valeurs) = moyenne des 9e et 10e termes = (4 + 4)/2 = 4
        q3: '5'    // sin(30°) = opposé/hypoténuse => opposé = 10 * 1/2 = 5
    };

    let score = 0;
    const total = 3;

    // Vérification des réponses
    const q1 = document.querySelector('input[name="q1"]:checked');
    const q2 = document.querySelector('input[name="q2"]:checked');
    const q3 = document.querySelector('input[name="q3"]:checked');

    if (q1 && q1.value === answers.q1) score++;
    if (q2 && q2.value === answers.q2) score++;
    if (q3 && q3.value === answers.q3) score++;

    // Affichage du score
    const resultDiv = document.getElementById('result');
    resultDiv.classList.remove('hidden');
    resultDiv.innerHTML = `Votre score : ${score}/${total}`;

    // Affichage des corrections
    const correctionsDiv = document.getElementById('corrections');
    correctionsDiv.classList.remove('hidden');
    correctionsDiv.innerHTML = `
        <h3>Corrections :</h3>
        <p>1. f(5) = 2×5 + 3 = 13 (Réponse correcte : 13)</p>
        <p>2. Série triée : {1,2,2,3,3,3,3,3,4,4,4,5,5,7,7,7,7,9}, médiane = (4+4)/2 = 4 (Réponse correcte : 4)</p>
        <p>3. sin(30°) = opposé/10, opposé = 10×0.5 = 5 (Réponse correcte : 5)</p>
    `;
});