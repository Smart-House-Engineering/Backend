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
import smartHomeRoutes from "./routes/smartHome.js"
import homeOwnerRoute from "./routes/owner.js"
import homeUserRoute from "./routes/homeUser.js"
import externalUserRoute from "./routes/external.js"
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
// TODO: move register here + rename the route
app.use("/api/smartHome", smartHomeRoutes)
// TODO: leave only login & logout
app.use("/auth", authRoute)

app.use("/api/owner", isAuthenticated, isHomeOwner, homeOwnerRoute)
app.use(
  "/api/homeUser",
  isAuthenticated,
  isHomeOwner,
  isHomeTenant,
  homeUserRoute
)
app.use("/api/externalUser", isAuthenticated, externalUserRoute)

// TODO: move to a more locical place
// getDefault -> external (for everyone to get info)
// updateDefault -> homeUser (for both owner and tenant can modify them)
app.use("/api/modes", isAuthenticated, isHomeOwner, modes)

// Database and Server connection
connectToDB()

app.listen(port, async () => {
  console.log("Server listening on PORT " + port)
})
