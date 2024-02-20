import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const secretKey = process.env.SECRET_KEY

export function isAuthenticated(req, res, next) {
  const token = req.cookies.SmartHouseToken
  if (token) {
    try {
      const decodedToken = jwt.verify(token, secretKey)
      req.user = {
        homeId: decodedToken.homeId,
        email: decodedToken.email,
        role: decodedToken.role,
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
