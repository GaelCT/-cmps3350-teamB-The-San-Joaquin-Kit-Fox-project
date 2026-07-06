import { Link } from 'react-router-dom'

// Placeholder preview cards for the prototype. A later milestone
// will populate these from the most recent real sighting records.
const RECENT = [
  { id: 1, date: '2025-04-12', location: 'Near Buttonwillow, CA - SR 58 junction', count: 2, health: 'Healthy' },
  { id: 2, date: '2025-04-09', location: 'Lokern Natural Area, Kern County',       count: 1, health: 'Injured' },
  { id: 3, date: '2025-04-06', location: 'Wheeler Ridge, I-5 corridor',            count: 3, health: 'Healthy' },
]

function Home() {
  return (
    <section>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1>FOX TRAIL</h1>
        <p style={{ color: 'var(--muted)', maxWidth: '640px', margin: '0 auto 24px' }}>
          A San Joaquin Kit Fox Sighting Tracker for wildlife biologists, field
          technicians, students, and science volunteers monitoring fox
          populations in California's Central Valley.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <Link to="/submit" className="btn btn-primary">[ SUBMIT A SIGHTING ]</Link>
          <Link to="/sightings" className="btn">View Sightings →</Link>
          <Link to="/about" className="btn">Learn More →</Link>
        </div>
      </div>

      <p className="section-label">SECTION: MAP PREVIEW</p>
      <p className="note">↘ Map will be built by Person C (Emilio) using Leaflet and OpenStreetMap — placeholder only</p>
      <div className="placeholder map-placeholder">
        [ MAP PLACEHOLDER — Sighting locations displayed as pins on a regional map of California's Central Valley ]
      </div>

      <p className="section-label">SECTION: QUICK STATS</p>
      <div className="stats">
        <div className="stat">Total Sightings [ ## ]</div>
        <div className="stat">Sightings This Month [ ## ]</div>
        <div className="stat">Locations Reported [ ## ]</div>
        <div className="stat">Health Flags [ ## ]</div>
      </div>

      <p className="section-label">SECTION: RECENT SIGHTINGS PREVIEW</p>
      <div className="cards">
        {RECENT.map((s) => (
          <div className="card" key={s.id}>
            <div className="row"><span className="label">Date:</span> {s.date}</div>
            <div className="row"><span className="label">Location:</span> {s.location}</div>
            <div className="row"><span className="label">Count:</span> {s.count}</div>
            <div className="row"><span className="badge">Health: {s.health}</span></div>
            <div className="row" style={{ marginTop: '8px' }}>
              <Link to="/sightings">View Details →</Link>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <Link to="/sightings" className="btn">View All Sightings →</Link>
      </div>
    </section>
  )
}

export default Home