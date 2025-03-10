document.getElementById('submit').addEventListener('click', function() {
    const answers = {
        q1: '11',
        q2: '4',
        q3: '√3/2'
    };

    let score = 0;
    let resultHtml = '<h3>Résultats :</h3>';

    // Vérification des réponses
    for (const question in answers) {
        const selectedOption = document.querySelector(`input[name="${question}"]:checked`);
        const correctAnswer = answers[question];
        const questionNumber = question.replace('q', '');

        if (selectedOption) {
            if (selectedOption.value === correctAnswer) {
                score++;
                resultHtml += `<p>Question ${questionNumber} : Correct !</p>`;
            } else {
                resultHtml += `<p>Question ${questionNumber} : Incorrect. La réponse était ${correctAnswer}.</p>`;
            }
        } else {
            resultHtml += `<p>Question ${questionNumber} : Non répondue.</p>`;
        }
    }

    // Affichage du score
    resultHtml += `<p class="score">Score final : ${score}/3</p>`;
    document.getElementById('result').innerHTML = resultHtml;

    // Désactiver le bouton après soumission
    this.disabled = true;
});