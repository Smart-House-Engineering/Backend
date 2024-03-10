import dotenv from "dotenv"
dotenv.config()
import app from "./app.js"
import http from "http"
import { Server } from "socket.io"
import { socketHandler } from "./socketHandler.js"
import { connectToDB } from "./configs/db.js"

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
})

connectToDB()
socketHandler(io)

server.listen(app.get("port"), () => {
  console.log(`Server is up on port ${app.get("port")}!`)
})
