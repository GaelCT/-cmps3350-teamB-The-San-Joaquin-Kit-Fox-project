import { Link } from 'react-router-dom'
import SightingsMap from '../components/SightingsMap'
import heroImage from '../assets/full banner kit fox.jpeg'

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
    
    <div
      className="hero-banner"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      
      <div className="hero-content">
        
        <h1>FOX TRAIL</h1>
        
        <p>
          A San Joaquin Kit Fox Sighting Tracker for wildlife biologists,
          field technicians, students, and science volunteers monitoring fox
          populations in California&apos;s Central Valley.
        </p>

        <div className="hero-buttons">
          
          <Link to="/submit" className="btn btn-primary">
            [ SUBMIT A SIGHTING ]
          </Link>
          
          <Link to="/sightings" className="btn">
            View Sightings →
          </Link>
          
          <Link to="/about" className="btn">
            Learn More →
          </Link>
        
        </div>
      </div>
    </div>

      <p className="section-label">SECTION: MAP PREVIEW</p>
      <p className="note"> Browse reported San Joaquin kit fox sightings by location. Click a marker to view summary information.</p>
      <SightingsMap />

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