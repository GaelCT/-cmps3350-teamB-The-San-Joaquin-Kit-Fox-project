import { useState, useEffect, useMemo } from 'react'
import SightingsMap from '../components/SightingsMap'
import { Link } from 'react-router-dom'
import { API_BASE_URL } from '../api.js'
import { normalizeSighting, makeBadgeClass } from '../utils/sightingUtils.js'

function Sightings() {
  const [sightings, setSightings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [health, setHealth] = useState('All')
  const [sort, setSort] = useState('newest')

  useEffect(() => {
    let ignore = false

    async function loadSightings() {
      try {
        const response = await fetch(`${API_BASE_URL}/sightings`)

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`)
        }

        const data = await response.json()

        if (!Array.isArray(data)) {
          throw new Error('API did not return an array of sightings')
        }

        if (!ignore) {
          setSightings(data.map(normalizeSighting))
          setError('')
        }
      } catch (err) {
        console.error(err)

        if (!ignore) {
          setError(
            'Failed to load sightings from the API. Please check that the backend is running and that the API URL is correct.'
          )
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    loadSightings()

    return () => {
      ignore = true
    }
  }, [])

  const healthOptions = useMemo(() => {
    const values = sightings
      .map((sighting) => sighting.health)
      .filter(Boolean)

    return ['All', ...Array.from(new Set(values))]
  }, [sightings])

  const visible = useMemo(() => {
    return sightings
      .filter((s) => (dateFrom ? s.date && s.date >= dateFrom : true))
      .filter((s) => (dateTo ? s.date && s.date <= dateTo : true))
      .filter((s) => (health === 'All' ? true : s.health === health))
      .slice()
      .sort((a, b) => {
        const aDate = a.date || ''
        const bDate = b.date || ''

        return sort === 'newest'
          ? bDate.localeCompare(aDate)
          : aDate.localeCompare(bDate)
      })
  }, [sightings, dateFrom, dateTo, health, sort])

  function clearFilters() {
    setDateFrom('')
    setDateTo('')
    setHealth('All')
    setSort('newest')
  }

  if (loading) {
    return (
      <section>
        <div className="page-intro">
          <h1>Sighting Reports</h1>
          <p>Loading sightings from the API...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section>
        <div className="page-intro">
          <h1>Sighting Reports</h1>
          <p>{error}</p>
          <p>Check that the backend is running and that the API URL is correct.</p>
        </div>
      </section>
    )
  }

  return (
    <section>
      <div className="page-intro">
        <h1>Sighting Reports</h1>
        <p>
          Browse all submitted kit fox sighting reports. Use filters and sort controls below.
        </p>
      </div>

      <p className="section-label">SECTION: SIGHTINGS MAP</p>
      <p className="note">
        View reported kit fox sightings by location. Click a marker to see summary information.
      </p>

      <SightingsMap sightings={visible} />

      <div className="filter-bar">
        <div className="field">
          <label>DATE FROM</label>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
          />
        </div>

        <div className="field">
          <label>DATE TO</label>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
          />
        </div>

        <div className="field">
          <label>HEALTH STATUS</label>
          <select value={health} onChange={(e) => setHealth(e.target.value)}>
            {healthOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="field">
          <label>SORT ORDER</label>
          <div className="sort-group">
            <button
              type="button"
              className={`sort-btn ${sort === 'newest' ? 'active' : ''}`}
              onClick={() => setSort('newest')}
            >
              Newest First
            </button>

            <button
              type="button"
              className={`sort-btn ${sort === 'oldest' ? 'active' : ''}`}
              onClick={() => setSort('oldest')}
            >
              Oldest First
            </button>
          </div>
        </div>

        <button type="button" className="btn" onClick={clearFilters}>
          Clear Filters
        </button>
      </div>

      <div className="table-header">
        <h3>Recorded Sightings</h3>
        <span>
          Showing {visible.length} of {sightings.length} reports
        </span>
      </div>

      <table>
        <thead>
          <tr>
            <th>DATE</th>
            <th>LOCATION</th>
            <th>COORDINATES</th>
            <th>FOX COUNT</th>
            <th>HEALTH STATUS</th>
            <th>ACTION</th>
          </tr>
        </thead>

        <tbody>
          {visible.map((s) => {
            const hasCoordinates = s.latitude !== null && s.longitude !== null

            return (
              <tr key={s.id} id={`sighting-${s.id}`}>
                <td>{s.date || '-'}</td>
                <td>{s.location}</td>
                <td>
                  {hasCoordinates
                    ? `${s.latitude.toFixed(5)}, ${s.longitude.toFixed(5)}`
                    : '-'}
                </td>
                <td>{s.count ?? '-'}</td>
                <td>
                  <span className={makeBadgeClass(s.health)}>
                    {s.health}
                  </span>
                </td>
                <td>
                  <Link to={`/sightings/${s.id}`}>View Details</Link>
                </td>
              </tr>
            )
          })}

          {visible.length === 0 && (
            <tr>
              <td
                colSpan="6"
                style={{
                  textAlign: 'center',
                  color: 'var(--muted)',
                  padding: '32px',
                }}
              >
                No sightings match the current filters.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="submit-btn-container">
        <Link to="/submit" className="btn btn-primary">
          + Submit a New Sighting
        </Link>
      </div>
    </section>
  )
}

export default Sightings