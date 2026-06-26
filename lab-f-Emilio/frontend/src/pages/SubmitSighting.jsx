import { useState } from 'react'
import { Link } from 'react-router-dom'
import { API_BASE_URL } from '../api.js'

function SubmitSighting() {
  const [observerName, setObserverName] = useState('')
  const [sightingDate, setSightingDate] = useState('')
  const [locationName, setLocationName] = useState('')
  const [healthStatus, setHealthStatus] = useState('Unknown')
  const [notes, setNotes] = useState('')
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
      location_name: locationName,
      health_status: healthStatus,
      notes: notes
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
      setHealthStatus('Unknown')
      setNotes('')
    } catch (err) {
      console.error(err)
      setError('Could not create the sighting. Check your API URL and backend.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section>
      <div className="page-intro">
        <h1>Submit a Sighting Report</h1>
        <p>This form sends a POST request to the Express/MySQL API.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="field">
            <label>Observer Name *</label>
            <input
              type="text"
              value={observerName}
              onChange={(e) => setObserverName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="field">
            <label>Date *</label>
            <input
              type="date"
              value={sightingDate}
              onChange={(e) => setSightingDate(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label>Location Description *</label>
            <input
              type="text"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              placeholder="e.g. Near Buttonwillow, CA - field road junction"
              required
            />
          </div>

          <div className="field">
            <label>Health Status *</label>
            <span className="hint">Select the observed health condition.</span>
            <select
              value={healthStatus}
              onChange={(e) => setHealthStatus(e.target.value)}
              required
            >
              <option>Healthy</option>
              <option>Injured</option>
              <option>Unknown</option>
            </select>
          </div>

          <div className="field full">
            <label>Additional Notes</label>
            <span className="hint">Describe behavior, habitat, time of day, or other observations.</span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Describe what was observed..."
            ></textarea>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit Sighting'}
          </button>
          <Link to="/" className="btn">Cancel</Link>
        </div>
      </form>

      {message && <p className="note" style={{ marginTop: '16px' }}>{message}</p>}
      {error && <p className="note" style={{ marginTop: '16px' }}>{error}</p>}
    </section>
  )
}

export default SubmitSighting