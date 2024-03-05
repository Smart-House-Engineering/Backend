import { Router } from "express"
import { checkHomeId } from "../models/smartDevices.js"
import {
  checkIfHomeIdHasOwner,
  addHomeIdToUserByEmail,
} from "../models/homeUser.js"

const route = Router()

route.post("/addHome", async function (req, res) {
  try {
    const { email } = req.user
    const { homeId } = req.body

    const homeIdExists = await checkHomeId(homeId)
    if (!homeIdExists) {
      console.error("HomeId does not exist")
      return res.status(400).json({
        message: "HomeId does not exist!",
      })
    }

    const hasOwner = await checkIfHomeIdHasOwner(homeId)
    if (!hasOwner) {
      console.error("HomeId has no owner")
      return res.status(400).json({
        message: "HomeId has no owner",
      })
    }

    const homeAdded = await addHomeIdToUserByEmail(email, homeId)
    if (homeAdded) {
      return res.status(200).json({
        message: homeId + " added!",
      })
    } else {
      console.error(`Could not add home: ${error.message}`)
      return res.status(500).json({
        message: "Could not add home",
      })
    }
  } catch (error) {
    console.error(`Unable to add home: ${error.message}`)
    return res.status(500).json({
      message: "Could not add home",
    })
  }
})

export default route
