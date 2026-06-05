// =====================
// JSON (oder extern geladen)
// =====================
const teamsData = {
  "Red Bull": [
        { "name": "Ben", "stints": [1,2,3] },
        { "name": "Diminik", "stints": [1,2,3] },
        { "name": "DStream", "stints": [1,2,3] },
        { "name": "Enrico", "stints": [1,2,3] },
        { "name": "Flo", "stints": [1,2,3] },
        { "name": "Kevin", "stints": [1,2,3] },
        { "name": "Levi", "stints": [1,2,3] },
        { "name": "Luca", "stints": [1,2,3] },
        { "name": "Niklas", "stints": [1,2,3] },
        { "name": "Robin", "stints": [1,2,3] },
        { "name": "Maex", "stints": [1,2,3] }
    ],
    "Mercedes": [
        { "name": "Basti", "stints": [3,5,6,9,19,22,24,27] },
        { "name": "Eddi", "stints": [1,3,10,18,19,22,24,25] },
        { "name": "Finjes", "stints": [4,12,13,14,20] },
        { "name": "Itzzwertz", "stints": [1,2,8,9,10,11,16,17] },
        { "name": "Lachs Rosa", "stints": [5,6,7,8,13,14,15,16,23,26,27,28] },
        { "name": "Nivas", "stints": [4,5,6,7,21,25] },
        { "name": "Reggae", "stints": [] },
        { "name": "Seisi", "stints": [18,20,21,23,26] },
        { "name": "Soulix", "stints": [2,11,12,15,17,28] }
    ],
    "Ferrari": [
        { "name": "Dave", "stints": [1,2,3] },
        { "name": "Jannik", "stints": [1,2,3] },
        { "name": "Jonas", "stints": [1,2,3] },
        { "name": "Juli", "stints": [1,2,3] },
        { "name": "NickiBoy", "stints": [1,2,3] },
        { "name": "Niclas", "stints": [1,2,3] },
        { "name": "Phillip", "stints": [1,2,3] },
        { "name": "Rene", "stints": [1,2,3] }
    ],
    "McLarren": [
        { "name": "Dori", "stints": [1,2,3] },
        { "name": "Flur-Lustiger", "stints": [1,2,3] },
        { "name": "Lebjoern", "stints": [1,2,3] },
        { "name": "Lewa", "stints": [1,2,3] },
        { "name": "Matchball", "stints": [1,2,3] },
        { "name": "Mirco", "stints": [1,2,3] },
        { "name": "Rossi", "stints": [1,2,3] },
        { "name": "Skyline", "stints": [1,2,3] },
        { "name": "Toasty", "stints": [1,2,3] },
        { "name": "Tom", "stints": [1,2,3] },
        { "name": "Tompryce", "stints": [1,2,3] },
        { "name": "Tyga", "stints": [1,2,3] },
        { "name": "xiMK6x", "stints": [1,2,3] }
    ],
    "Haas": [
        { "name": "Barut", "stints": [1,2,3] },
        { "name": "Blacksky", "stints": [1,2,3] },
        { "name": "Coren", "stints": [1,2,3] },
        { "name": "AFRL_Felix", "stints": [1,2,3] },
        { "name": "z_Felix", "stints": [1,2,3] },
        { "name": "Fynn", "stints": [1,2,3] },
        { "name": "Heinzi", "stints": [1,2,3] },
        { "name": "Jonas", "stints": [1,2,3] },
        { "name": "Till", "stints": [1,2,3] },
        { "name": "Valen", "stints": [1,2,3] }
    ],
    "Alpine": [
        { "name": "777", "stints": [1,2,3] },
        { "name": "Cole", "stints": [1,2,3] },
        { "name": "Dylan", "stints": [1,2,3] },
        { "name": "Felixione", "stints": [1,2,3] },
        { "name": "Jeremy", "stints": [1,2,3] },
        { "name": "Jill", "stints": [1,2,3] },
        { "name": "Kartrcer", "stints": [1,2,3] },
        { "name": "Max", "stints": [1,2,3] },
        { "name": "Mihai", "stints": [1,2,3] },
        { "name": "Miles", "stints": [1,2,3] },
        { "name": "Morbat", "stints": [1,2,3] },
        { "name": "Nael Guiot", "stints": [1,2,3] },
        { "name": "Noomycorn", "stints": [1,2,3] },
        { "name": "Ossidrei", "stints": [1,2,3] },
        { "name": "PhantomFox", "stints": [1,2,3] },
        { "name": "Pub_Dogg", "stints": [1,2,3] },
        { "name": "ScoobyDoo", "stints": [1,2,3] },
        { "name": "TheRealSulli", "stints": [1,2,3] },
        { "name": "Totozzino", "stints": [1,2,3] }
    ],
    "Williams": [
        { "name": "Adrian", "stints": [1,2,3] },
        { "name": "Dahmerkind", "stints": [1,2,3] },
        { "name": "Denzel", "stints": [1,2,3] },
        { "name": "Julian", "stints": [1,2,3] },
        { "name": "Justin", "stints": [1,2,3] },
        { "name": "Moritz", "stints": [1,2,3] },
        { "name": "Raphael", "stints": [1,2,3] },
        { "name": "Ruben", "stints": [1,2,3] },
        { "name": "Theo", "stints": [1,2,3] }
    ],
    "Audi": [
        { "name": "Aaron", "stints": [1,2,3] },
        { "name": "Acedmaric", "stints": [1,2,3] },
        { "name": "Basti", "stints": [1,2,3] },
        { "name": "Bonfo", "stints": [1,2,3] },
        { "name": "Closaurus", "stints": [1,2,3] },
        { "name": "DerMax", "stints": [1,2,3] },
        { "name": "Dome", "stints": [1,2,3] },
        { "name": "Entoon", "stints": [1,2,3] },
        { "name": "Erenn", "stints": [1,2,3] },
        { "name": "Fileminionn", "stints": [1,2,3] },
        { "name": "Jayden", "stints": [1,2,3] },
        { "name": "Kayden", "stints": [1,2,3] },
        { "name": "Leclerccccc", "stints": [1,2,3] },
        { "name": "Maximilian", "stints": [1,2,3] },
        { "name": "Quentin", "stints": [1,2,3] },
        { "name": "Ricewolf", "stints": [1,2,3] },
        { "name": "Terje", "stints": [1,2,3] }
    ],
    "Cadillac": [
        { "name": "BabyDriver", "stints": [1,2,3] },
        { "name": "BreakCheady", "stints": [1,2,3] },
        { "name": "Corruption", "stints": [1,2,3] },
        { "name": "Eis_Fuzzy", "stints": [1,2,3] },
        { "name": "Hummel", "stints": [1,2,3] },
        { "name": "Janni", "stints": [1,2,3] },
        { "name": "Julian", "stints": [1,2,3] },
        { "name": "Nicklas Bergmann", "stints": [1,2,3] },
        { "name": "Panis", "stints": [1,2,3] },
        { "name": "Ruffy", "stints": [1,2,3] },
        { "name": "Ziege", "stints": [1,2,3] }
    ],
    "VCARB": [
        { "name": "Can", "stints": [1,2,3] },
        { "name": "Alexander", "stints": [1,2,3] },
        { "name": "Jerry", "stints": [1,2,3] },
        { "name": "Massig", "stints": [1,2,3] },
        { "name": "Nafio", "stints": [1,2,3] },
        { "name": "Naxy", "stints": [1,2,3] },
        { "name": "PlayerMadly", "stints": [1,2,3] },
        { "name": "Rempf", "stints": [1,2,3] },
        { "name": "Seb", "stints": [1,2,3] },
        { "name": "TJ", "stints": [1,2,3] }
    ],
    "Aston Martin": [
        { "name": "Deathkira", "stints": [1,2,3] },
        { "name": "Jukebox", "stints": [1,2,3] },
        { "name": "Kamams", "stints": [1,2,3] },
        { "name": "Max", "stints": [1,2,3] },
        { "name": "Moralix", "stints": [1,2,3] },
        { "name": "MxMax", "stints": [1,2,3] },
        { "name": "PommesMann", "stints": [1,2,3] },
        { "name": "QualiMerchant", "stints": [1,2,3] },
        { "name": "Rubenpro", "stints": [1,2,3] },
        { "name": "Samuu", "stints": [1,2,3] },
        { "name": "SuperJumper", "stints": [1,2,3] },
        { "name": "VettelOnTop", "stints": [1,2,3] }
    ]
};

// =====================
// State
// =====================
const driverState = structuredClone(teamsData);
let results = [];
let lastSortedResults = [];

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
    const place = row.querySelector(".place")?.value;

    if (!team || !driver || place === "" || place === null) return;

    results.push({
      stint,
      team,
      driver,
      place: Number(place)
    });
  });

  lastSortedResults = [...results].sort((a, b) => {
  return Number(a.place) - Number(b.place);
});

  renderNextGrid(lastSortedResults);
}

// =====================
// NEXT GRID
// =====================
function renderNextGrid(sortedResults) {
  const tbody = document.querySelector("#nextGridTable tbody");
  tbody.innerHTML = "";

  const currentStint = Number(document.getElementById("stintInput").value);
  const nextStint = currentStint + 1;

  // 🔥 echtes Reverse Grid
  const reverseGrid = [...sortedResults]
    .sort((a, b) => a.place - b.place)
    .reverse();

  const usedDrivers = new Set();
  let startPos = 1;

  reverseGrid.forEach(result => {
    const team = result.team;
    const drivers = driverState[team] || [];

    // alle möglichen Fahrer für nächsten Stint
    const availableDrivers = drivers.filter(d =>
      d.stints.includes(nextStint) &&
      !usedDrivers.has(`${team}-${d.name}`)
    );

    // 👉 FALLBACK: wenn leer, trotzdem irgendeinen nehmen (optional)
    const driver = availableDrivers[0] || drivers.find(d =>
      d.stints.includes(nextStint)
    );

    if (driver) {
      usedDrivers.add(`${team}-${driver.name}`);
    }

    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${startPos++}</td>
      <td>${team}</td>
      <td>${driver ? driver.name : "❌ kein Fahrer"}</td>
    `;

    tbody.appendChild(tr);
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
  const drivers = driverState[team];
  if (!drivers || drivers.length < 2) return;

  [drivers[0], drivers[1]] = [drivers[1], drivers[0]];

  renderNextGrid(lastSortedResults);
}
