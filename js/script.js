document.addEventListener("DOMContentLoaded", function () {
  // Créer une instance Swiper
  const swiper = new Swiper(".swiper-container", {
    slidesPerView: "auto", // Affiche le nombre d'images qui peut tenir dans la largeur du conteneur
    spaceBetween: 5, // Réduire l'espacement entre les diapositives (ajuster la valeur selon vos préférences)
    navigation: {
      // Personnaliser les sélecteurs CSS pour les boutons de navigation personnalisés
      nextEl: "#nextBtn",
      prevEl: "#prevBtn",
    },
  });
});

const performanceData = {
  "2023-2024": [
    { competition: "Premier League", Matchs: 0, goals: 0, assists: 0, minutes: 0, rating: 0 },
    { competition: "Ligue des Champions", Matchs: 0, goals: 0, assists: 0, minutes: 0, rating: 0 },
  ],
  "2022-2023": [
    { competition: "Premier League", Matchs: 35, goals: 36, assists: 8, minutes: 2779, rating: 7.36 },
    { competition: "Ligue des Champions", Matchs: 11, goals: 12, assists: 1, minutes: 848, rating: 7.41 },
    { competition: "FA Cup", Matchs: 4, goals: 3, assists: 0, minutes: 311, rating: 7.20 },
    { competition: "League Cup", Matchs: 2, goals: 1, assists: 0, minutes: 107, rating: 6.75 },
    { competition: "Community Shield", Matchs: 1, goals: 0, assists: 0, minutes: 90, rating: 6.20 },
  ],
};

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function getLatestSeason() {
  const seasons = Object.keys(performanceData);
  return seasons.reduce((latestSeason, currentSeason) => {
    return latestSeason > currentSeason ? latestSeason : currentSeason;
  });
}

function updateTableBySeason(selectedSeason) {
  const performanceTable = document.getElementById("performanceTable").querySelector("tbody");

  performanceTable.innerHTML = "";

  if (performanceData[selectedSeason]) {
    let totalMatchs = 0;
    let totalGoals = 0;
    let totalAssists = 0;
    let totalMinutes = 0;
    let totalRating = 0;

    performanceData[selectedSeason].forEach((data) => {
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td class="data-cell">${data.competition}</td>
        <td class="data-cell">${data.Matchs}</td>
        <td class="data-cell">${data.goals}</td>
        <td class="data-cell">${data.assists}</td>

      `;
      performanceTable.appendChild(newRow);

      totalMatchs += data.Matchs;
      totalGoals += data.goals;
      totalAssists += data.assists;
    });

    const totalRow = document.createElement("tr");
    totalRow.innerHTML = `
      <td class="data-cell">Total</td>
      <td class="data-cell">${totalMatchs}</td>
      <td class="data-cell">${totalGoals}</td>
      <td class="data-cell">${totalAssists}</td>
      `;
    performanceTable.appendChild(totalRow);


  }
}

const seasonSelect = document.getElementById("seasonSelect");

for (const season in performanceData) {
  const option = document.createElement("option");
  option.value = season;
  option.textContent = season;
  seasonSelect.appendChild(option);
}

document.getElementById("seasonSelect").addEventListener("change", function () {
  const selectedSeason = this.value;
  updateTableBySeason(selectedSeason);
});

document.addEventListener("DOMContentLoaded", function () {
  let selectedSeason = getParameterByName('season');
  if (!selectedSeason) {
    selectedSeason = getLatestSeason();
  }
  updateTableBySeason(selectedSeason);

  seasonSelect.value = selectedSeason;
});

function redirectToStatsDetails() {
  const selectedSeason = document.getElementById("seasonSelect").value;
  window.location.href = `stats_details.html?season=${selectedSeason}`;
}

document.getElementById("detailButton").addEventListener("click", redirectToStatsDetails);
