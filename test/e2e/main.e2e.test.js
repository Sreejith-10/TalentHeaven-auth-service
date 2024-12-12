import { request } from "./setup.js"

describe('GET on test end point', () => {
  it('should respond with status code of 200', async () => {
    const response = await request.get("/auth/test")
    expect(response.status).toBe(200)
  })
})
