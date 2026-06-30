function About() {
  
  return (
    
    <section>
      
      <div className="page-intro">
      
        <h1>About Fox Trail</h1>
      
        <p>Project information and background.</p>
      
      </div>

      <div className="about-grid">
      
        <div className="about-card">
      
          <h2>Project Overview</h2>
      
          <p>
            Fox Trail is a student software engineering project built for CMPS 3350
            at California State University, Bakersfield. It is designed to help
            wildlife biologists, field technicians, students, and citizen science
            volunteers record and review San Joaquin kit fox sightings across
            California's Central Valley.
          </p>
      
        </div>

        <div className="about-card">
        
          <h2>The Problem</h2>
        
          <p>
            The San Joaquin kit fox is a threatened species. Volunteers and field
            researchers currently track sightings using scattered notes and
            inconsistent methods, which makes it harder to collect accurate data and
            monitor fox populations over time.
          </p>
        </div>

        <div className="about-card">
          
          <h2>Core Features</h2>
          
          <ul>
          
            <li>Submit sighting reports</li>
          
            <li>View sightings on a map</li>
          
            <li>Browse past reports</li>
          
            <li>Upload or link photos</li>
          
            <li>Flag fox health status</li>
          
          </ul>
        
        </div>

        <div className="about-card">
        
          <h2>Project Status</h2>
          
          <p>
            This deployed version is an interactive prototype. It demonstrates the
            screen structure, navigation, and intended interface using example data.
            Persistent storage, a live database, API, authentication, and interactive
            map are planned for future milestones.
          </p>
        
        </div>

        <div className="about-card about-card-wide">
        
          <h2>Team B</h2>
        
          <p>
            Gael, Ashley, Emilio, and Stephen — CMPS 3350, California State
            University, Bakersfield.
          </p>
        
        </div>
      
      </div>
    
    </section>
  
  )

}

export default About