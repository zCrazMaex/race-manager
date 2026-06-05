// =====================
// JSON (oder extern geladen)
// =====================
const teamsData = {
  "Red Bull": [
    { name: "Fahrer A", stints: [1,2,3] },
    { name: "Fahrer B", stints: [1,2,3] }
  ],
  "Mercedes": [
    { name: "Fahrer A", stints: [1,2,3] },
    { name: "Fahrer B", stints: [1,2,3] }
  ],
  "Ferrari": [
    { name: "Fahrer A", stints: [1,2,3] },
    { name: "Fahrer B", stints: [1,2,3] }
  ],
  "McLarren": [
    { name: "Fahrer A", stints: [1,2,3] },
    { name: "Fahrer B", stints: [1,2,3] }
  ],
  "Haas": [
    { name: "Fahrer A", stints: [1,2,3] },
    { name: "Fahrer B", stints: [1,2,3] }
  ],
  "Alpine": [
    { name: "Fahrer A", stints: [1,2,3] },
    { name: "Fahrer B", stints: [1,2,3] }
  ],
  "Williams": [
    { name: "Fahrer A", stints: [1,2,3] },
    { name: "Fahrer B", stints: [1,2,3] }
  ],
  "Audi": [
    { name: "Fahrer A", stints: [1,2,3] },
    { name: "Fahrer B", stints: [1,2,3] }
  ],
  "Cadillac": [
    { name: "Fahrer A", stints: [1,2,3] },
    { name: "Fahrer B", stints: [1,2,3] }
  ],
  "VCARB": [
    { name: "Fahrer A", stints: [1,2,3] },
    { name: "Fahrer B", stints: [1,2,3] }
  ],
  "Aston Martin": [
    { name: "Fahrer A", stints: [1,2,3] },
    { name: "Fahrer B", stints: [1,2,3] }
  ]
};

// =====================
// State
// =====================
const driverState = structuredClone(teamsData);
let results = [];

// =====================
// INIT
// =====================
document.addEventListener("DOMContentLoaded", () => {
  initTeamDropdown();
  renderDriverOverview();

  document
    .getElementById("addDriverBtn")
    .addEventListener("click", addDriver);

  document
    .getElementById("calculateBtn")
    .addEventListener("click", calculateReverseGrid);

  buildResultsTable();
});

// =====================
// TEAM DROPDOWN
// =====================
function initTeamDropdown() {
  const select = document.getElementById("teamSelect");

  select.innerHTML =
    `<option value="">-- Team wählen --</option>` +
    Object.keys(driverState)
      .map(t => `<option value="${t}">${t}</option>`)
      .join("");
}

// =====================
// DRIVER ADD
// =====================
function addDriver() {
  const team = document.getElementById("teamSelect").value;
  const name = document.getElementById("driverName").value.trim();
  const stintsRaw = document.getElementById("stintsInput").value;

  if (!team || !name) return;

  const stints = stintsRaw
    .split(",")
    .map(s => Number(s.trim()))
    .filter(n => !isNaN(n));

  driverState[team].push({ name, stints });

  document.getElementById("driverName").value = "";
  document.getElementById("stintsInput").value = "";

  renderDriverOverview();
}

// =====================
// DRIVER OVERVIEW
// =====================
function renderDriverOverview() {
  const container = document.getElementById("driverOverview");

  container.innerHTML = "";

  Object.entries(driverState).forEach(([team, drivers]) => {
    const div = document.createElement("div");

    div.innerHTML = `
      <h3>${team}</h3>
      <ul>
        ${drivers.map(d => `<li>${d.name} (Stints: ${d.stints.join(",")})</li>`).join("")}
      </ul>
    `;

    container.appendChild(div);
  });
}

// =====================
// RESULTS TABLE
// =====================
function buildResultsTable() {
  const tbody = document.querySelector("#resultsTable tbody");

  tbody.innerHTML = "";

  for (let i = 1; i <= 22; i++) {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${i}</td>
      <td>
        <select class="team"></select>
      </td>
      <td>
        <input class="driver" placeholder="Fahrer">
      </td>
      <td>
        <input class="place" type="number" min="1" max="22">
      </td>
    `;

    const teamSelect = tr.querySelector(".team");

    teamSelect.innerHTML =
      `<option value="">-- Team --</option>` +
      Object.keys(driverState)
        .map(t => `<option value="${t}">${t}</option>`)
        .join("");

    tbody.appendChild(tr);
  }
}

// =====================
// REVERSE GRID
// =====================
function calculateReverseGrid() {
  const stint = document.getElementById("stintInput").value;

  const rows = document.querySelectorAll("#resultsTable tbody tr");

  results = [];

  rows.forEach((row, index) => {
    const team = row.querySelector(".team").value;
    const driver = row.querySelector(".driver").value;
    const place = Number(row.querySelector(".place").value);

    if (!team || !driver || !place) return;

    results.push({
      stint: stint,   // 👈 jetzt global
      start: index + 1,
      team,
      driver,
      place
    });
  });

  // sort by finishing position (best first)
  const sorted = [...results].sort((a, b) => a.place - b.place);

  renderNextGrid(sorted);
}

// =====================
// NEXT GRID
// =====================
function renderNextGrid(sortedResults) {
  const tbody = document.querySelector("#nextGridTable tbody");

  tbody.innerHTML = "";

  const reversed = sortedResults.reverse();

  reversed.forEach((r, i) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${i + 1}</td>
      <td>${r.team}</td>
      <td>${r.driver}</td>
    `;

    tbody.appendChild(tr);
  });
}
