import { Router } from "express"
import { SmartDevice } from "../models/smartDevices.js"

const route = Router()

route.post("/registerSmartHome", async function (req, res) {
  const { homeId } = req.body

  try {
    const existingSmartHome = await SmartDevice.findOne({ homeId })

    if (existingSmartHome) {
      return res.status(400).json({ error: "SmartHome already exists" })
    }

    const newSmartHome = new SmartDevice({ homeId })
    await newSmartHome.save()

    return res
      .status(201)
      .json({ message: "SmartHome registered successfully" })
  } catch (error) {
    console.error("Error registering SmartHome:", error)
    return res.status(500).json({ error: "Internal Server Error" })
  }
})

export default route
