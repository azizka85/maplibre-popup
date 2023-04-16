import maplibregl from 'maplibre-gl'

import 'maplibre-gl/dist/maplibre-gl.css'

const map = new maplibregl.Map({
  container: 'map',
  style: 'https://demotiles.maplibre.org/style.json',
  center: [-118.805, 34.027],
  zoom: 12
})

map.once('load', () => {
  map.addSource('trailheads', {
    type: 'vector',
    tiles: [
      'https://vectortileservices3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/VectorTileServer/tile/{z}/{y}/{x}.pbf'
    ]
  })

  map.addLayer({
    id: "trailheads-circle",
    type: "circle",
    source: "trailheads",
    "source-layer": "Trailheads",

    paint: {
      "circle-color": "hsla(200,80%,70%,0.5)",
      "circle-stroke-width": 2,
      "circle-radius": 5,
      "circle-stroke-color": "hsl(200,80%,50%)"
    }
  })

  map.on('click', 'trailheads-circle', e => {
    const trailhead = e.features?.[0]

    new maplibregl.Popup()
      .setHTML(`<b>${trailhead?.properties?.TRL_NAME}</b>${trailhead?.properties?.PARK_NAME}`)
      .setLngLat((trailhead?.geometry as any)?.coordinates)
      .addTo(map)
  })

  map.on("mouseenter", "trailheads-circle", () => {
    map.getCanvas().style.cursor = "pointer"
  })

  map.on("mouseleave", "trailheads-circle", () => {
    map.getCanvas().style.cursor = "";
  })
})
