import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { API_BASE_URL } from '../api.js'

// Loads kit fox sightings from the database-backed API and renders them
// with client-side filter + sort controls.
function Sightings() {
  const [sightings, setSightings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [health, setHealth] = useState('All')
  const [sort, setSort] = useState('newest')

  useEffect(() => {
    async function loadSightings() {
      try {
        const response = await fetch(`${API_BASE_URL}/sightings`)
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`)
        }
        const data = await response.json()
        // Map API field names into the shape this UI expects.
        const mapped = data.map((row) => ({
          id: row.id,
          date: row.sighting_date,
          location: row.location_name,
          count: null, // DB has no fox-count column yet
          health: row.health_status,
        }))
        setSightings(mapped)
      } catch (err) {
        console.error(err)
        setError('Could not load sightings from the API.')
      } finally {
        setLoading(false)
      }
    }
    loadSightings()
  }, [])

  // Filter, then sort. Pure UI logic on the fetched data.
  const visible = sightings
    .filter((s) => (dateFrom ? s.date >= dateFrom : true))
    .filter((s) => (dateTo ? s.date <= dateTo : true))
    .filter((s) => (health === 'All' ? true : s.health === health))
    .sort((a, b) =>
      sort === 'newest'
        ? b.date.localeCompare(a.date)
        : a.date.localeCompare(b.date)
    )

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
        <p>Browse all submitted kit fox sighting reports. Use filters and sort controls below.</p>
      </div>

      <div className="filter-bar">
        <div className="field">
          <label>DATE FROM</label>
          <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
        </div>
        <div className="field">
          <label>DATE TO</label>
          <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
        </div>
        <div className="field">
          <label>HEALTH STATUS</label>
          <select value={health} onChange={(e) => setHealth(e.target.value)}>
            <option>All</option>
            <option>Healthy</option>
            <option>Injured</option>
            <option>Unknown</option>
          </select>
        </div>
        <div className="field">
          <label>SORT ORDER</label>
          <div className="sort-group">
            <button
              className={`sort-btn ${sort === 'newest' ? 'active' : ''}`}
              onClick={() => setSort('newest')}
            >
              Newest First
            </button>
            <button
              className={`sort-btn ${sort === 'oldest' ? 'active' : ''}`}
              onClick={() => setSort('oldest')}
            >
              Oldest First
            </button>
          </div>
        </div>
        <button className="btn" onClick={clearFilters}>Clear Filters</button>
      </div>

      <div className="table-header">
        <h3>Recorded Sightings</h3>
        <span>Showing {visible.length} of {sightings.length} reports</span>
      </div>

      <table>
        <thead>
          <tr>
            <th>DATE</th>
            <th>LOCATION</th>
            <th>FOX COUNT</th>
            <th>HEALTH STATUS</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {visible.map((s) => (
            <tr key={s.id}>
              <td>{s.date}</td>
              <td>{s.location}</td>
              <td>{s.count ?? '-'}</td>
              <td>
                <span className={`badge badge-${s.health.toLowerCase().replace(/\s+/g, '-')}`}>
                  {s.health}
                </span>
              </td>
              <td><Link to="/sightings">View Details</Link></td>
            </tr>
          ))}
          {visible.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', color: 'var(--muted)', padding: '32px' }}>
                No sightings match the current filters.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="submit-btn-container">
        <Link to="/submit" className="btn btn-primary">+ Submit a New Sighting</Link>
      </div>
    </section>
  )
}

export default Sightings