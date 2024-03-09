import { validatePassword } from "../middleware/validatePassword.js"
import EmailValidator from "email-validator"

export function validateNewUserInput(req, res, next) {
  const { newUserEmail, newUserPassword, newUserRole } = req.body

  if (!newUserEmail || !newUserPassword) {
    console.error("Invalid email, password")
    return res.status(400).json({
      message: "Invalid email, password",
    })
  }

  const validatedEmail = EmailValidator.validate(newUserEmail)
  if (!validatedEmail) {
    return res.status(400).json({
      message: "Email is not valid!",
    })
  }

  const validatedPassword = validatePassword(newUserPassword)
  if (!validatedPassword) {
    return res.status(400).json({
      message: "Password is not strong enough!",
    })
  }

  if (!newUserRole || (newUserRole != "EXTERNAL" && newUserRole != "TENANT")) {
    console.error("No user role provided")
    return res.status(400).json({
      message: "Invalid role! Required: TENANT or EXTERNAL",
    })
  }

  next()
}
