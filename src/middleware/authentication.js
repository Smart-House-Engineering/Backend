import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const secretKey = process.env.SECRET_KEY

export function isAuthenticated(req, res, next) {
  const token = req.cookies.SmartHouseToken
  console.log("token", token)

  if (token) {
    try {
      const decodedToken = jwt.verify(token, secretKey)

      req.user = {
        homeId: decodedToken.user.homeId,
        email: decodedToken.user.email,
        role: decodedToken.user.role,
      }
      next()
    } catch (error) {
      console.error("Token verification error:", error)
      res.status(401).json({ message: "Unauthorized" })
    }
  } else {
    res.status(401).json({ message: "Unauthorized" })
  }
}
