export function isValidId(value) {
  const id = Number(value)
  return Number.isInteger(id) && id > 0
}