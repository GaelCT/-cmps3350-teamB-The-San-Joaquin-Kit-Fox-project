
import { useState } from 'react'
import MapPicker from '../components/MapPicker'
import { Link } from 'react-router-dom'
import { API_BASE_URL } from '../api.js'

// Submits a new sighting to the database-backed API via POST.
function SubmitSighting() {
  const [observerName, setObserverName] = useState('')
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')
  const [foxCount, setFoxCount] = useState('')

  const [mapLocation, setMapLocation] = useState({
    latitude: '',
    longitude: '',
  })
  const [health, setHealth] = useState('')
  const [notes, setNotes] = useState('')

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const resetForm = () => {
    setObserverName('')
    setDate('')
    setLocation('')
    setHealth('')
    setNotes('')
    setMapLocation({
      latitude: '',
      longitude: '',
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setMessage('')
    setError('')
    setSubmitting(true)

    const newSighting = {
      observer_name: observerName,
      sighting_date: date,
      location_name: location,
      latitude: mapLocation.latitude || null,
      longitude: mapLocation.longitude || null,
      fox_count: foxCount ? Number(foxCount) : null,
      health_status: health || 'Unknown',
      notes: notes || null,
    }

    try {
      const response = await fetch(`${API_BASE_URL}/sightings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSighting),
      })

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`)
      }

      const result = await response.json()
        setMessage(`Sighting created with ID ${result.id}. Check the Sightings page to see the new record.`)
        resetForm()

    } catch (err) {
      console.error(err)
      setError('Could not create the sighting. Check the API URL and backend.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section>
      <div className="page-intro">
        <h1>Submit a Sighting Report</h1>
        <p>Fill in the fields below to log a new San Joaquin kit fox sighting. Fields marked * are required.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="field">
            <label>Observer Name *</label>
            <input
              type="text"
              value={observerName}
              onChange={(e) => setObserverName(e.target.value)}
              placeholder="Your name"
              required
            />
          </div>
          <div className="field">
            <label>Date *</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="field full">
            <label>Location Description *</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Near Buttonwillow, CA - field road junction"
              required
            />
          </div>
          <div className="field">
            <label>Latitude</label>
            <span className="hint">Auto-populated from device GPS if available</span>
            <input
            type="text"
            name="lat"
            placeholder="[ GPS coordinate placeholder ]"
            value={mapLocation.latitude}
            onChange={(event) =>
              setMapLocation({ ...mapLocation, latitude: event.target.value })
            }
          />
          </div>
          <div className="field">
            <label>Longitude</label>
            <span className="hint">Auto-populated from device GPS if available</span>
            <input
            type="text"
            name="lon"
            placeholder="[ GPS coordinate placeholder ]"
            value={mapLocation.longitude}
            onChange={(event) =>
              setMapLocation({ ...mapLocation, longitude: event.target.value })
            }
          />
        </div>

        <div className="field full">
          <label>Select Location on Map</label>
          <span className="hint">Click the map to drop a marker and fill in latitude/longitude.</span>
          <MapPicker
            latitude={mapLocation.latitude}
            longitude={mapLocation.longitude}
            onSelectLocation={setMapLocation}
          />
          </div>
          <div className="field">
            <label>Fox Count</label>
            <span className="hint">Enter the number of foxes observed.</span>
            <input type="number" name="count" min="1" value={foxCount} onChange={(event) => setFoxCount(event.target.value)} placeholder="Enter a number" />
          </div>
          <div className="field">
            <label>Health Status</label>
            <span className="hint">Select the observed health condition.</span>
            <select value={health} onChange={(e) => setHealth(e.target.value)}>
              <option value="">Select one...</option>
              <option>Healthy</option>
              <option>Injured</option>
              <option>Unknown</option>
            </select>
          </div>
          <div className="field full">
            <label>Photo (Optional)</label>
            <span className="hint">Upload an image or paste a URL to a photo of the sighting.</span>
            <div className="placeholder">
              [ PHOTO UPLOAD AREA - drag and drop an image here, or click to browse ]
              <br />- or -<br />
              paste an image URL (placeholder, not active in this prototype)
            </div>
          </div>
          <div className="field full">
            <label>Additional Notes (Optional)</label>
            <span className="hint">Describe behavior, habitat, time of day, or other observations.</span>
            <textarea
              name="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Describe what was observed..."
            ></textarea>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Submitting...' : '[ SUBMIT ]'}
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