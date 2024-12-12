import { validateEmail } from "../../src/utils/emailRegex";

describe('Validate email function', () => {
  test("should return true if the email is valid", () => {
    expect(validateEmail("sreejith@gmail.com")).toBe(true)
  })

  test("should return false if the email is not valid", () => {
    expect(validateEmail("sreejithgmail.com")).toBe(false)
  })

  test("should return false is no email is provided", () => {
    expect(validateEmail("")).toBe(false)
  })
})
