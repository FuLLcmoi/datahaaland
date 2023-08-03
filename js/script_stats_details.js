// addDataToTable
const performanceData = {
  "2023-2024": [
    { competition: "Premier League", apps: 0, goals: 0, assists: 0, minutes: 0, rating: 0 },
    { competition: "Ligue des champions", apps: 0, goals: 0, assists: 0, minutes: 0, rating: 0 },
  ],
  "2022-2023": [
    { competition: "Premier League", apps: 35, goals: 36, assists: 8, minutes: 2779, rating: 7.36 },
    { competition: "Ligue des Champions", apps: 11, goals: 12, assists: 1, minutes: 848, rating: 7.41 },
    { competition: "FA Cup", apps: 4, goals: 3, assists: 0, minutes: 311, rating: 7.20 },
    { competition: "League Cup", apps: 2, goals: 1, assists: 0, minutes: 107, rating: 6.75 },
    { competition: "Community Shield", apps: 1, goals: 0, assists: 0, minutes: 90, rating: 6.20 },
  ],
  "2021-2022": [
    { competition: "Bundesliga", apps: 24, goals: 22, assists: 7, minutes: 1915, rating: 7.77 },
    { competition: "Ligue des Champions", apps: 3, goals: 3, assists: 0, minutes: 203, rating: 7.00 },
    { competition: "WC Qualification Europe", apps: 6, goals: 5, assists: 0, minutes: 493, rating: 7.46 },
    { competition: "DFB Pokal", apps: 2, goals: 4, assists: 0, minutes: 180, rating: 8.56 },
    { competition: "DFL Super Cup", apps: 1, goals: 0, assists: 0, minutes: 90, rating: 5.90 },
  ],
  "2020-2021": [
    { competition: "Bundesliga", apps: 28, goals: 27, assists: 6, minutes: 2410, rating: 7.87 },
    { competition: "Ligue des Champions", apps: 8, goals: 10, assists: 2, minutes: 705, rating: 7.96 },
    { competition: "DFB Pokal", apps: 4, goals: 3, assists: 1, minutes: 327, rating: 7.35 },
    { competition: "DFL Super Cup", apps: 1, goals: 1, assists: 1, minutes: 68, rating: 6.20 },
    { competition: "UEFA Nations League", apps: 4, goals: 6, assists: 1, minutes: 346, rating: 7.83 },
  ],
  "2019-2020": [
    { competition: "Bundesliga", apps: 14, goals: 16, assists: 4, minutes: 983, rating: 7.44 },
    { competition: "Ligue des Champions", apps: 8, goals: 10, assists: 2, minutes: 554, rating: 7.47 },
    { competition: "DFB Pokal", apps: 4, goals: 3, assists: 1, minutes: 44, rating: 6.90 },
    { competition: "Autriche Cup", apps: 1, goals: 4, assists: 0, minutes: 90, rating:  8.49},
    { competition: "Éliminatoires Euro", apps: 3, goals: 0, assists: 0, minutes: 170, rating: 6.16 },
  ],
  "2018-2019": [
    { competition: "Bundesliga", apps: 2, goals: 1, assists: 0, minutes: 83, rating: 7.10 },
    { competition: "Europa Ligue", apps: 5, goals: 4, assists: 1, minutes: 411, rating: 7.98 },
    { competition: "OFB Cup", apps: 2, goals: 0, assists: 0, minutes: 82, rating: 0 },
    { competition: "World Cup U20", apps: 3, goals: 9, assists: 0, minutes: 270, rating: 0 },
    { competition: "Euro U21", apps: 3, goals: 0, assists: 1, minutes: 215, rating: 0 },
  ],
  "2017-2018": [
    { competition: "Eliteserien", apps: 25, goals: 12, assists: 4, minutes: 1596, rating: 6.86 },
    { competition: "Youth League", apps: 1, goals: 0, assists: 0, minutes: 30, rating: 0 },
    { competition: "Euro U19", apps: 9, goals: 10, assists: 2, minutes: 0, rating: 0 },
  ],
  "2016-2017": [
    { competition: "Eliteserien", apps: 14, goals: 2, assists: 1, minutes: 383, rating: 6.22 },
    { competition: "Norvège Cup", apps: 6, goals: 2, assists: 0, minutes: 258, rating: 7.74 },
  ],
  "2015-2016": [
    { competition: "D1 Norvègienne", apps: 16, goals: 0, assists: 0, minutes: 422, rating: 0 },
  ],
};

function generateSeasonOptions() {
  const seasonSelect = document.getElementById("seasonSelect");
  seasonSelect.innerHTML = "";

  const addedSeasons = new Set();

  for (const season in performanceData) {
    if (!addedSeasons.has(season)) {
      const option = document.createElement("option");
      option.value = season;
      option.textContent = season;
      seasonSelect.appendChild(option);

      addedSeasons.add(season);
    }
  }

  seasonSelect.addEventListener("change", (event) => {
    const selectedSeason = event.target.value;
    updateTableBySeason(selectedSeason);
  });
}

function updateTableBySeason(selectedSeason) {
  const performanceTable = document.getElementById("performanceTable").querySelector("tbody");
  performanceTable.innerHTML = "";

  if (performanceData[selectedSeason]) {
    let totalApps = 0;
    let totalGoals = 0;
    let totalAssists = 0;
    let totalMinutes = 0;
    let totalRating = 0;

    performanceData[selectedSeason].forEach((data) => {
      totalApps += data.apps;
      totalGoals += data.goals;
      totalAssists += data.assists;
      totalMinutes += data.minutes;
      totalRating += data.rating;

      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td class="data-cell">${data.competition}</td>
        <td class="data-cell">${data.apps}</td>
        <td class="data-cell">${data.goals}</td>
        <td class="data-cell">${data.assists}</td>
        <td class="data-cell">${data.minutes}</td>
        <td class="data-cell">${data.rating.toFixed(2)}</td>
      `;
      performanceTable.appendChild(newRow);
    });

    const totalRow = document.createElement("tr");
    totalRow.innerHTML = `
      <td class="data-cell">Total</td>
      <td class="data-cell">${totalApps}</td>
      <td class="data-cell">${totalGoals}</td>
      <td class="data-cell">${totalAssists}</td>
      <td class="data-cell">${totalMinutes}</td>
      <td class="data-cell">${(totalRating / performanceData[selectedSeason].length).toFixed(2)}</td>
    `;

    performanceTable.appendChild(totalRow);

    setTimeout(() => {
      const cellsToUpdate = performanceTable.querySelectorAll(".data-cell");
      cellsToUpdate.forEach((cell) => {
        cell.classList.add("fade-in");
      });
    }, 10);
  }

  generateCompetitionOptions(selectedSeason);

  if (selectedSeason === "2023-2024") {
    loadCompetitionData(selectedSeason, "Premier League");
  }

  if (selectedSeason === "2022-2023") {
    loadCompetitionData(selectedSeason, "Premier League");
  }

  if (selectedSeason === "2021-2022") {
    loadCompetitionData(selectedSeason, "Bundesliga");
  }

  if (selectedSeason === "2020-2021") {
    loadCompetitionData(selectedSeason, "Bundesliga");
  }

  if (selectedSeason === "2019-2020") {
    loadCompetitionData(selectedSeason, "Bundesliga");
  }

  if (selectedSeason === "2018-2019") {
    loadCompetitionData(selectedSeason, "Bundesliga");
  }

  if (selectedSeason === "2017-2018") {
    loadCompetitionData(selectedSeason, "Eliteserien");
  }

  if (selectedSeason === "2016-2017") {
    loadCompetitionData(selectedSeason, "Eliteserien");
  }

  if (selectedSeason === "2015-2016") {
    loadCompetitionData(selectedSeason, "D1 Norvègienne");
  }
}


generateSeasonOptions();

function generateCompetitionOptions(selectedSeason) {
  const competitionSelect = document.getElementById("competitionSelect");
  competitionSelect.innerHTML = "";

  if (performanceData[selectedSeason]) {
    const competitions = performanceData[selectedSeason].map((data) => data.competition);
    const uniqueCompetitions = [...new Set(competitions)];

    uniqueCompetitions.forEach((competition) => {
      const option = document.createElement("option");
      option.value = competition;
      option.textContent = competition;
      competitionSelect.appendChild(option);
    });
  }

  competitionSelect.addEventListener("change", (event) => {
    const selectedCompetition = event.target.value;
    loadCompetitionData(selectedSeason, selectedCompetition);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  let selectedSeason = getParameterByName("season");
  if (!selectedSeason) {
    selectedSeason = getLatestSeason();
  }

  updateTableBySeason(selectedSeason);
  generateSeasonOptions();
  generateCompetitionOptions(selectedSeason);

  const seasonSelect = document.getElementById("seasonSelect");
  seasonSelect.value = selectedSeason;
  autoSelectCompetition(selectedSeason);
});

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function autoSelectCompetition(selectedSeason) {
  const competitionSelect = document.getElementById("competitionSelect");
  if (competitionSelect.options.length > 0) {
    const defaultCompetition = competitionSelect.options[0].value;
    loadCompetitionData(selectedSeason, defaultCompetition);
  }
}

async function loadCompetitionData(selectedSeason, selectedCompetition) {
  try {
    const data = await import(`../Data/${selectedSeason}/${selectedCompetition.split(" ").join("_")}.js`);
    updateTableByCompetition(data.default.data);
    setTimeout(() => {
      const cellsWithValue = document.querySelectorAll(".data-cell-value");
      cellsWithValue.forEach((cell) => {
        cell.classList.add("slide-in");
      });
    }, 100);
  } catch (error) {
    console.error(error);
  }
}

function updateTableByCompetition(competitionData) {
  const attackTable = document.getElementById("attackTable").querySelector("tbody");
  const passesTable = document.getElementById("passesTable").querySelector("tbody");
  const otherTable = document.getElementById("otherTable").querySelector("tbody");

  attackTable.innerHTML = "";
  passesTable.innerHTML = "";
  otherTable.innerHTML = "";

  const attackData = [];
  const passesData = [];
  const otherData = [];

  competitionData.forEach((data) => {
    if (data.detail === "Buts" || data.detail === "Buts attendus (xG)" || data.detail === "Buts dans la surface" || data.detail === "Buts hors de la surface" || data.detail === "Buts de la tete" || data.detail === "Buts du pied gauche" || data.detail === "Buts du pied droit" || data.detail === "Buts sur pénalty" || data.detail === "Tirs cadrés" || data.detail === "Occasions créées" || data.detail === "Grosse occasions manquée") {
      attackData.push(data);
    } else if (data.detail === "Passes décisives" || data.detail === "Passes déc. attendues (xA)" || data.detail === "Passes réussies" || data.detail === "Précision des passes") {
      passesData.push(data);
    } else if (data.detail === "Dribbles réussis" || data.detail === "Touche par match" || data.detail === "Duels remportés" || data.detail === "Perte de balle" || data.detail === "Fautes" || data.detail === "Tacles recus") {
      otherData.push(data);
    }
  });

  addDataToTable(attackData, attackTable);
  addDataToTable(passesData, passesTable);
  addDataToTable(otherData, otherTable);
}


function addDataToTable(data, table) {
  data.forEach((item) => {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td class="data-cell">${item.detail}</td>
      <td class="data-cell-value"><span>${item.total}</span></td>
    `;
    table.appendChild(newRow);
  });
}
