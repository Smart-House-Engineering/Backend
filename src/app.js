import express from "express"
import routes from "./routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()

// Create Express server
const app = express()

// Set PORT
app.set("port", process.env.PORT || 5000)

// Middleware
app.use(cors({ origin: true, credentials: true }))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

// Route Handlers
app.use("/", routes)

export default app
