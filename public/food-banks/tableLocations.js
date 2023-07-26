const trackMeButton = document.getElementById("track-me");
   
function getTableSegment(index) {
  let item = localStorage.getItem(`tableSegment-${index}`);
  return item == null ? item : JSON.parse(item);
}

function getAllTableSegments() {
  let i = 0;
  let tableSegments = [];
  
  while (true) {
    let segment = getTableSegment(i);
    if (segment == null) break;
    
    tableSegments.push(segment);
    i++;
  }
  
  return tableSegments;
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
  
  let tableSegments = getAllTableSegments();
  let closest = {
    segment: null,
    dist: Infinity
  };
  let maxDist = 1;
  
  for (let tab of tableSegments) {
    let dist = distance(latitude, longitude, tab.latitude, tab.longitude);
    
    if (dist <= maxDist && dist <= closest.dist) {
      closest.segment = tab;
      closest.dist = dist;
    }
  }
  
  if (closest.segment !== null) {
    let ele = document.querySelector(`tr[data-index="${closest.segment.index}"]`);
    const legend = document.querySelector('.tablelegend')
    ele.style.backgroundColor = "rgba(0, 255, 0, 0.5)"; // Set background color of row
    ele.scrollIntoView();
    legend.style.display = 'block'
    
  }
}