/* script.js */
function corrigerQCM() {
    let score = 0;
    let corrections = {
        q1: "7", // f(2) = 2*2 + 3 = 7
        q2: "4", // Médiane de la liste triée
        q3: "1"  // cos(0°) = 1
    };
    
    let reponsesUtilisateur = {
        q1: document.querySelector('input[name="q1"]:checked')?.value,
        q2: document.querySelector('input[name="q2"]:checked')?.value,
        q3: document.querySelector('input[name="q3"]:checked')?.value
    };
    
    for (let question in corrections) {
        if (reponsesUtilisateur[question] === corrections[question]) {
            score++;
        }
    }
    
    let resultatDiv = document.getElementById("resultat");
    resultatDiv.innerHTML = `Votre score : ${score}/3 <br> Corrections :<br>`;
    
    for (let question in corrections) {
        resultatDiv.innerHTML += `Question ${question.slice(1)} : Réponse correcte : ${corrections[question]} <br>`;
    }
}