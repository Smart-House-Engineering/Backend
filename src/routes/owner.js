import { Router } from "express"
import { checkHomeId } from "../models/smartDevices.js"
import { getUserByEmail, createUserAccount } from "../models/homeUser.js"
import { validateNewUserInput } from "../middleware/validateNewUserInput.js"
import bcrypt from "bcrypt"

const route = Router()
const saltRounds = 10

// add an extra user - TENANT or EXTERNAL - only for owner
route.post("/addUser", validateNewUserInput, async function (req, res) {
  try {
    const { homeId } = req.user
    const { newUserEmail, newUserPassword, newUserRole } = req.body

    const homeIdExists = await checkHomeId(homeId)
    if (!homeIdExists) {
      console.error("HomeId does not exist")
      return res.status(400).json({
        message: "HomeId does not exist!",
      })
    }

    const userExists = await getUserByEmail(newUserEmail)
    if (userExists) {
      console.error("User email already exists")
      return res.status(400).json({ message: "Email already exists" })
    }

    const hashedPassword = await bcrypt.hash(newUserPassword, saltRounds)
    const createdUser = await createUserAccount({
      email: newUserEmail,
      password: hashedPassword,
      role: newUserRole,
      homeId,
    })

    if (createdUser) {
      return res.status(200).json({
        message: newUserRole + " account created!",
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
