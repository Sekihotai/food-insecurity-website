const trackMeButton = document.getElementById("track-me");
const volunteerTableEle = document.getElementById("volunteerTable");
const tableBody = volunteerTableEle.querySelector("tbody");

function loadData() {
  fetch(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vR4Ex5N0btgAzzP0agEcLiO_Wb2fv3ju_iAPT-pyqJAbmkwqKD37M-OQjoSL9qLSD0sJ3DGCfSUuf-5/pub?gid=0&single=true&output=tsv"
  )
    .then((response) => response.text())
    .then((data) => {
      // Process the fetched TSV data
      const volunteerTableData = processData(data);

      volunteerTableData.forEach((volunteerTable, i) => {
        const row = document.createElement("tr");
        row.setAttribute("data-index", i);

        const nameCell = document.createElement("td");
        nameCell.textContent = volunteerTable.name;
        row.appendChild(nameCell);

        const addressCell = document.createElement("td");
        addressCell.textContent = volunteerTable.address;
        row.appendChild(addressCell);

        const phoneCell = document.createElement("td");
        const phoneLink = document.createElement("a");
        phoneLink.href = `tel:${volunteerTable.phone}`;
        phoneLink.textContent = volunteerTable.phone;
        phoneCell.appendChild(phoneLink);
        row.appendChild(phoneCell);

        const volunteerTableCell = document.createElement("td");
        const volunteerTableButton = document.createElement("button");
        volunteerTableButton.classList.add("visit-button");
        volunteerTableButton.addEventListener("click", () => {
          window.open(volunteerTable.volunteer);
        });
        volunteerTableButton.textContent = "Visit";
        volunteerTableCell.appendChild(volunteerTableButton);
        row.appendChild(volunteerTableCell);

        tableBody.appendChild(row);
        
        volunteerTable.index = i;
        
        localStorage.setItem(`volunteerTableSegment-${i}`, JSON.stringify(volunteerTable));
        console.log(":3")
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

function getTableSegment(index) {
  let item = localStorage.getItem(`volunteerTableSegment-${index}`);
  return item == null ? item : JSON.parse(item);
}

function getAllVolunteerTableSegments() {
  let i = 0;
  let volunteerTableSegments = [];
  
  while (true) {
    let segment = getTableSegment(i);
    if (segment == null) break;
    
    volunteerTableSegments.push(segment);
    i++;
  }
  
  return volunteerTableSegments;
}

trackMeButton.addEventListener("click", () => {
  if (trackMeButton.disabled) return;
  
  if (navigator.geolocation) {
    let ogText = trackMeButton.innerText;
    
    trackMeButton.disabled = true;
    trackMeButton.innerText = "Tracking...";
    
    navigator.geolocation.getCurrentPosition((pos) => {
      trackMeButton.disabled = false;
      trackMeButton.innerText = ogText;
      
      findClosest(pos);
    }, async (err) => {
      console.log("Using fallback geo api");
      
      let res = await fetch("https://api.techniknews.net/ipgeo/");
      
      if (res.status == 200) {
        let data = await res.json();
        
        findClosest({
          coords: {
            latitude: data.lat,
            longitude: data.lon,
          },
          timestamp: Date.now()
        });
      } else {
        console.error(err);
        alert("An error occured whilst getting your current position.");
      }
      
      trackMeButton.disabled = false;
      trackMeButton.innerText = ogText;
    }, {
      enableHighAccuracy: true,
      timeout: 5000,
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
});

async function findClosest(position) {
  console.log("pos", position);
  
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  
  function distance(x1, y1, x2, y2) {
    return Math.sqrt(
      (Math.pow(x2 - x1, 2)) + (Math.pow(y2 - y1, 2))
    );
  }
  
  let volunteerTableSegments = getAllVolunteerTableSegments();
  let closest = {
    segment: null,
    dist: Infinity
  };
  let maxDist = 1;
  
  for (let tab of volunteerTableSegments) {
    let dist = distance(latitude, longitude, tab.latitude, tab.longitude);
    
    if (dist <= maxDist && dist <= closest.dist) {
      closest.segment = tab;
      closest.dist = dist;
    }
  }
  
  if (closest.segment !== null) {
    let ele = document.querySelector(`tr[data-index="${closest.segment.index}"]`);
    volunteerTableEle.classList.remove("hidden");
    document.getElementById("collapseOne").classList.add("show");
    setTimeout(() => {
      const legend = document.querySelector('.tablelegend')
      ele.style.backgroundColor = "rgba(0, 255, 0, 0.5)"; // Set background color of row
      ele.scrollIntoView();
      legend.style.display = 'block';
    }, 200);
  }
}

loadData();
