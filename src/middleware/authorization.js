import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const secretKey = process.env.SECRET_KEY

export function isHomeUser(req, res, next) {
  const token = req.cookies.SmartHouseToken
  const decodedToken = jwt.verify(token, secretKey)
  console.log(decodedToken.user.role)
  if (!decodedToken.user.email || decodedToken.user.role !== "OWNER") {
    return res.status(401).json({
      message: "Unauthorized",
    })
  }
  next()
}

export function isExternalUser(req, res, next) {
  const token = req.cookies.SmartHouseToken
  const decodedToken = jwt.verify(token, secretKey)
  if (!decodedToken.user.email || decodedToken.user.role !== "EXTERNAL") {
    return res.status(401).json({
      message: "Unauthorized",
    })
  }
  next()
}
