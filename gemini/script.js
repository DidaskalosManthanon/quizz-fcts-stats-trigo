document.getElementById('quiz-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const reponsesCorrectes = {
      q1: '11',
      q2: '4',
      q3: 'adjacent/hypotenuse'
    };
  
    let score = 0;
    let reponsesUtilisateur = {};
  
    document.querySelectorAll('input[type="radio"]:checked').forEach(input => {
      reponsesUtilisateur[input.name] = input.value;
    });
  
    for (let question in reponsesCorrectes) {
      if (reponsesUtilisateur[question] === reponsesCorrectes[question]) {
        score++;
      }
    }
  
    const resultatDiv = document.getElementById('resultat');
    resultatDiv.textContent = `Votre score est de ${score} sur 3.`;
    resultatDiv.classList.remove('hidden');
  });