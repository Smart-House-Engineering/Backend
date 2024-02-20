import { Router } from "express"
const route = Router()

route.get("/test", async function (req, res) {
  return res.status(200).json({
    message: "Extrenal user route",
  })
})

export default route
