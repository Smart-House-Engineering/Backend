import express from "express"
const app = express()
import dotenv from "dotenv"
dotenv.config()
import cookieParser from "cookie-parser"
import cors from "cors"

import { connectToDB } from "./configs/db.js"
import { isAuthenticated } from "./middleware/authentication.js"
import { isHomeUser, isExternalUser } from "./middleware/authorization.js"
import authRoute from "./routes/auth.js"
import homeUserRoute from "./routes/user.js"
import externalUserRoute from "./routes/external.js"
import smartHomeRoutes from "./routes/smartHome.js"
import modes from "./routes/modes.js"

const port = process.env.PORT || 5000

// Middleware
app.use(cors({ origin: true, credentials: true }))
app.use(
  express.urlencoded({
    extended: true,
  })
)
app.use(express.json())
app.use(cookieParser())

// Routes
app.use("/auth", authRoute)
// Owner and tenant, primary users at home
app.use("/api/homeUser", isAuthenticated, isHomeUser, homeUserRoute)
// external users, such as nurses, with less privileges
app.use("/api/externalUser", isAuthenticated, isExternalUser, externalUserRoute)
app.use("/api/modes", isAuthenticated, isHomeUser, modes)
app.use("/api/smartHome", smartHomeRoutes)

// Database and Server connection
connectToDB()

app.listen(port, async () => {
  console.log("Server listening on PORT " + port)
})
