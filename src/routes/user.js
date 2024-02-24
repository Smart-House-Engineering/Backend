import { Router } from "express"
const route = Router()

route.get("/test", async function (req, res) {
  return res.status(200).json({
    message: "User route",
  })
})

export default route
