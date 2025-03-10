
document.addEventListener('DOMContentLoaded', () => {
    const correctAnswers = {
        q1: 'b',
        q2: 'c',
        q3: 'b',
        q4: 'a'
    };

    const resultsDiv = document.getElementById('results');

    window.checkAnswers = function () {
        let score = 0;
        const form = document.getElementById('quiz-form');
        const userAnswers = {
            q1: form.q1.value,
            q2: form.q2.value,
            q3: form.q3.value,
            q4: form.q4.value
        };

        for (const question in correctAnswers) {
            if (userAnswers[question] === correctAnswers[question]) {
                score++;
            }
        }

        let resultText = `<p>Votre score : ${score}/4</p>`;
        resultText += '<p>Réponses correctes :</p><ul>';

        for (const question in correctAnswers) {
            resultText += `<li>Question ${question.slice(1)}: ${correctAnswers[question]}</li>`;
        }

        resultText += '</ul>';
        resultsDiv.innerHTML = resultText;
    };
});
