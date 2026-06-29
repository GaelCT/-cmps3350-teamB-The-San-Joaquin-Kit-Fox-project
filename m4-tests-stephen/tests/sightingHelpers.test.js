import {
  isValidId,
  hasRequiredFields,
  formatSightingForDisplay,
  prepareSightingForApi,
} from '../src/sightingHelpers.js'

// --- isValidId: validate whether an ID is valid ---

test('isValidId accepts a positive integer string (valid case)', () => {
  expect(isValidId('3')).toBe(true)
})

test('isValidId rejects a non-numeric string (invalid case)', () => {
  expect(isValidId('abc')).toBe(false)
})

test('isValidId rejects zero (edge case)', () => {
  expect(isValidId('0')).toBe(false)
})

test('isValidId rejects an empty string (edge case: Number("") is 0, not NaN)', () => {
  expect(isValidId('')).toBe(false)
})

// --- hasRequiredFields: check required sighting fields are present ---

test('hasRequiredFields accepts a sighting with all required fields (valid case)', () => {
  const sighting = {
    observer_name: 'Stephen',
    sighting_date: '2026-06-28',
    location_name: 'CSUB campus',
  }
  expect(hasRequiredFields(sighting)).toBe(true)
})

test('hasRequiredFields rejects a sighting missing location_name (invalid case)', () => {
  const sighting = {
    observer_name: 'Stephen',
    sighting_date: '2026-06-28',
  }
  expect(hasRequiredFields(sighting)).toBe(false)
})

test('hasRequiredFields rejects a field that is only whitespace (edge case)', () => {
  const sighting = {
    observer_name: '   ',
    sighting_date: '2026-06-28',
    location_name: 'CSUB campus',
  }
  expect(hasRequiredFields(sighting)).toBe(false)
})

test('hasRequiredFields rejects null input (edge case)', () => {
  expect(hasRequiredFields(null)).toBe(false)
})

// --- formatSightingForDisplay: format a record for display ---

test('formatSightingForDisplay maps API fields to display shape (valid case)', () => {
  const row = {
    id: 5,
    sighting_date: '2026-06-20',
    location_name: 'Kern River Parkway',
    health_status: 'Healthy',
  }
  expect(formatSightingForDisplay(row)).toEqual({
    id: 5,
    date: '2026-06-20',
    location: 'Kern River Parkway',
    health: 'Healthy',
  })
})

test('formatSightingForDisplay defaults missing health to "Unknown" (edge case)', () => {
  const row = {
    id: 9,
    sighting_date: '2026-06-15',
    location_name: 'CSUB Sci 2',
    health_status: null,
  }
  expect(formatSightingForDisplay(row).health).toBe('Unknown')
})

// --- prepareSightingForApi: prepare form input before sending to the API ---

test('prepareSightingForApi builds the correct POST body (valid case)', () => {
  const form = {
    observerName: 'Stephen',
    date: '2026-06-28',
    location: 'CSUB campus',
    health: 'Injured',
    notes: 'Seen near the SRC',
  }
  expect(prepareSightingForApi(form)).toEqual({
    observer_name: 'Stephen',
    sighting_date: '2026-06-28',
    location_name: 'CSUB campus',
    health_status: 'Injured',
    notes: 'Seen near the SRC',
  })
})

test('prepareSightingForApi defaults health to "Unknown" and empty notes to null (edge case)', () => {
  const form = {
    observerName: 'Stephen',
    date: '2026-06-28',
    location: 'CSUB campus',
    health: '',
    notes: '',
  }
  const result = prepareSightingForApi(form)
  expect(result.health_status).toBe('Unknown')
  expect(result.notes).toBeNull()
})

test('prepareSightingForApi trims surrounding whitespace from text fields (edge case)', () => {
  const form = {
    observerName: '  Stephen  ',
    date: '2026-06-28',
    location: '  CSUB campus  ',
    health: 'Healthy',
    notes: '  note  ',
  }
  const result = prepareSightingForApi(form)
  expect(result.observer_name).toBe('Stephen')
  expect(result.location_name).toBe('CSUB campus')
  expect(result.notes).toBe('note')
})
