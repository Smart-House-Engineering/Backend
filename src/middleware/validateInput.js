import { validatePassword } from "../middleware/validatePassword.js"
import EmailValidator from "email-validator"

export function validateInput(req, res, next) {
  const { email, password, homeId } = req.body

  if (!email || !password || !homeId) {
    console.error("Invalid email, password, or homeId")
    return res.status(400).json({
      message: "Invalid email, password, or homeId",
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

  next()
}
