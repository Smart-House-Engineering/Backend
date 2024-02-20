export function isHomeUser(req, res, next) {
  const { email, role } = req.cookies.SmartHouseToken
  if (!email || (role !== "OWNER" && role !== "TENANT")) {
    return res.status(401).json({
      message: "Unauthorized",
    })
  }
  next()
}

export function isExternalUser(req, res, next) {
  const { email, role } = req.cookies.SmartHouseToken
  if (!email || role !== "EXTERNAL") {
    return res.status(401).json({
      message: "Unauthorized",
    })
  }
  next()
}
