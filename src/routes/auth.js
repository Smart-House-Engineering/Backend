import { Router } from "express"
import { validatePassword } from "../middleware/validatePassword.js"
import {
  getUserByEmail,
  createUserAccount,
  getUserPasswordForLogin,
} from "../models/homeUser.js"
import { checkHomeId } from "../models/smartDevices.js"
import EmailValidator from "email-validator"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
dotenv.config()

const route = Router()
const secretKey = process.env.SECRET_KEY
const aDay = 60 * 60 * 24
const saltRounds = 10

// register route for the OWNER
route.post("/register", async function (req, res) {
  try {
    const { email, password, homeId } = req.body

    if (!email || !password || !homeId) {
      console.error("Invalid email, password, or homeId")
      return res.status(400).json({
        message: "Invalid email, password, or homeId",
      })
    }

    const homeIdExists = await checkHomeId(homeId)
    if (!homeIdExists) {
      console.error("HomeId does not exist")
      return res.status(400).json({
        message: "HomeId does not exist!",
      })
    }

    const validatedEmail = EmailValidator.validate(email)
    if (!validatedEmail) {
      return res.status(400).json({
        message: "Email is not valid!",
      })
    }

    const validatedPassword = validatePassword(password)
    if (!validatedPassword) {
      return res.status(400).json({
        message: "Password is not strong enough!",
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

// add an extra user
route.post("/addUser", async function (req, res) {
  try {
    const { email, password, homeId } = req.body

    if (!email || !password || !homeId) {
      console.error("Invalid email, password, or homeId")
      return res.status(400).json({
        message: "Invalid email, password, or homeId",
      })
    }

    const homeIdExists = await checkHomeId(homeId)
    if (!homeIdExists) {
      console.error("HomeId does not exist")
      return res.status(400).json({
        message: "HomeId does not exist!",
      })
    }

    const validatedEmail = EmailValidator.validate(email)
    if (!validatedEmail) {
      return res.status(400).json({
        message: "Email is not valid!",
      })
    }

    const validatedPassword = validatePassword(password)
    if (!validatedPassword) {
      return res.status(400).json({
        message: "Password is not strong enough!",
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
      role: "EXTERNAL",
      homeId,
    })

    if (createdUser) {
      return res.status(200).json({
        message: "External account created!",
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

route.post("/login", async function (req, res) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: "Email and/or password missing!" })
    }

    const user = await getUserByEmail(email)
    if (!user) {
      return res.status(404).json({ message: "User not found!" })
    }

    const userPassword = await getUserPasswordForLogin(email)
    const passwordVerfied = bcrypt.compare(password, userPassword)

    if (!passwordVerfied) {
      return res.status(403).json({
        error: "Invalid login!",
      })
    }
    const token = jwt.sign({ user }, secretKey, { expiresIn: aDay })

    res.cookie("SmartHouseToken", token, {
      httpOnly: true,
    })

    return res.status(200).json({ message: "Login successful" })
  } catch (error) {
    console.error(`Unable to login: ${error.message}`)
    return res.status(500).json({ error: "An unexpected error occurred" })
  }
})

route.post("/logout", async function (req, res) {
  try {
    res.clearCookie("SmartHouseToken")
    console.log("User logged out successfully")
    return res.status(200).json({ message: "Logout successful" })
  } catch (error) {
    console.error(`Unable to logout: ${error.message}`)
    return res.status(500).json({ error: "An unexpected error occurred" })
  }
})

export default route