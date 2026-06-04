const express = require("express");
const fs = require("fs-extra");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const DATA_FILE = path.join(__dirname, "data.json");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

function loadData() {
  return fs.readJsonSync(DATA_FILE);
}

function saveData(data) {
  fs.writeJsonSync(DATA_FILE, data, { spaces: 2 });
}

/* ---------------- INIT ---------------- */

function initRaces(data) {
  if (!data.races || data.races.length === 0) {
    data.races = Array.from({ length: 28 }, (_, i) => ({
      id: i + 1,
      results: Array.from({ length: 22 }, (_, p) => ({
        start: p + 1,
        team: "",
        driver: "",
        position: null
      }))
    }));
  }
}

/* ---------------- ROUTES ---------------- */

app.get("/", (req, res) => res.redirect("/drivers"));

app.get("/drivers", (req, res) => {
  const data = loadData();
  res.render("drivers", { teams: data.teams });
});

app.get("/grid", (req, res) => {
  const data = loadData();
  initRaces(data);
  res.render("grid", { races: data.races });
});

app.get("/results", (req, res) => {
  const data = loadData();
  initRaces(data);

  res.render("results", {
    races: data.races,
    teams: data.teams   // 👈 WICHTIG hinzufügen
  });
});

/* ---------------- DRIVER API ---------------- */

app.post("/drivers/add", (req, res) => {
  const data = loadData();
  const { team, driver } = req.body;

  const t = data.teams.find(x => x.name === team);
  if (t && driver) t.drivers.push(driver);

  saveData(data);
  res.json({ ok: true });
});

app.post("/drivers/delete", (req, res) => {
  const data = loadData();
  const { team, driver } = req.body;

  const t = data.teams.find(x => x.name === team);
  if (t) t.drivers = t.drivers.filter(d => d !== driver);

  saveData(data);
  res.json({ ok: true });
});

/* ---------------- RESULT UPDATE ---------------- */

app.post("/results/update", (req, res) => {
  const data = loadData();
  const { raceId, start, position, team, driver } = req.body;

  const race = data.races.find(r => r.id == raceId);
  if (!race) return res.json({ ok: false });

  const row = race.results.find(r => r.start == start);
  if (!row) return res.json({ ok: false });

  if (position !== undefined) row.position = Number(position);
  if (team !== undefined) row.team = team;
  if (driver !== undefined) row.driver = driver;

  saveData(data);
  res.json({ ok: true });
});

/* ---------------- NEXT GRID ---------------- */

app.post("/grid/generate/:raceId", (req, res) => {
  const data = loadData();
  const raceId = Number(req.params.raceId);

  const race = data.races.find(r => r.id === raceId);
  const next = data.races.find(r => r.id === raceId + 1);

  if (!race || !next) return res.json({ ok: false });

  const sorted = [...race.results]
    .filter(r => r.position)
    .sort((a, b) => a.position - b.position);

  next.results = sorted.map((r, i) => ({
    start: i + 1,
    team: r.team,
    driver: r.driver,
    position: null
  }));

  saveData(data);
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
