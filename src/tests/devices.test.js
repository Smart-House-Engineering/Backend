import mongoose from "mongoose"
import { MongoMemoryServer } from "mongodb-memory-server"
import { updateDevices, getDevices, SmartHome } from "../models/smartDevices"

describe("SmartHome devices", () => {
  let mongoServer

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    const mongoUri = mongoServer.getUri()
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
  })

  beforeEach(async () => {
    // Clean up the collection between tests
    await SmartHome.deleteMany({})
  })

  test("updateDevices and getDevices functions", async () => {
    const homeId = "TestHome1"
    // Initial state as per schema defaults
    const initialDevices = {
      fan: false,
      RFan: false,
      motion: false,
      buzzer: false,
      relay: false,
      door: 0,
      window: 0,
      yellowLed: 0,
      gasSensor: 0,
      photocell: 0,
      soilSensor: 0,
      steamSensor: 0,
      whiteLed: false,
      button1: false,
      button2: false,
    }

    // Updated state for a subset of devices
    const updatedDevices = {
      fan: true,
      RFan: true,
      yellowLed: 5,
      gasSensor: 300,
      whiteLed: true,
    }

    // Seed the database with an initial document
    await SmartHome.create({ homeId, devices: initialDevices })

    // Update the devices
    await updateDevices(homeId, updatedDevices)

    // Retrieve the updated devices
    const devicesAfterUpdate = await getDevices(homeId)

    // Assertions to verify that updates are applied correctly
    expect(devicesAfterUpdate.fan).toBe(true)
    expect(devicesAfterUpdate.RFan).toBe(true)
    expect(devicesAfterUpdate.yellowLed).toBe(5)
    expect(devicesAfterUpdate.gasSensor).toBe(300)
    expect(devicesAfterUpdate.whiteLed).toBe(true)

    // Assertions to verify that other devices remain unchanged
    expect(devicesAfterUpdate.motion).toBe(false)
    expect(devicesAfterUpdate.buzzer).toBe(false)
    expect(devicesAfterUpdate.relay).toBe(false)
    expect(devicesAfterUpdate.door).toBe(0)
    expect(devicesAfterUpdate.soilSensor).toBe(0)
  })
})
