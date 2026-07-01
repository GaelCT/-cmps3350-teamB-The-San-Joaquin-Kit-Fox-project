import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet'

import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const sampleSightings = [
  {
    id: 1,
    latitude: 35.3733,
    longitude: -119.0187,
    location: 'Downtown Bakersfield',
    health: 'Healthy',
  },
  {
    id: 2,
    latitude: 35.265,
    longitude: -119.23,
    location: 'Buttonwillow',
    health: 'Unknown',
  },
  {
    id: 3,
    latitude: 35.42,
    longitude: -119.1,
    location: 'Kern Wildlife Area',
    health: 'Injured',
  },
]

function SightingsMap() {
  return (
    <div className="map-wrapper">
      <MapContainer
        center={[35.37, -119.02]}
        zoom={10}
        className="leaflet-map"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {sampleSightings.map((sighting) => (
          <Marker
            key={sighting.id}
            position={[sighting.latitude, sighting.longitude]}
          >
            <Popup>
              <strong>{sighting.location}</strong>
              <br />
              Health: {sighting.health}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default SightingsMap