import express from "express"
const app = express()

import { connectToDB } from "./configs/db.js"

import dotenv from "dotenv"
dotenv.config()
const port = process.env.PORT || 5000

connectToDB()
app.set("view-engine", "ejs")
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use((req, res, next) => {
  console.log(`${req.method}  ${req.url}  `, req.body)
  next()
})
app.listen(port, async () => {
  console.log("Server listening on PORT " + port)
})

app.get("/", (req, res) => {
  req.method = "GET"
})
