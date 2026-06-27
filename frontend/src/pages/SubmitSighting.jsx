import { useState } from 'react'
import MapPicker from '../components/MapPicker'
import { Link } from 'react-router-dom'

// Prototype form only. Fields are placeholders and do NOT save data yet.
// A later milestone will wire this to the API and persist submissions.
function SubmitSighting() {
  const [location, setLocation] = useState({    
    latitude: '',
    longitude: '',
  })
  
  
  return (
    <section>
      <div className="page-intro">
        <h1>Submit a Sighting Report</h1>
        <p>Fill in the fields below to log a new San Joaquin kit fox sighting. Fields marked * are required.</p>
      </div>

      <div className="form-grid">
        <div className="field">
          <label>Date *</label>
          <input type="date" name="date" />
        </div>

        <div className="field">
          <label>Location Description *</label>
          <input type="text" name="location" placeholder="e.g. Near Buttonwillow, CA - field road junction" />
        </div>

        <div className="field">
          <label>Latitude</label>
          <span className="hint">Auto-populated from device GPS if available</span>
          <input
            type="text"
            name="lat"
            placeholder="[ GPS coordinate placeholder ]"
            value={location.latitude}
            onChange={(event) =>
              setLocation({ ...location, latitude: event.target.value })
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
            value={location.longitude}
            onChange={(event) =>
              setLocation({ ...location, longitude: event.target.value })
            }
          />
        </div>

        <div className="field full">
          <label>Select Location on Map</label>
          <span className="hint">Click the map to drop a marker and fill in latitude/longitude.</span>
          <MapPicker
            latitude={location.latitude}
            longitude={location.longitude}
            onSelectLocation={setLocation}
          />
        </div>

        <div className="field">
          <label>Fox Count *</label>
          <span className="hint">Integer only. Minimum value: 1.</span>
          <input type="number" name="count" min="1" placeholder="Enter a number" />
        </div>

        <div className="field">
          <label>Health Status *</label>
          <span className="hint">Select the observed health condition.</span>
          <select name="health">
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
            [ PHOTO UPLOAD AREA — drag and drop an image here, or click to browse ]
            <br />— or —<br />
            paste an image URL (placeholder, not active in this prototype)
          </div>
        </div>

        <div className="field full">
          <label>Additional Notes (Optional)</label>
          <span className="hint">Describe behavior, habitat, time of day, or other observations.</span>
          <textarea name="notes" placeholder="Describe what was observed..."></textarea>
        </div>
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-primary">[ SUBMIT ]</button>
        <Link to="/" className="btn">Cancel</Link>
      </div>

      <p className="note" style={{ marginTop: '16px' }}>
        Note: This is a prototype form. Submitting does not save data yet — a later milestone will connect it to the sightings database.
      </p>
    </section>
  )
}

export default SubmitSighting