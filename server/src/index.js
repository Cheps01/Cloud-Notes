import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import notesRoutes from "./routes/notes.routes.js"
import authRoutes from "./routes/auth.routes.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8080

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/notes", notesRoutes)

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Cloud Notes API is running" })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
