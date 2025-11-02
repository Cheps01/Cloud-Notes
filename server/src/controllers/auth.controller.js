import * as authService from "../services/auth.service.js"

export const register = async (req, res) => {
  try {
    const { email, password, username } = req.body

    if (!email || !password || !username) {
      return res.status(400).json({
        success: false,
        error: "Email, password, and username are required",
      })
    }

    const user = await authService.registerUser(email, password, username)
    res.status(201).json({ success: true, data: user })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Email and password are required",
      })
    }

    // Note: Actual authentication is handled by Firebase client SDK
    // This endpoint is for additional server-side validation if needed
    res.json({
      success: true,
      message: "Use Firebase client SDK for authentication",
    })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
}

export const verifyUser = async (req, res) => {
  try {
    const user = await authService.getUserById(req.user.uid)
    res.json({ success: true, data: user })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}
