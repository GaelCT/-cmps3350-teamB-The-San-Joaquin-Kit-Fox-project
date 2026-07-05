export function toNumberOrNull(value) {
  if (value === null || value === undefined || value === '') {
    return null
  }

  const number = Number(value)
  return Number.isFinite(number) ? number : null
}

export function normalizeSighting(row) {
  return {
    id: row.id,
    observerName: row.observer_name || 'Unknown observer',
    date: row.sighting_date || '',
    location: row.location_name || 'Unknown location',
    latitude: toNumberOrNull(row.latitude),
    longitude: toNumberOrNull(row.longitude),
    count: row.fox_count ?? row.count ?? null,
    health: row.health_status || 'Unknown',
    notes: row.notes || '',
    createdAt: row.created_at || '',
    updatedAt: row.updated_at || '',
  }
}

export function makeBadgeClass(value) {
  const safeValue = String(value || 'unknown')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

  return `badge badge-${safeValue || 'unknown'}`
}