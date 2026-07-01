import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet'

import { Link } from 'react-router-dom'
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

function toNumberOrNull(value) {
  if (value === null || value === undefined || value === '') {
    return null
  }

  const number = Number(value)
  return Number.isFinite(number) ? number : null
}

function formatDate(value) {
  if (!value) {
    return 'Unknown date'
  }

  return String(value).slice(0, 10)
}

function SightingsMap({ sightings = [] }) {
  const mappedSightings = sightings
    .map((sighting) => ({
      ...sighting,
      latitude: toNumberOrNull(sighting.latitude),
      longitude: toNumberOrNull(sighting.longitude),
    }))
    .filter(
      (sighting) =>
        sighting.latitude !== null &&
        sighting.longitude !== null
    )

  const center = mappedSightings.length > 0
    ? [mappedSightings[0].latitude, mappedSightings[0].longitude]
    : [35.3733, -119.0187]

  return (
    <div className="map-wrapper">
      {mappedSightings.length === 0 && (
        <p className="note" style={{ marginBottom: '12px' }}>
          No database sightings currently include latitude and longitude.
          The map is ready, but the backend must return coordinates before
          real markers can appear.
        </p>
      )}

      <MapContainer
        center={center}
        zoom={mappedSightings.length > 0 ? 12 : 10}
        className="leaflet-map"
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {mappedSightings.map((sighting) => (
          <Marker
            key={sighting.id}
            position={[sighting.latitude, sighting.longitude]}
          >
            <Popup>
              <strong>{sighting.location || 'Unknown location'}</strong>
              <br />
              Date: {formatDate(sighting.date)}
              <br />
              Fox count: {sighting.count ?? '-'}
              <br />
              Health: {sighting.health || 'Unknown'}
              <br />
              <Link to={`/sightings/${sighting.id}`}>View details</Link>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default SightingsMap