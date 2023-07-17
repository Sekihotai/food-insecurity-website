// Fetch the TSV file and generate the table
const hamburger = document.getElementById("activate");

function loadData() {
  fetch(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSdMgOFwvJ7Pkb5KjChcQ6tmdZK15yyEYj7i3IdVZb0S8LIEBtCEMlVTdt4O4t8JkUBXYm60om2ESKp/pub?gid=0&single=true&output=tsv"
  )
    .then((response) => response.text())
    .then((data) => {
      // Process the fetched TSV data
      const foodPantryData = processData(data);

      // Generate the HTML table dynamically
      const tableBody = document.querySelector("#foodPantryTable tbody");

      foodPantryData.forEach((foodPantry) => {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = foodPantry.name;
        row.appendChild(nameCell);

        const addressCell = document.createElement("td");
        addressCell.textContent = foodPantry.address;
        row.appendChild(addressCell);

        const phoneCell = document.createElement("td");
        const phoneLink = document.createElement("a");
        phoneLink.href = `tel:${foodPantry.phone}`;
        phoneLink.textContent = foodPantry.phone;
        phoneCell.appendChild(phoneLink);
        row.appendChild(phoneCell);

        const volunteerCell = document.createElement("td");
        const volunteerButton = document.createElement("button");
        volunteerButton.classList.add("visit-button");
        volunteerButton.addEventListener("click", () => {
          location.href = foodPantry.volunteer;
        });
        volunteerButton.textContent = "Visit";
        volunteerCell.appendChild(volunteerButton);
        row.appendChild(volunteerCell);

        tableBody.appendChild(row);
      });
    });
}

function processData(tsvData) {
  const rows = tsvData.split("\n");

  const data = [];
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i].split("\t");

    if (row.length !== 4) {
      // Skip rows with mismatched number of columns
      continue;
    }

    const rowData = {
      name: row[0],
      address: row[1],
      phone: row[2],
      volunteer: row[3],
    };

    data.push(rowData);
  }

  return data;
}

function activateHamburger() {
  if (hamburger.dataset.active == 0) {
    hamburger.classList.add("is-active");
    hamburger.dataset.active = 1
  } else {
    hamburger.classList.remove("is-active");
    hamburger.dataset.active = 0
  }
  
}

/* MASSIVE CSS HINT
.is-activveerwer {
  animation: slideOut 0.25s cubic-bezier(0.33, 1, 0.68, 1);
}

@keyframes slideOut {
    0% {
        transform: translateX(-100%);
    }
}*/


hamburger.addEventListener("click", activateHamburger);
loadData();
