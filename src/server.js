import express from "express"
const app = express()
import dotenv from "dotenv"
dotenv.config()
import cookieParser from "cookie-parser"
import cors from "cors"
import { createServer } from "http"
import { Server } from "socket.io"

import { connectToDB } from "./configs/db.js"
import { isAuthenticated } from "./middleware/authentication.js"
import { isHomeUser, isExternalUser } from "./middleware/authorization.js"
import authRoute from "./routes/auth.js"
import homeUserRoute from "./routes/user.js"
import externalUserRoute from "./routes/external.js"
import smartHomeRoutes from "./routes/smartHome.js"
import modes from "./routes/modes.js"

const port = process.env.PORT || 5000

// Websocket initialization
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
})

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

// WebSocket connection
io.on("connection", socket => {
  console.log("A client connected")

  // Emit a message back to the client upon connection
  socket.emit("message", "Hello from server!")

  // Handle events from the client
  socket.on("connect", data => {
    console.log("Received data from client:", data)
  })

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected")
  })
})

httpServer.listen(4000, () => {
  console.log("Socket listening on PORT " + 4000)
})
