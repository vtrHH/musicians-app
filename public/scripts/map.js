function initMap() {
  const mapElement = document.getElementById('map');

  let map = new google.maps.Map(mapElement, {
    center: { lat: 49.02961956691756, lng: 10.1014974899453 },
    zoom: 16
  });
}
