export function isHomeOwner(req, res, next) {
  const { email, role } = req.user
  if (!email || role !== "OWNER") {
    return res.status(401).json({
      message: "Unauthorized",
    })
  }
  next()
}

export function isHomeTenant(req, res, next) {
  const { email, role } = req.user
  if (!email || role !== "TENANT") {
    return res.status(401).json({
      message: "Unauthorized",
    })
  }
  next()
}

export function isExternalUser(req, res, next) {
  const { email, role } = req.user
  if (!email || role !== "EXTERNAL") {
    return res.status(401).json({
      message: "Unauthorized",
    })
  }
  next()
}
