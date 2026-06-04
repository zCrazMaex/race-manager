const express = require("express");
const db = require("./db");

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect("/drivers");
});

/* ---------------- HOME ---------------- */
app.get("/", (req, res) => {
  res.render("index");
});

/* ---------------- TEAMS ---------------- */
app.post("/teams/add", (req, res) => {
  db.run("INSERT INTO teams (name) VALUES (?)", [req.body.name]);
  res.redirect("/drivers");
});

/* ---------------- DRIVERS ---------------- */
app.get("/drivers", (req, res) => {
  db.all("SELECT * FROM drivers", (err, rows) => {
    res.render("drivers", { drivers: rows });
  });
});

app.post("/drivers/add", (req, res) => {
  db.run(
    "INSERT INTO drivers (name, team_id) VALUES (?, ?)",
    [req.body.name, req.body.team_id]
  );
  res.redirect("/drivers");
});

app.post("/drivers/delete", (req, res) => {
  db.run("DELETE FROM drivers WHERE id = ?", [req.body.id]);
  res.redirect("/drivers");
});

/* ---------------- RACE INPUT ---------------- */
app.get("/race", (req, res) => {
  db.all("SELECT * FROM drivers", (err, drivers) => {
    res.render("race", { drivers });
  });
});

app.post("/race/save", (req, res) => {

  const raceId = Date.now();

  db.all(`
    SELECT * FROM drivers
  `, (err, drivers) => {

    drivers.forEach(d => {
      const pos = req.body[`pos_${d.id}`];

      db.run(
        "INSERT INTO results (race_id, driver_id, position) VALUES (?, ?, ?)",
        [raceId, d.id, pos]
      );
    });

    // GRID GENERATION (FULL REVERSE 1-22)
    db.all(
      "SELECT * FROM results WHERE race_id = ? ORDER BY position ASC",
      [raceId],
      (err, rows) => {

        const reversed = rows
          .sort((a,b) => a.position - b.position)
          .reverse();

        const nextRaceId = raceId + 1;

        reversed.forEach((r, i) => {
          db.run(
            "INSERT INTO grid (race_id, driver_id, position) VALUES (?, ?, ?)",
            [nextRaceId, r.driver_id, i + 1]
          );
        });

        res.redirect("/grid/" + nextRaceId);
      }
    );

  });

});

/* ---------------- GRID ---------------- */
app.get("/grid/:id", (req, res) => {
  db.all(
    "SELECT * FROM grid WHERE race_id = ? ORDER BY position ASC",
    [req.params.id],
    (err, rows) => {
      res.render("grid", { grid: rows });
    }
  );
});

app.listen(3000, () => console.log("Server läuft auf Port 3000"));
