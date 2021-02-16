'use strict';

function initMap() {
  const mapElement = document.getElementById('map');

  let map = new google.maps.Map(mapElement, {
    center: { lat: 49.02961956691756, lng: 10.1014974899453 },
    zoom: 16
  });

  map.addListener('click', (event) => {
    const latitude = event.latLng.lat();
    const longitude = event.latLng.lng();

    console.log(latitude);
    const addedMarker = new google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      map: map
    });
  });
}
