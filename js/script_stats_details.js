// addDataToTable
const performanceData = {
  "2023-2024": [
    { competition: "Premier League", apps: 5, goals: 0, assists: 0, minutes: 360, rating: 6.4 },
    { competition: "Ligue des champions", apps: 3, goals: 2, assists: 1, minutes: 270, rating: 7.0 },
  ],
  "2022-2023": [
    { competition: "Premier League", apps: 35, goals: 36, assists: 8, minutes: 2779, rating: 7.36 },
    { competition: "Ligue des Champions", apps: 11, goals: 12, assists: 1, minutes: 848, rating: 7.41 },
    { competition: "FA Cup", apps: 4, goals: 3, assists: 0, minutes: 311, rating: 7.20 },
    { competition: "League Cup", apps: 2, goals: 1, assists: 0, minutes: 107, rating: 6.75 },
    { competition: "Community Shield", apps: 1, goals: 0, assists: 0, minutes: 90, rating: 6.20 },
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

    // Ajouter une courte pause avant d'ajouter la classe fade-in
    setTimeout(() => {
      const cellsToUpdate = performanceTable.querySelectorAll(".data-cell");
      cellsToUpdate.forEach((cell) => {
        cell.classList.add("fade-in");
      });
    }, 10);
  }

  generateCompetitionOptions(selectedSeason);
  
  if (selectedSeason === "2022-2023") {
    loadCompetitionData(selectedSeason, "Premier League");
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
    // Ajout de la classe pour déclencher l'effet de slide
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
