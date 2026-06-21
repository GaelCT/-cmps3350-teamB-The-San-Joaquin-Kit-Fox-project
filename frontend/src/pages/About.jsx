function About() {
  return (
    <section>
      <div className="page-intro">
        <h1>About Fox Trail</h1>
        <p>Project information and background.</p>
      </div>

      <p>
        Fox Trail is a student software engineering project built for CMPS 3350
        at California State University, Bakersfield. It is designed to help
        wildlife biologists, field technicians, students, and citizen science
        volunteers record and review San Joaquin kit fox sightings across
        California's Central Valley.
      </p>

      <p className="section-label">THE PROBLEM</p>
      <p>
        The San Joaquin kit fox is a threatened species. Volunteers and field
        researchers currently track sightings using scattered notes and
        inconsistent methods, which makes it harder to collect accurate data and
        monitor fox populations over time. Fox Trail aims to give them one
        reliable, organized place to log and browse what they observe.
      </p>

      <p className="section-label">CORE FEATURES</p>
      <ul style={{ lineHeight: '1.8' }}>
        <li>Submit a sighting report with location, date, fox count, and notes</li>
        <li>View a map showing where sightings have been reported</li>
        <li>Browse and search through past sighting reports</li>
        <li>Upload or link a photo with a sighting</li>
        <li>Flag the health status of observed foxes</li>
      </ul>

      <p className="section-label">PROJECT STATUS</p>
      <p>
        This deployed version is an interactive prototype. It demonstrates the
        screen structure, navigation, and intended interface using example data.
        Persistent storage, a live database, a real API, authentication, and the
        interactive map are planned for future milestones.
      </p>

      <p className="section-label">TEAM B — KIT FOX TRACKER</p>
      <p>Gael, Ashley, Emilio, and Stephen — CMPS 3350, California State University, Bakersfield.</p>
    </section>
  )
}

export default About