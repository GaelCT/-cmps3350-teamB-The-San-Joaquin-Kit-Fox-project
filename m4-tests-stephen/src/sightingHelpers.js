// Pure helper functions for Fox Trail sighting logic.
// These mirror the validation and shaping logic used by the backend API
// (server.js) and the frontend Sightings / SubmitSighting pages.
// They have no database, network, or browser dependencies, so they are
// fast and reliable to unit test in isolation.

// Validate whether a sighting ID is usable: a positive integer.
// Mirrors isValidId() guarding the GET/PUT/DELETE /sightings/:id routes.
export function isValidId(value) {
  const id = Number(value)
  return Number.isInteger(id) && id > 0
}

// Check whether a sighting has all required fields present and non-empty.
// Mirrors the backend's POST validation: observer_name, sighting_date,
// and location_name are required.
export function hasRequiredFields(sighting) {
  if (!sighting || typeof sighting !== 'object') {
    return false
  }
  const required = ['observer_name', 'sighting_date', 'location_name']
  return required.every((field) => {
    const value = sighting[field]
    return typeof value === 'string' && value.trim() !== ''
  })
}

// Format a raw API sighting row into the shape the Sightings table renders.
// Mirrors the mapping in Sightings.jsx. Missing health defaults to "Unknown".
export function formatSightingForDisplay(row) {
  return {
    id: row.id,
    date: row.sighting_date,
    location: row.location_name,
    health: row.health_status || 'Unknown',
  }
}

// Prepare raw form input into the JSON body the API expects for POST.
// Mirrors SubmitSighting.jsx: trims text, defaults health to "Unknown",
// and converts an empty notes field to null.
export function prepareSightingForApi(form) {
  return {
    observer_name: (form.observerName || '').trim(),
    sighting_date: form.date || '',
    location_name: (form.location || '').trim(),
    health_status: form.health || 'Unknown',
    notes: form.notes ? form.notes.trim() : null,
  }
}
