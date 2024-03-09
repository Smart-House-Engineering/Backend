import { Router } from "express"
import { isAuthenticated } from "./middleware/authentication.js"
import { isHomeUser, isExternalUser } from "./middleware/authorization.js"
import authRoute from "./routes/auth.js"
import homeUserRoute from "./routes/user.js"
import externalUserRoute from "./routes/external.js"
import smartHomeRoutes from "./routes/smartHome.js"
import modes from "./routes/modes.js"

const routes = Router()

// Routes
routes.use("/auth", authRoute)
// Owner and tenant, primary users at home
routes.use("/api/homeUser", isAuthenticated, isHomeUser, homeUserRoute)
// external users, such as nurses, with less privileges
routes.use(
  "/api/externalUser",
  isAuthenticated,
  isExternalUser,
  externalUserRoute
)
routes.use("/api/modes", isAuthenticated, isHomeUser, modes)
routes.use("/api/smartHome", smartHomeRoutes)

export default routes
