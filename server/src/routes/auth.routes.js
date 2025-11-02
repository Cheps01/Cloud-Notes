import express from "express"
import { register, login, verifyUser } from "../controllers/auth.controller.js"
import { verifyToken } from "../middleware/auth.middleware.js"

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.get("/verify", verifyToken, verifyUser)

export default router
