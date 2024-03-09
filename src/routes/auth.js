import { Router } from "express"
import { getUserByEmail, getUserPasswordForLogin } from "../models/homeUser.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
dotenv.config()

const route = Router()
const secretKey = process.env.SECRET_KEY
const aDay = 60 * 60 * 24

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
    const passwordVerfied = await bcrypt.compare(password, userPassword)

    if (!passwordVerfied) {
      return res.status(403).json({
        error: "Invalid login!",
      })
    }

    const token = jwt.sign({ user }, secretKey, { expiresIn: aDay })

    res.cookie("SmartHouseToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
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
