import { Router } from "express"
import { updateDevices } from "../models/smartDevices.js"

const route = Router()

route.put("/defaultMode", async (req, res) => {
  const { updatedDevices } = req.body
  const { homeId } = req.user
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

export default route
