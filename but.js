// JavaScript pour gérer les interactions avec les cadres
const goalItems = document.querySelectorAll('.goal-item');

goalItems.forEach((goalItem) => {
    goalItem.addEventListener('click', () => {
        // Lorsque l'utilisateur clique sur un cadre
        const goalDetails = goalItem.querySelector('.goal-details');

        // On bascule l'affichage des détails supplémentaires
        if (goalDetails.style.display === 'block') {
            goalDetails.style.display = 'none';
        } else {
            goalDetails.style.display = 'block';
        }
    });
});

// JavaScript pour gérer les interactions avec les sections vidéo
const videoSections = document.querySelectorAll('.video-section');
let currentSectionIndex = 0;

function showSection(index) {
    if (index >= 0 && index < videoSections.length) {
        videoSections.forEach((section, i) => {
            section.style.display = i === index ? 'block' : 'none';
        });
        currentSectionIndex = index;
    }
}

// Masquer toutes les sections sauf la première au départ
showSection(currentSectionIndex);

// Ajouter un gestionnaire d'événement de clic pour la flèche de gauche (précédent)
const prevButton = document.querySelector('.prev-button');
prevButton.addEventListener('click', () => {
    showSection(currentSectionIndex - 1);
});

// Ajouter un gestionnaire d'événement de clic pour la flèche de droite (suivant)
const nextButton = document.querySelector('.next-button');
nextButton.addEventListener('click', () => {
    showSection(currentSectionIndex + 1);
});
