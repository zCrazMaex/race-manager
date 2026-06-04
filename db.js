const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./race.db");

// Tabellen
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS drivers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS results (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      race_id INTEGER,
      driver TEXT,
      position INTEGER
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS grid (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      race_id INTEGER,
      driver TEXT,
      position INTEGER
    )
  `);
});

module.exports = db;