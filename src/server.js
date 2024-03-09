import express from "express"
const app = express()
import dotenv from "dotenv"
dotenv.config()
import cookieParser from "cookie-parser"
import cors from "cors"

import { connectToDB } from "./configs/db.js"
import { isAuthenticated } from "./middleware/authentication.js"
import { isHomeOwner, isHomeTenant } from "./middleware/authorization.js"
import authRoute from "./routes/auth.js"
import homeOwnerRoute from "./routes/owner.js"
import homeUserRoute from "./routes/homeUser.js"
import modes from "./routes/modes.js"
import smartHomeRoutes from "./routes/smartHome.js"

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

// only the owner
app.use("/api/owner", isAuthenticated, isHomeOwner, homeOwnerRoute)
// people living at the same place
app.use(
  "/api/homeUser",
  isAuthenticated,
  isHomeOwner,
  isHomeTenant,
  homeUserRoute
)
// all logged in user can access
app.use("/api/modes", isAuthenticated, modes)
// add home & register owner route for the "company"
app.use("/api/smartHome", smartHomeRoutes)

// Database and Server connection
connectToDB()

app.listen(port, async () => {
  console.log("Server listening on PORT " + port)
})
