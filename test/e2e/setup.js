import dotenv from "dotenv";
import mysql from "mysql2"
import { service } from "../../src/service.js";
import supertest from "supertest"

dotenv.config()

let server;
let dbConnection;

beforeAll(async () => {
  dbConnection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.TEST_DB_DATABASE,
  })

  server = service.listen(4000, () => console.log("Test server started on Port: 4000"))
})

beforeEach(() => {
  //Clear all contents from all the tables in db
})

afterAll(async () => {
  await dbConnection.end()
  server.close()
})

export const request = supertest(server)
export { dbConnection }
