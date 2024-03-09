import { Router } from "express"
import { SmartHome } from "../models/smartDevices.js"
import { validateInput } from "../middleware/validateInput.js"
import { checkHomeId } from "../models/smartDevices.js"
import {
  getUserByEmail,
  createUserAccount,
  checkIfHomeIdHasOwner,
} from "../models/homeUser.js"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
dotenv.config()

const route = Router()
const saltRounds = 10

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

// register route for the OWNER - one per homeId
route.post("/registerOwner", validateInput, async function (req, res) {
  try {
    const { email, password, homeId } = req.body

    const homeIdExists = await checkHomeId(homeId)
    if (!homeIdExists) {
      console.error("HomeId does not exist")
      return res.status(400).json({
        message: "HomeId does not exist!",
      })
    }

    const hasOwner = await checkIfHomeIdHasOwner(homeId)
    if (hasOwner) {
      console.error("HomeId already has an owner")
      return res.status(400).json({
        message: "HomeId already has an owner",
      })
    }

    const userExists = await getUserByEmail(email)
    if (userExists) {
      console.error("User email already exists")
      return res.status(400).json({ message: "Email already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds)
    const createdUser = await createUserAccount({
      email,
      password: hashedPassword,
      role: "OWNER",
      homeId,
    })

    if (createdUser) {
      return res.status(200).json({
        message: "Owner account created!",
      })
    } else {
      console.error(`Could not create account: ${error.message}`)
      return res.status(500).json({
        message: "Could not create account",
      })
    }
  } catch (error) {
    console.error(`Unable to register: ${error.message}`)
    return res.status(500).json({
      message: "Could not create account",
    })
  }
})

export default route
