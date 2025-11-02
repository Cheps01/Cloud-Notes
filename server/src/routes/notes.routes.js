import express from "express"
import { getAllNotes, getNoteById, createNote, updateNote, deleteNote } from "../controllers/notes.controller.js"
import { verifyToken } from "../middleware/auth.middleware.js"

const router = express.Router()

// All routes require authentication
router.use(verifyToken)

router.get("/", getAllNotes)
router.get("/:id", getNoteById)
router.post("/", createNote)
router.put("/:id", updateNote)
router.delete("/:id", deleteNote)

export default router
