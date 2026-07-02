import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { API_BASE_URL } from '../api.js'
import SightingsMap from '../components/SightingsMap.jsx'

function toNumberOrNull(value) {
  if (value === null || value === undefined || value === '') {
    return null
  }

  const number = Number(value)
  return Number.isFinite(number) ? number : null
}

function normalizeSighting(row) {
  return {
    id: row.id,
    observerName: row.observer_name || 'Unknown observer',
    date: row.sighting_date || '',
    location: row.location_name || 'Unknown location',
    latitude: toNumberOrNull(row.latitude),
    longitude: toNumberOrNull(row.longitude),
    count: row.fox_count ?? row.count ?? null,
    health: row.health_status || 'Unknown',
    notes: row.notes || '',
    createdAt: row.created_at || '',
    updatedAt: row.updated_at || '',
  }
}

function SightingDetails() {
  const { id } = useParams()
  const [sighting, setSighting] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadSighting() {
      try {
        const response = await fetch(`${API_BASE_URL}/sightings/${id}`)

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`)
        }

        const data = await response.json()

        if (!ignore) {
          setSighting(normalizeSighting(data))
          setError('')
        }
      } catch (err) {
        console.error(err)

        if (!ignore) {
          setError('Could not load this sighting from the API.')
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    loadSighting()

    return () => {
      ignore = true
    }
  }, [id])

  if (loading) {
    return (
      <section>
        <h1>Sighting Details</h1>
        <p>Loading sighting...</p>
      </section>
    )
  }

  if (error || !sighting) {
    return (
      <section>
        <h1>Sighting Details</h1>
        <p>{error || 'Sighting not found.'}</p>
        <Link to="/sightings" className="btn">
          Back to Sightings
        </Link>
      </section>
    )
  }

  const hasCoordinates =
    sighting.latitude !== null && sighting.longitude !== null

  return (
    <section>
      <div className="page-intro">
        <h1>Sighting Details</h1>
        <p>Detailed information for report #{sighting.id}.</p>
      </div>

      <div className="card">
        <p>
          <strong>Date:</strong> {sighting.date || '-'}
        </p>
        <p>
          <strong>Observer:</strong> {sighting.observerName}
        </p>
        <p>
          <strong>Location:</strong> {sighting.location}
        </p>
        <p>
          <strong>Coordinates:</strong>{' '}
          {hasCoordinates
            ? `${sighting.latitude.toFixed(6)}, ${sighting.longitude.toFixed(6)}`
            : 'Not provided by backend'}
        </p>
        <p>
          <strong>Fox Count:</strong> {sighting.count ?? 'Not provided by backend'}
        </p>
        <p>
          <strong>Health:</strong> {sighting.health}
        </p>
        <p>
          <strong>Notes:</strong> {sighting.notes || '-'}
        </p>
      </div>

      <p className="section-label">SECTION: LOCATION MAP</p>
      <SightingsMap sightings={[sighting]} />

      <div style={{ marginTop: '16px' }}>
        <Link to="/sightings" className="btn">
          Back to Sightings
        </Link>
      </div>
    </section>
  )
}

export default SightingDetails