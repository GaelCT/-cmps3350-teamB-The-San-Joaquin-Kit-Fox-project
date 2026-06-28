import { isValidId } from "../src/isValidId.js"

test("accepts a positive integer string as a valid ID", () => {
  expect(isValidId("3")).toBe(true)
})

test("rejects a non-numeric string", () => {
  expect(isValidId("abc")).toBe(false)
})

test("rejects zero as an edge case", () => {
  expect(isValidId("0")).toBe(false)
})

test("rejects a negative number (AI-suggested)", () => {
  expect(isValidId("-1")).toBe(false)
})

test("rejects a decimal value (AI-suggested)", () => {
  expect(isValidId("2.5")).toBe(false)
})

test("rejects an empty string (AI missed this case)", () => {
  expect(isValidId("")).toBe(false)
})
