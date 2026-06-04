const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const DB_PATH = path.join(__dirname, "data.json");

function loadDB() {
  return JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
}

function saveDB(db) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
}

/* ------------------ NAV ------------------ */
app.get("/", (req, res) => res.redirect("/drivers"));

/* ------------------ DRIVERS ------------------ */
app.get("/drivers", (req, res) => {
  const db = loadDB();
  res.render("drivers", { db });
});

app.post("/team/add", (req, res) => {
  const db = loadDB();
  db.teams.push({ name: req.body.team, drivers: [] });
  saveDB(db);
  res.redirect("/drivers");
});

app.post("/driver/add", (req, res) => {
  const db = loadDB();
  const team = db.teams.find(t => t.name === req.body.team);
  if (team) team.drivers.push(req.body.driver);
  saveDB(db);
  res.redirect("/drivers");
});

app.post("/driver/delete", (req, res) => {
  const db = loadDB();
  const team = db.teams.find(t => t.name === req.body.team);
  if (team) {
    team.drivers = team.drivers.filter(d => d !== req.body.driver);
  }
  saveDB(db);
  res.redirect("/drivers");
});

/* ------------------ RACES ------------------ */
app.get("/races", (req, res) => {
  const db = loadDB();

  // reverse grid für race 1 aus letzten Ergebnissen
  const lastRace = db.races[db.races.length - 1];
  let grid = [];

  if (lastRace) {
    grid = [...lastRace.results]
      .sort((a, b) => a.position - b.position)
      .reverse()
      .map((r, i) => ({
        start: i + 1,
        team: r.team,
        driver: r.driver
      }));
  } else {
    db.teams.forEach(t => {
      t.drivers.forEach(d => grid.push({ team: t.name, driver: d }));
    });
    grid = grid.slice(0, 22).map((x, i) => ({
      start: i + 1,
      team: x.team,
      driver: x.driver
    }));
  }

  res.render("races", { db, grid });
});

app.post("/race/save", (req, res) => {
  const db = loadDB();

  const results = [];

  for (let i = 0; i < 22; i++) {
    results.push({
      position: Number(req.body[`pos_${i}`]),
      team: req.body[`team_${i}`],
      driver: req.body[`driver_${i}`]
    });
  }

  db.races.push({ results });
  saveDB(db);

  res.redirect("/races");
});

app.listen(PORT, () => console.log("Server läuft auf " + PORT));
