const TEAMS = [
    "Red Bull",
    "Mercedes",
    "Ferrari",
    "McLarren",
    "Haas",
    "Alpine",
    "Williams",
    "Audi",
    "Cadillac",
    "VCARB",
    "Aston Martin"
];

let teams = {};

async function loadTeams() {

    const saved = localStorage.getItem("teams");

    if (saved) {
        teams = JSON.parse(saved);
    } else {
        const res = await fetch("drivers.json");
        teams = await res.json();
        saveTeams();
    }

    renderDriverOverview();
    createResultsTable();
    populateTeamSelects();
}

function saveTeams(){
    localStorage.setItem("teams", JSON.stringify(teams));
}

function populateTeamSelects(){

    const addSelect =
        document.getElementById("teamSelect");

    addSelect.innerHTML = "";

    TEAMS.forEach(team => {

        const option =
            document.createElement("option");

        option.value = team;
        option.textContent = team;

        addSelect.appendChild(option);
    });

    document
        .querySelectorAll(".team-dropdown")
        .forEach(select => {

            select.innerHTML =
                '<option value="">Team wählen</option>';

            TEAMS.forEach(team => {

                const option =
                    document.createElement("option");

                option.value = team;
                option.textContent = team;

                select.appendChild(option);
            });
        });
}

function createResultsTable(){

    const tbody =
        document.querySelector(
            "#resultsTable tbody"
        );

    tbody.innerHTML = "";

    for(let i=1;i<=22;i++){

        const row =
            document.createElement("tr");

        row.innerHTML = `
            <td>${i}</td>

            <td>
                <select class="team-dropdown">
                    <option value="">
                        Team wählen
                    </option>
                </select>
            </td>

            <td>
                <select class="driver-dropdown">
                    <option value="">
                        Fahrer wählen
                    </option>
                </select>
            </td>

            <td>
                <input
                    class="stint-input"
                    type="number"
                    min="1"
                    max="22">
            </td>
        `;

        tbody.appendChild(row);
    }

    populateTeamSelects();

    bindTeamEvents();
}

function renderDriverOverview() {

    const container = document.getElementById("driverOverview");
    container.innerHTML = "";

    Object.keys(teams).forEach(team => {

        const div = document.createElement("div");

        let html = `<h3>${team}</h3>`;

        teams[team].forEach((driver, index) => {

            html += `
                <div>
                    <b>${driver.name}</b>
                    <input 
                        value="${driver.stints.join(",")}"
                        data-team="${team}"
                        data-index="${index}"
                        class="stint-edit">
                </div>
            `;
        });

        div.innerHTML = html;
        container.appendChild(div);
    });

    document.querySelectorAll(".stint-edit").forEach(input => {

        input.addEventListener("change", function () {

            const team = this.dataset.team;
            const index = this.dataset.index;

            teams[team][index].stints = this.value
                .split(",")
                .map(n => parseInt(n.trim()))
                .filter(n => !isNaN(n));

            saveTeams();
        });
    });
}

function getDriversForTeamAndStint(team, stint) {

    if (!team) return [];

    return teams[team].filter(driver =>
        driver.stints.includes(stint)
    );
}

function bindTeamEvents() {

    document.querySelectorAll("#resultsTable tbody tr").forEach(row => {

        const teamSelect = row.querySelector(".team-dropdown");
        const driverSelect = row.querySelector(".driver-dropdown");
        const stintInput = row.querySelector(".stint-input");

        function updateDrivers() {

            const team = teamSelect.value;
            const stint = parseInt(stintInput.value);

            driverSelect.innerHTML = "<option>Fahrer wählen</option>";

            if (!team || isNaN(stint)) return;

            const drivers = getDriversForTeamAndStint(team, stint);

            drivers.forEach(d => {
                const opt = document.createElement("option");
                opt.value = d.name;
                opt.textContent = d.name;
                driverSelect.appendChild(opt);
            });
        }

        teamSelect.addEventListener("change", updateDrivers);
        stintInput.addEventListener("change", updateDrivers);
    });
}



document.getElementById("addDriverBtn").addEventListener("click", () => {

    const team = document.getElementById("teamSelect").value;
    const name = document.getElementById("driverName").value.trim();
    const stintsRaw = document.getElementById("stintsInput").value;

    if (!team || !name) return;

    const stints = stintsRaw
        .split(",")
        .map(s => parseInt(s.trim()))
        .filter(n => !isNaN(n));

    teams[team].push({
        name,
        stints
    });

    saveTeams();
    renderDriverOverview();

    document.getElementById("driverName").value = "";
    document.getElementById("stintsInput").value = "";
});

document
.getElementById("calculateBtn")
.addEventListener("click", () => {

    const rows =
        document.querySelectorAll(
            "#resultsTable tbody tr"
        );

    let results = [];

    rows.forEach(row => {

        const team =
            row.querySelector(
                ".team-dropdown"
            ).value;

        const driver =
            row.querySelector(
                ".driver-dropdown"
            ).value;

        const position =
            parseInt(
                row.querySelector(
                    "input"
                ).value
            );

        if(
            team &&
            driver &&
            !isNaN(position)
        ){
            results.push({
                team,
                driver,
                position
            });
        }
    });

    if(results.length !== 22){

        alert(
            "Bitte alle 22 Fahrer eintragen."
        );

        return;
    }

    const positions =
        results.map(r => r.position);

    const unique =
        [...new Set(positions)];

    if(unique.length !== 22){

        alert(
            "Platzierungen dürfen nicht doppelt sein."
        );

        return;
    }

    results.sort(
        (a,b) =>
        a.position - b.position
    );

    results.reverse();

    createNextGrid(results);
});

function createNextGrid(grid){

    const tbody =
        document.querySelector(
            "#nextGridTable tbody"
        );

    tbody.innerHTML = "";

    grid.forEach((entry,index) => {

        const row =
            document.createElement("tr");

        row.innerHTML = `
            <td>${index+1}</td>
            <td>${entry.team}</td>
            <td>${entry.driver}</td>
        `;

        tbody.appendChild(row);
    });
}

loadTeams();
createResultsTable();
populateTeamSelects();
