import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { API_BASE_URL } from '../api.js'

function Sightings() {
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
        setSightings(data)
      } catch (err) {
        console.error(err)
        setError('Could not load sightings from the API.')
      } finally {
        setLoading(false)
      }
    }

    loadSightings()
  }, [])

  if (loading) {
    return (
      <section>
        <h1>Sighting Reports</h1>
        <p>Loading sightings...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section>
        <h1>Sighting Reports</h1>
        <p>{error}</p>
        <p>Check that your Lab E3 backend is running and that your API URL is correct.</p>
      </section>
    )
  }

  return (
    <section>
      <div className="page-intro">
        <h1>Sighting Reports</h1>
        <p>These records are loaded from the Express/MySQL API.</p>
      </div>

      <p className="count-line">Showing {sightings.length} reports</p>

      <table>
        <thead>
          <tr>
            <th>DATE</th>
            <th>LOCATION</th>
            <th>OBSERVER</th>
            <th>HEALTH STATUS</th>
            <th>NOTES</th>
          </tr>
        </thead>
        <tbody>
          {sightings.map((sighting) => (
            <tr key={sighting.id}>
              <td>{sighting.sighting_date}</td>
              <td>{sighting.location_name}</td>
              <td>{sighting.observer_name}</td>
              <td><span className="badge">{sighting.health_status}</span></td>
              <td>{sighting.notes || 'No notes'}</td>
            </tr>
          ))}

          {sightings.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', color: 'var(--muted)', padding: '32px' }}>
                No sightings were found.
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