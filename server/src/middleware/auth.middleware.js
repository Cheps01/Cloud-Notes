import { auth } from "../config/authConfig.js"

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        error: "No token provided",
      })
    }

    const token = authHeader.split("Bearer ")[1]

    const decodedToken = await auth.verifyIdToken(token)
    req.user = decodedToken
    next()
  } catch (error) {
    res.status(401).json({
      success: false,
      error: "Invalid or expired token",
    })
  }
}
