import { Router } from "express"
import { updateDevices, getDevices } from "../models/smartDevices.js"

const route = Router()

route.get("/defaultMode", async (req, res) => {
  const { homeId } = req.user
  console.log("Getting devices for homeId:", homeId)
  console.log("Req", req.user)

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
