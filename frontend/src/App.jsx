import { Link, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import SubmitSighting from './pages/SubmitSighting.jsx'
import Sightings from './pages/Sightings.jsx'
import About from './pages/About.jsx'
import './App.css'

function App() {
  return (
    <>
      <header>
        <h1>Kit Fox Tracker</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/submit">Submit Sighting</Link>
          <Link to="/sightings">Sightings</Link>
          <Link to="/about">About</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/submit" element={<SubmitSighting />} />
          <Route path="/sightings" element={<Sightings />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </>
  )
}

export default App