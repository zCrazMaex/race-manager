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

  document.getElementById("addDriverBtn")
    .addEventListener("click", addDriver);

  document.getElementById("calculateBtn")
    .addEventListener("click", calculateReverseGrid);

  buildResultsTable();

  createSwapButtons(); // 👈 NEU
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
    const teamBlock = document.createElement("div");

    teamBlock.innerHTML = `<h3>${team}</h3>`;

    drivers.forEach((driver, driverIndex) => {
      const driverBox = document.createElement("div");
      driverBox.style.marginBottom = "12px";

      const inputs = [];

      for (let i = 0; i < 10; i++) {
        const input = document.createElement("input");
        input.type = "number";
        input.min = 1;
        input.max = 22;
        input.style.width = "60px";
        input.style.marginRight = "5px";

        // vorhandene Werte einsetzen oder leer lassen
        input.value = driver.stints[i] ?? "";

        input.addEventListener("input", () => {
          const parentStints = [];

          driverBox.querySelectorAll("input").forEach(inp => {
            const val = Number(inp.value);
            if (!isNaN(val) && inp.value !== "") {
              parentStints.push(val);
            }
          });

          driverState[team][driverIndex].stints = parentStints;
        });

        inputs.push(input);
        driverBox.appendChild(input);
      }

      const label = document.createElement("div");
      label.textContent = driver.name;
      label.style.fontWeight = "bold";

      driverBox.prepend(label);
      teamBlock.appendChild(driverBox);
    });

    container.appendChild(teamBlock);
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

    const teamSelect = document.createElement("select");
    const driverSelect = document.createElement("select");
    const placeInput = document.createElement("input");

    teamSelect.classList.add("team");
    driverSelect.classList.add("driver");
    placeInput.classList.add("place");

    placeInput.type = "number";
    placeInput.min = 1;
    placeInput.max = 22;

    // --- Team ---
    teamSelect.innerHTML =
      `<option value="">Team</option>` +
      Object.keys(driverState)
        .map(t => `<option value="${t}">${t}</option>`)
        .join("");

    // --- Fahrer ---
    driverSelect.innerHTML = `<option value="">Fahrer</option>`;

    // =====================
    // FILTER (Team + GLOBAL STINT)
    // =====================
    function updateDrivers() {
      const team = teamSelect.value;
      const stint = Number(document.getElementById("stintInput").value);

      driverSelect.innerHTML = `<option value="">Fahrer</option>`;

      if (!team || !stint) return;

      const drivers = driverState[team] || [];

      const validDrivers = drivers.filter(d =>
        (d.stints || []).includes(stint)
      );

      driverSelect.innerHTML += validDrivers
        .map(d => `<option value="${d.name}">${d.name}</option>`)
        .join("");
    }

    teamSelect.addEventListener("change", updateDrivers);
    document
      .getElementById("stintInput")
      .addEventListener("input", updateDrivers);

    // --- TDs ---
    const startTd = document.createElement("td");
    startTd.textContent = i;

    const teamTd = document.createElement("td");
    const driverTd = document.createElement("td");
    const placeTd = document.createElement("td");

    teamTd.appendChild(teamSelect);
    driverTd.appendChild(driverSelect);
    placeTd.appendChild(placeInput);

    tr.appendChild(startTd);
    tr.appendChild(teamTd);
    tr.appendChild(driverTd);
    tr.appendChild(placeTd);

    tbody.appendChild(tr);
  }
}

// =====================
// REVERSE GRID
// =====================
function calculateReverseGrid() {
  const stint = Number(document.getElementById("stintInput").value);
  const rows = document.querySelectorAll("#resultsTable tbody tr");

  results = [];

  rows.forEach(row => {
    const team = row.querySelector(".team")?.value;
    const driver = row.querySelector(".driver")?.value;
    const place = Number(row.querySelector(".place")?.value);

    if (!team || !driver || !place) return;

    results.push({ stint, team, driver, place });
  });

  // 🟢 richtig sortieren
  const sorted = results.sort((a, b) => a.place - b.place);

  renderNextGrid(sorted);
}

// =====================
// NEXT GRID
// =====================
function renderNextGrid(sortedResults) {
  const tbody = document.querySelector("#nextGridTable tbody");
  tbody.innerHTML = "";

  const currentStint = Number(document.getElementById("stintInput").value);
  const nextStint = currentStint + 1;

  let startPos = 1;

  sortedResults.forEach(r => {
    const drivers = driverState[r.team] || [];

    // alle Fahrer, die für nextStint gültig sind
    const validDrivers = drivers.filter(d =>
      (d.stints || []).includes(nextStint)
    );

    if (validDrivers.length === 0) {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${startPos++}</td>
        <td>${r.team}</td>
        <td>❌ kein Fahrer</td>
      `;
      tbody.appendChild(tr);
      return;
    }

    // 👉 ALLE Fahrer anzeigen (nicht nur einen!)
    validDrivers.forEach(driver => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${startPos++}</td>
        <td>${r.team}</td>
        <td>${driver.name}</td>
      `;

      tbody.appendChild(tr);
    });
  });
}


// =====================
// SWAP DRIVERS
// =====================
function createSwapButtons() {
  const container = document.getElementById("nextGridTable");

  // falls schon Buttons existieren entfernen
  document.querySelectorAll(".swap-btn").forEach(b => b.remove());

  Object.keys(driverState).forEach(team => {
    const btn = document.createElement("button");
    btn.textContent = `${team}: Fahrer tauschen`;
    btn.classList.add("swap-btn");

    btn.style.margin = "5px";

    btn.addEventListener("click", () => swapTeamDrivers(team));

    container.parentNode.insertBefore(btn, container);
  });
}


function swapTeamDrivers(team) {
  const rows = document.querySelectorAll("#nextGridTable tbody tr");

  const teamRows = [...rows].filter(r =>
    r.children[1].textContent === team
  );

  if (teamRows.length < 2) return;

  const driver1 = teamRows[0].children[2].textContent;
  const driver2 = teamRows[1].children[2].textContent;

  teamRows[0].children[2].textContent = driver2;
  teamRows[1].children[2].textContent = driver1;
}
