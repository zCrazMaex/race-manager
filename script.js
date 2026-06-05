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

function bindTeamEvents(){

    document
        .querySelectorAll(".team-dropdown")
        .forEach(select => {

            select.addEventListener(
                "change",
                function(){

                    const row =
                        this.closest("tr");

                    const driverSelect =
                        row.querySelector(
                            ".driver-dropdown"
                        );

                    driverSelect.innerHTML =
                        '<option value="">Fahrer wählen</option>';

                    const drivers =
                        teams[this.value] || [];

                    drivers.forEach(driver => {

                        const option =
                            document.createElement("option");

                        option.value = driver;
                        option.textContent = driver;

                        driverSelect.appendChild(option);
                    });
                }
            );
        });
}

document
.getElementById("addDriverBtn")
.addEventListener("click", () => {

    const team =
        document.getElementById("teamSelect").value;

    const driver =
        document.getElementById("driverName")
        .value
        .trim();

    if(!driver) return;

    if(!teams[team].includes(driver)){

        teams[team].push(driver);

        saveTeams();

        alert("Fahrer hinzugefügt");
    }

    document.getElementById(
        "driverName"
    ).value = "";
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