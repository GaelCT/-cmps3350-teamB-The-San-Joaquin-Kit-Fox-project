import { useState } from 'react'
import { Link } from 'react-router-dom'

// Hardcoded example data for the prototype (matches the Figma wireframe).
// A later milestone will replace this with real records from the API.
const SIGHTINGS = [
  { id: 1, date: '2025-04-12', location: 'Near Buttonwillow, CA - SR 58 junction', count: 2, health: 'Healthy' },
  { id: 2, date: '2025-04-09', location: 'Lokern Natural Area, Kern County',       count: 1, health: 'Injured' },
  { id: 3, date: '2025-04-06', location: 'Wheeler Ridge, I-5 corridor',            count: 3, health: 'Healthy' },
  { id: 4, date: '2025-03-30', location: 'Corcoran, Kings County - ag field edge',  count: 1, health: 'Unknown' },
  { id: 5, date: '2025-03-27', location: 'Elk Hills, western Kern County',          count: 2, health: 'Healthy' },
  { id: 6, date: '2025-03-21', location: 'Lost Hills, north of Taft',               count: 1, health: 'Unknown' },
]

function Sightings() {
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [health, setHealth] = useState('All')
  const [sort, setSort] = useState('newest')

  // Filter, then sort. Pure UI logic on hardcoded data — no backend.
  const visible = SIGHTINGS
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

      <p className="count-line">Showing {visible.length} of {SIGHTINGS.length} reports</p>

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
              <td>{s.count}</td>
              <td><span className="badge">{s.health}</span></td>
              <td><Link to="/sightings">View Details →</Link></td>
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

      <div style={{ marginTop: '24px' }}>
        <Link to="/submit" className="btn btn-primary">+ Submit a New Sighting</Link>
      </div>
    </section>
  )
}

export default Sightings