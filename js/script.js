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
    { competition: "Premier League", Matchs: 35, goals: 36, assists: 8,},
    { competition: "Ligue des Champions", Matchs: 11, goals: 12, assists: 1, },
    { competition: "FA Cup", Matchs: 4, goals: 3, assists: 0,},
    { competition: "League Cup", Matchs: 2, goals: 1, assists: 0,},
    { competition: "Community Shield", Matchs: 1, goals: 0, assists: 0,},
  ],
  "2021-2022": [
    { competition: "Bundesliga", Matchs: 24, goals: 22, assists: 7, },
    { competition: "Ligue des Champions", Matchs: 3, goals: 3, assists: 0, },
    { competition: "WC Qualification Europe", Matchs: 6, goals: 5, assists: 0,},
    { competition: "DFB Pokal", Matchs: 2, goals: 4, assists: 0, },
    { competition: "DFL Super Cup", Matchs: 1, goals: 0, assists: 0,},
  ],
  "2020-2021": [
    { competition: "Bundesliga", Matchs: 28, goals: 27, assists: 6,},
    { competition: "Ligue des Champions", Matchs: 8, goals: 10, assists: 2, },
    { competition: "DFB Pokal", Matchs: 4, goals: 3, assists: 1, },
    { competition: "DFL Super Cup", Matchs: 1, goals: 1, assists: 1, },
    { competition: "UEFA Nations League", Matchs: 4, goals: 6, assists: 1, },
  ],
  "2019-2020": [
    { competition: "Bundesliga", Matchs: 14, goals: 16, assists: 4,},
    { competition: "Ligue des Champions", Matchs: 8, goals: 10, assists: 2, },
    { competition: "DFB Pokal", Matchs: 4, goals: 3, assists: 1, },
    { competition: "Austrian Cup", Matchs: 1, goals: 4, assists: 0,},
    { competition: "Éliminatoires Euro", Matchs: 3, goals: 0, assists: 0, },
  ],
  "2018-2019": [
    { competition: "Bundesliga", Matchs: 2, goals: 1, assists: 0, },
    { competition: "Europa Ligue", Matchs: 6, goals: 4, assists: 0, },
    { competition: "OFB Cup", Matchs: 2, goals: 0, assists: 0, },
    { competition: "World Cup U20", Matchs: 3, goals: 9, assists: 0, },
    { competition: "Euro U21", Matchs: 3, goals: 0, assists: 1, },
  ],
  "2017-2018": [
    { competition: "Eliteserien", Matchs: 25, goals: 12, assists: 4,},
    { competition: "Youth League", Matchs: 1, goals: 0, assists: 0,},
    { competition: "Euro U19", Matchs: 9, goals: 10, assists: 2, },
  ],
  "2016-2017": [
    { competition: "Eliteserien", Matchs: 14, goals: 2, assists: 1, },
    { competition: "Norvège Cup", Matchs: 6, goals: 2, assists: 0,},
  ],
  "2015-2016": [
    { competition: "D1 Norvègienne", Matchs: 16, goals: 0, assists: 0,},
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
