const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./race.db");

db.serialize(() => {

  // TEAMS (NEU)
  db.run(`
    CREATE TABLE IF NOT EXISTS teams (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT
    )
  `);

  // DRIVER (ERWEITERT)
  db.run(`
    CREATE TABLE IF NOT EXISTS drivers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      team_id INTEGER
    )
  `);

  // RESULTS (NEU STRUKTUR)
  db.run(`
    CREATE TABLE IF NOT EXISTS results (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      race_id INTEGER,
      driver_id INTEGER,
      position INTEGER
    )
  `);

  // GRID (BLEIBT)
  db.run(`
    CREATE TABLE IF NOT EXISTS grid (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      race_id INTEGER,
      driver_id INTEGER,
      position INTEGER
    )
  `);

});

module.exports = db;
