'use strict';

//////////////////// Initialise map, markers & popup ////////////////////
var map = L.map('map').setView([51.505, -0.09], 13);

let myIcon = L.icon({
  iconUrl: '/public/images/icon.png',
  iconSize: [38, 95],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
  shadowSize: [68, 95],
  shadowAnchor: [22, 94]
});

let marker = L.marker({ icon: myIcon });
let popup = L.popup();

//////////////////// Adding the tile to the map ////////////////////
L.tileLayer(
  'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidmVyZW5hdHJhdWIiLCJhIjoiY2tsYjZ2bG5iMHNldTJ2czh6cThhNXV6MSJ9.ltabN8uX3OBSRBgSZrIZEg',
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      'pk.eyJ1IjoidmVyZW5hdHJhdWIiLCJhIjoiY2tsYjZ2bG5iMHNldTJ2czh6cThhNXV6MSJ9.ltabN8uX3OBSRBgSZrIZEg'
  }
).addTo(map);

//////////////////// Showing already saved locations to the map ////////////////////

const data = locations.map((item) => {
  return {
    type: 'Feature',
    geometry: item.location,
    properties: {
      name: item.name,
      popupContent: 'item.name'
    }
  };
});
L.geoJSON(data).addTo(map);

//////////////////// Getting Location when clicking on map ////////////////////
function onMapClick(event) {
  marker.setLatLng(event.latlng);
  marker.addTo(map);
  popup
    .setLatLng(event.latlng)
    .setContent('You have clicked here:' + event.latlng.toString())
    .openOn(map);
  marker.bindPopup(popup).openPopup();

  let lat = event.latlng.lat;
  let lng = event.latlng.lng;

  document.getElementById('lat').value = lat;
  document.getElementById('lng').value = lng;
}

map.on('click', onMapClick);
