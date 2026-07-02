import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

function LocationMarker({ position, onSelectLocation }) {
  useMapEvents({
    click(event) {
      const { lat, lng } = event.latlng
      onSelectLocation({
        latitude: lat.toFixed(6),
        longitude: lng.toFixed(6),
      })
    },
  })

  return position ? <Marker position={[position.latitude, position.longitude]} /> : null
}

function MapPicker({ latitude, longitude, onSelectLocation }) {
  const hasPosition = latitude && longitude
  const center = hasPosition
    ? [Number(latitude), Number(longitude)]
    : [35.3733, -119.0187]

  return (
    <div className="map-wrapper">
      <MapContainer center={center} zoom={12} className="leaflet-map">
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker
          position={
            hasPosition
              ? { latitude: Number(latitude), longitude: Number(longitude) }
              : null
          }
          onSelectLocation={onSelectLocation}
        />
      </MapContainer>
    </div>
  )
}

export default MapPicker