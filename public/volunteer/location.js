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
      
      saveLocation(pos);
    }, async (err) => {
      console.log("Using fallback geo api");
      
      let res = await fetch("https://api.techniknews.net/ipgeo/");
      
      if (res.status == 200) {
        let data = await res.json();
        
        saveLocation({
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
  
  console.log(closest.segment);
}

async function saveLocation(position) {
  findClosest(position);
  
  var latitude1 = position.coords.latitude;
  var longitude1 = position.coords.longitude;

  var wGirardAveLat = 39.96960127151498;
  var wGirardAveLong = -75.23993000380737;
  var locustStLat = 39.94892567151861;
  var locustStLong = -75.1683325038085;
  var springGardenStLat = 39.962182524887915;
  var springGardenStLong = -75.15867967497182;
  var mightyWritersNorthLat = 39.97606511480634;
  var mightyWritersNorthLong = -75.17419530380698;
  var oneDayAtATimeLat = 39.9921645518033;
  var oneDayAtATimeLong = -75.1551593749702;
  
  var latitude1 = position.coords.latitude;
  var longitude1 = position.coords.longitude;
  
  var latitude2 = 0;
  var longitude2 = 0;
  
  if ((39.96960127151498 > latitude1 || 39.96960127151498 < latitude1) || (-75.23993000380737 > longitude1 || -75.23993000380737 < longitude1 )) {
    latitude2= 39.96960127151498;
    longitude2 = -75.23993000380737;
  } 
  if (39.94892567151861 > latitude1 || 39.94892567151861 < latitude1 || -75.1683325038085 > longitude1 || -75.1683325038085 < longitude1 ){
    latitude2 = 39.94892567151861;
    longitude2 = -75.1683325038085;
  }
 
  if (39.962182524887915 > latitude1 || 39.962182524887915 < latitude1 || -75.15867967497182 > longitude1 || -75.15867967497182 < longitude1 ){
    latitude2 = 39.962182524887915;
    longitude2 = -75.15867967497182;
  }
 
  
  if (39.97606511480634 > latitude1 || 39.97606511480634 < latitude1 || -75.17419530380698 > longitude1 || -75.17419530380698 < longitude1 ){
    latitude2 = 39.97606511480634;
    longitude2 = -75.15867967497182;
  }
   
   
  if (39.9921645518033 > latitude1 || 39.9921645518033 < latitude1 || -75.1551593749702 > longitude1 || -75.1551593749702 < longitude1 ){
    latitude2 = 39.9921645518033;
    longitude2 = -75.1551593749702;
  }    
      
  var generalArea = [{latitude1, longitude1}, {latitude2, longitude2}] 
  
  
  if (latitude2 == wGirardAveLat) {
    console.log("hit")
    document.body.querySelector('.element[data-index="0"]').style.backgroundColor = '#00808'
  }
    else if (longitude2 == wGirardAveLong) {
    console.log("hit")
    document.body.querySelector('.element[data-index="0"]').style.backgroundColor = '#00808'
  }
  else if (latitude2 == locustStLat) {
    console.log("hit")
    document.body.querySelector('.element[data-index="1"]').style.backgroundColor = '#00808'
  }
  else if (longitude2 == locustStLong) {
    console.log("hit")
    document.body.querySelector('.element[data-index="1"]').style.backgroundColor = '#00808'
  }
  else if (latitude2 == springGardenStLat) {
    console.log("hit")
    document.body.querySelector('.element[data-index="2"]').style.backgroundColor = '#00808'
  }
  else if (longitude2 == springGardenStLong) {
    console.log("hit")
    document.body.querySelector('.element[data-index="2"]').style.backgroundColor = '#00808'
  }
    else if (latitude2 == mightyWritersNorthLat) {
    console.log("hit")
    document.body.querySelector('.element[data-index="3"]').style.backgroundColor = '#00808'
    }  
      else if (longitude2 == mightyWritersNorthLong) {
    console.log("hit")
    document.body.querySelector('.element[data-index="3"]').style.backgroundColor = '#00808'
  }
  else if (latitude2 == oneDayAtATimeLat) {
    console.log("hit")
    document.body.querySelector('.element[data-index="4"]').style.backgroundColor = '#00808'
  } 
     else if (longitude2 == oneDayAtATimeLong) {
    console.log("hit")
    document.body.querySelector('.element[data-index="4"]').style.backgroundColor = '#00808'
  }
}





                 
        
    
