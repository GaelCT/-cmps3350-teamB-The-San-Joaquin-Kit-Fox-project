function SubmitSighting() {
  return (
    <section>
      <h2>Submit Sighting</h2>
      <p>This placeholder form shows the information a future sighting report may collect.</p>

      <form>
        <label>
          Date of sighting
          <input type="date" name="date" />
        </label>

        <label>
          Location description
          <input type="text" name="location" placeholder="Near campus, park, road, or landmark" />
        </label>

        <label>
          Health status
          <select name="health">
            <option>Unknown</option>
            <option>Appears healthy</option>
            <option>Appears injured</option>
          </select>
        </label>

        <label>
          Notes
          <textarea name="notes" placeholder="Describe what was observed"></textarea>
        </label>

        <button type="button">Placeholder Submit Button</button>
      </form>
    </section>
  )
}

export default SubmitSighting