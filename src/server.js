import express from "express"
import cors from "cors"
const app = express()

import { connectToDB } from "./configs/db.js"

import dotenv from "dotenv"
dotenv.config()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
  console.log(`${req.method}  ${req.url}  `, req.body)
  next()
})

//app.use("/auth", authRouter)

app.listen(port, async () => {
  console.log("Server listening on PORT " + port)
})
