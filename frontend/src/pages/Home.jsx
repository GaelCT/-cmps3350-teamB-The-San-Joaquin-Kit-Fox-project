import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import SightingsMap from '../components/SightingsMap'
import heroImage from '../assets/full banner kit fox.jpeg'
import { API_BASE_URL } from '../api.js'

function toNumberOrNull(value) {
  if (value === null || value === undefined || value === '') return null
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
  }
}

function Home() {
  const [sightings, setSightings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadSightings() {
      try {
        const response = await fetch(`${API_BASE_URL}/sightings`)

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`)
        }

        const data = await response.json()
        setSightings(data.map(normalizeSighting))
      } catch (err) {
        console.error(err)
        setError('Could not load sightings from the API.')
      } finally {
        setLoading(false)
      }
    }

    loadSightings()
  }, [])

  const recentSightings = useMemo(() => {
    return sightings
      .slice()
      .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
      .slice(0, 3)
  }, [sightings])

  const mappedSightings = sightings.filter(
    (s) => s.latitude !== null && s.longitude !== null
  )

  const currentMonth = '2026-07'

  const sightingsThisMonth = sightings.filter((s) =>
    s.date?.startsWith(currentMonth)
  ).length

  const locationsReported = new Set(
    sightings.map((s) => s.location).filter(Boolean)
  ).size

  const healthFlags = sightings.filter(
    (s) => s.health && s.health.toLowerCase() !== 'healthy'
  ).length

  return (
    <section>
      <div
        className="hero-banner"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="hero-content">
          <h1>FOX TRAIL</h1>

          <p>
            A San Joaquin Kit Fox Sighting Tracker for wildlife biologists,
            field technicians, students, and science volunteers monitoring fox
            populations in California&apos;s Central Valley.
          </p>

          <div className="hero-buttons">
            <Link to="/submit" className="btn btn-primary">
              [ SUBMIT A SIGHTING ]
            </Link>

            <Link to="/sightings" className="btn">
              View Sightings →
            </Link>

            <Link to="/about" className="btn">
              Learn More →
            </Link>
          </div>
        </div>
      </div>

      <p className="section-label">SECTION: MAP PREVIEW</p>
      <p className="note">
        Browse reported San Joaquin kit fox sightings by location. Click a marker
        to view summary information.
      </p>

      {loading && <p>Loading map sightings...</p>}

      {error && <p className="note">{error}</p>}

      <SightingsMap sightings={mappedSightings} />

      <p className="section-label">SECTION: QUICK STATS</p>
      <div className="stats">
        <div className="stat">Total Sightings [ {sightings.length} ]</div>
        <div className="stat">Sightings This Month [ {sightingsThisMonth} ]</div>
        <div className="stat">Locations Reported [ {locationsReported} ]</div>
        <div className="stat">Health Flags [ {healthFlags} ]</div>
      </div>

      <p className="section-label">SECTION: RECENT SIGHTINGS PREVIEW</p>
      <div className="cards">
        {recentSightings.map((s) => (
          <div className="card" key={s.id}>
            <div className="row">
              <span className="label">Date:</span> {s.date || '-'}
            </div>
            <div className="row">
              <span className="label">Location:</span> {s.location}
            </div>
            <div className="row">
              <span className="label">Count:</span> {s.count ?? '-'}
            </div>
            <div className="row">
              <span className="badge">Health: {s.health}</span>
            </div>
            <div className="row" style={{ marginTop: '8px' }}>
              <Link to={`/sightings/${s.id}`}>View Details →</Link>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <Link to="/sightings" className="btn">
          View All Sightings →
        </Link>
      </div>
    </section>
  )
}

export default Home