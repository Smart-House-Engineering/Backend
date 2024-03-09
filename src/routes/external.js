import { Router } from "express"
const route = Router()

route.get("/test", async function (req, res) {
  console.log(req.user)
  return res.status(200).json({
    message: "Basic route, lowest priority, evveryone logged in can access",
  })
})

export default route
