/* eslint-disable */

export const displayMap = locations => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYXJmYWRldiIsImEiOiJja2IzcHpwNjcwNW14MnlwdGpzcGtuMjU1In0.l6bSQQWsSP0gr5HmSf2Wrg';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/arfadev/ckb3r54xw0u661is7yw3sn43e',
    scrollZoom: false
    // center: [-118.122119, 34.12034],
    // zoom: 7
    // interactive: false
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add Popup
    new mapboxgl.Popup({
      offset: 30
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100
    }
  });
};
