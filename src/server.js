import express from "express"
const app = express()

import { connectToDB } from "./configs/db.js"

import dotenv from "dotenv"
dotenv.config()
const port = process.env.PORT || 5000

connectToDB()

app.listen(port, async () => {
  console.log("Server listening on PORT " + port)
})
