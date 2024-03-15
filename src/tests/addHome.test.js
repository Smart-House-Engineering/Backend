const mongoose = require("mongoose")
const { MongoMemoryServer } = require("mongodb-memory-server")
const request = require("supertest") // For making HTTP requests in tests
import app from "../app"
const { SmartHome } = require("../models/smartDevices") // Adjust the path to your model

describe("POST /addHome", () => {
  let mongoServer

  beforeAll(async () => {
    if (mongoose.connection.readyState) {
      await mongoose.disconnect()
    }
    mongoServer = await MongoMemoryServer.create()
    const mongoUri = mongoServer.getUri()
    await mongoose.connect(mongoUri)
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
  })

  beforeEach(async () => {
    await SmartHome.deleteMany({})
  })

  test("successfully adds a new smart home", async () => {
    const homeId = "TestHome1"
    const response = await request(app)
      .post("/api/smartHome/addHome")
      .send({ homeId })

    expect(response.statusCode).toBe(201)
    expect(response.body).toHaveProperty("homeId", homeId)
  })

  test("fails to add a smart home with an existing homeId", async () => {
    const homeId = "TestHomeDuplicate"
    await SmartHome.create({ homeId })

    const response = await request(app)
      .post("/api/smartHome/addHome")
      .send({ homeId })

    expect(response.statusCode).toBe(400)
    expect(response.body.message).toContain("already exists")
  })

  test("fails to add a smart home without providing homeId", async () => {
    const response = await request(app).post("/api/smartHome/addHome").send({})

    expect(response.statusCode).toBe(400)
    expect(response.body.message).toContain("homeId is required")
  })
})
