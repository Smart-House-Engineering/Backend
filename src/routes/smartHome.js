import { Router } from "express"
import { SmartHome } from "../models/smartDevices.js"

const route = Router()

route.post("/addHome", async (req, res) => {
  const { homeId } = req.body

  // Check if homeId is provided
  if (!homeId) {
    return res.status(400).send({ message: "homeId is required." })
  }

  try {
    // Check if a smart home with the same homeId already exists
    const existingHome = await SmartHome.findOne({ homeId })
    if (existingHome) {
      return res
        .status(400)
        .send({ message: "A smart home with this homeId already exists." })
    }

    // Create a new smart home instance then save it
    const newSmartHome = new SmartHome({ homeId })
    await newSmartHome.save()

    res.status(201).send(newSmartHome) // Send back the created smart home document
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error adding new smart home", error: error.message })
  }
})

export default route
