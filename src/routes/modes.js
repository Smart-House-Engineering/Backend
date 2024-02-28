import { Router } from "express"
import { updateDevices, getDevices } from "../models/smartDevices.js"

const route = Router()

route.put("/defaultMode", async (req, res) => {
  const { homeId, updatedDevices } = req.body
  console.log("Updating devices for homeId:", homeId, "with:", updatedDevices)

  try {
    const updatedHome = await updateDevices(homeId, updatedDevices)
    if (updatedHome) {
      res.json({
        message: "Smart home devices updated successfully",
        updatedHome,
      })
    } else {
      res.status(404).json({ message: "Smart home not found" })
    }
  } catch (error) {
    console.error("Error updating smart home devices:", error)
    res.status(500).json({ message: "Error updating smart home devices" })
  }
})

route.get("/defaultMode", async (req, res) => {
  const { homeId } = req.body
  console.log("Getting devices for homeId:", homeId)

  try {
    const devices = await getDevices(homeId)
    if (!devices) {
      return res.status(404).json({ message: "Smart home not found" })
    }
    res.json({
      message: "Devices retrieved successfully",
      devices,
    })
  } catch (error) {
    console.error("Error in route when retrieving devices:", error)
    res.status(500).json({ message: "Error retrieving devices data" })
  }
})

export default route
