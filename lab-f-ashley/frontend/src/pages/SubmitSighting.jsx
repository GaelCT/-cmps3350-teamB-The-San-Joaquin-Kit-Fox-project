import { useState } from 'react'
import { API_BASE_URL } from '../api.js'

function SubmitSighting() {
  const [observerName, setObserverName] = useState('')
  const [sightingDate, setSightingDate] = useState('')
  const [locationName, setLocationName] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()

    setMessage('')
    setError('')
    setSubmitting(true)

    const newSighting = {
      observer_name: observerName,
      sighting_date: sightingDate,
      location_name: locationName
    }

    try {
      const response = await fetch(`${API_BASE_URL}/sightings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSighting)
      })

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`)
      }

      const result = await response.json()

      setMessage(`Sighting created with ID ${result.id}. Check the Sightings page to see the new record.`)
      setObserverName('')
      setSightingDate('')
      setLocationName('')
    } catch (err) {
      console.error(err)
      setError('Could not create the sighting. Check your API URL and backend.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section>
      <h2>Submit Sighting</h2>

      <p>
        This form sends a POST request to the Express/MySQL API.
      </p>

      <form onSubmit={handleSubmit}>
        <label>
          Observer name
          <input
            type="text"
            value={observerName}
            onChange={(event) => setObserverName(event.target.value)}
            required
          />
        </label>

        <label>
          Sighting date
          <input
            type="date"
            value={sightingDate}
            onChange={(event) => setSightingDate(event.target.value)}
            required
          />
        </label>

        <label>
          Location name
          <input
            type="text"
            value={locationName}
            onChange={(event) => setLocationName(event.target.value)}
            placeholder="Example: CSUB campus"
            required
          />
        </label>

        <button type="submit" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit Sighting'}
        </button>
      </form>

      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </section>
  )
}

export default SubmitSighting