function loadData() {
  fetch(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vR4Ex5N0btgAzzP0agEcLiO_Wb2fv3ju_iAPT-pyqJAbmkwqKD37M-OQjoSL9qLSD0sJ3DGCfSUuf-5/pub?output=tsv"
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
        phoneLink.target = "_blank";
        phoneLink.textContent = foodPantry.phone;
        phoneCell.appendChild(phoneLink);
        row.appendChild(phoneCell);

        const volunteerCell = document.createElement("td");
        const volunteerButton = document.createElement("button");
        volunteerButton.classList.add("visit-button");
        volunteerButton.addEventListener("click", () => {
          let quickLink = document.createElement("a");
          quickLink.href = foodPantry.volunteer;
          quickLink.target = "_blank";
          quickLink.click();
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

var trTags = document.getElementsByTagName("tr");
 if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test (navigator.userAgent)) {
trTags.style.size.max.width = 25;


console.log("Crazy? I was crazy once. They locked me in a room. A rubber room. A rubber room filled with rats. And rats make me crazy.")
loadData();
} 