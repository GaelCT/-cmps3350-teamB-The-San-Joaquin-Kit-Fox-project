import { useEffect, useState } from 'react'
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
        <h2>Sightings</h2>
        <p>Loading sightings...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section>
        <h2>Sightings</h2>
        <p>{error}</p>
        <p>Check that your Lab E3 backend is running and that your API URL is correct.</p>
      </section>
    )
  }

  return (
    <section>
      <h2>Sightings</h2>

      <p>
        These records are loaded from the Express/MySQL API.
      </p>

      {sightings.length === 0 ? (
        <p>No sightings were found.</p>
      ) : (
        <ul>
          {sightings.map((sighting) => (
            <li key={sighting.id}>
              <strong>{sighting.location_name}</strong>
              {' - '}
              {sighting.observer_name}
              {' - '}
              {sighting.sighting_date}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default Sightings