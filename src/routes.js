import { Router } from "express"
import { isAuthenticated } from "./middleware/authentication.js"
import { isHomeOwner, isHomeUser } from "./middleware/authorization.js"
import authRoute from "./routes/auth.js"
import homeOwnerRoute from "./routes/owner.js"
import homeUserRoute from "./routes/homeUser.js"
import modes from "./routes/modes.js"
import smartHomeRoutes from "./routes/smartHome.js"

const routes = Router()

// Routes
app.use("/auth", authRoute)

// only the owner
app.use("/api/owner", isAuthenticated, isHomeOwner, homeOwnerRoute)
// people living at the same place tenant and owner
app.use("/api/homeUser", isAuthenticated, isHomeUser, homeUserRoute)
// all logged in user can access
app.use("/api/modes", isAuthenticated, modes)
// add home & register owner route for the "company"
app.use("/api/smartHome", smartHomeRoutes)

export default routes
