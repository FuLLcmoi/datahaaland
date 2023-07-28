const API_KEY = "YOUR_API_KEY";

const request = new Request("https://api.sofascore.com/v1/live/players/555555", {
  method: "GET",
  headers: {
    "Authorization": `Bearer ${API_KEY}`,
  },
});

// Make the request.
fetch(request)
  .then(response => response.json())
  .then(data => {
    // Interpret the response.
    const goals = data.stats.goals;
    const assists = data.stats.assists;
    const shots = data.stats.shots;
    const tackles = data.stats.tackles;

    document.getElementById("haaland-stats").innerHTML = `
      <h1>Haaland stats</h1>
      <table>
        <thead>
          <tr>
            <th>Stat</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Goals</td>
            <td>${goals}</td>
          </tr>
          <tr>
            <td>Assists</td>
            <td>${assists}</td>
          </tr>
          <tr>
            <td>Shots</td>
            <td>${shots}</td>
          </tr>
          <tr>
            <td>Tackles</td>
            <td>${tackles}</td>
          </tr>
        </tbody>
      </table>
    `;
  });