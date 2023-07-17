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
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;

 

}
var 
if (position.coords.latitude === 