
const goalItems = document.querySelectorAll('.goal-item');

goalItems.forEach((goalItem) => {
    goalItem.addEventListener('click', () => {

        const goalDetails = goalItem.querySelector('.goal-details');

        if (goalDetails.style.display === 'block') {
            goalDetails.style.display = 'none';
        } else {
            goalDetails.style.display = 'block';
        }
    });
});

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
showSection(currentSectionIndex);

const prevButton = document.querySelector('.prev-button');
prevButton.addEventListener('click', () => {
    showSection(currentSectionIndex - 1);
});

const nextButton = document.querySelector('.next-button');
nextButton.addEventListener('click', () => {
    showSection(currentSectionIndex + 1);
});
