const exampleSightings = [
  { id: 1, location: 'Near open field', status: 'Unknown' },
  { id: 2, location: 'Near campus edge', status: 'Appears healthy' },
  { id: 3, location: 'Near roadway', status: 'Needs review' },
]

function Sightings() {
  return (
    <section>
      <h2>Sightings</h2>
      <p>This page uses placeholder data. A later milestone will connect this view to real stored records.</p>

      <ul>
        {exampleSightings.map((sighting) => (
          <li key={sighting.id}>
            <strong>{sighting.location}</strong> - {sighting.status}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Sightings