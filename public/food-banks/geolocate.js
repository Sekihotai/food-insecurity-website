window.addEventListener("load", () => {
  getLocation();
});

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(saveLocation);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function saveLocation(position) {
  var latitude1 = position.coords.latitude;
  var longitude1 = position.coords.longitude;

 

}

