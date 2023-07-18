const sidebar = document.getElementById("sidebar");
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

      foodPantryData.forEach((foodPantry, i) => {
        const row = document.createElement("tr");
        row.setAttribute("data-index", i);

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
        
        foodPantry.index = i;
        
        localStorage.setItem(`tableSegment-${i}`, JSON.stringify(foodPantry));
      });
    });
}

function processData(tsvData) {
  const rows = tsvData.split("\n");

  const data = [];
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i].split("\t");

    const rowData = {
      name: row[0],
      address: row[1],
      phone: row[2],
      volunteer: row[3],
      latitude: parseFloat(row[4]),
      longitude: parseFloat(row[5]),
    };

    const name = {
      name: row[0],
    };

    data.push(rowData);
  }

  return data;
}

function activateHamburger() {
  if (hamburger.dataset.active == 0) {
    hamburger.classList.add("is-active");
    sidebar.classList.add("open");
    hamburger.dataset.active = 1;
  } else {
    hamburger.classList.remove("is-active");
    sidebar.classList.remove("open");
    hamburger.dataset.active = 0;
  }
}

function resizeSidebar() {
  const header = document.querySelector("header");

  let height = header.getBoundingClientRect().height;
  sidebar.style.height = `calc(100vh - ${height}px + ${window.scrollY}px)`;
  sidebar.style.top = `calc(${height}px - ${window.scrollY}px)`;
}

window.addEventListener("load", resizeSidebar);
window.addEventListener("resize", resizeSidebar);
window.addEventListener("scroll", resizeSidebar);
hamburger.addEventListener("click", activateHamburger);
console.log("Crazy? I was crazy once. They locked me in a room. A rubber room. A rubber room filled with rats. And rats make me crazy.")
loadData();
