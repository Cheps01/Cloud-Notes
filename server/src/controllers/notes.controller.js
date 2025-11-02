import * as notesService from "../services/notes.service.js"

export const getAllNotes = async (req, res) => {
  try {
    const userId = req.user.uid
    const notes = await notesService.getUserNotes(userId)
    res.json({ success: true, data: notes })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

export const getNoteById = async (req, res) => {
  try {
    const userId = req.user.uid
    const noteId = req.params.id
    const note = await notesService.getNoteById(noteId, userId)

    if (!note) {
      return res.status(404).json({ success: false, error: "Note not found" })
    }

    res.json({ success: true, data: note })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

export const createNote = async (req, res) => {
  try {
    const userId = req.user.uid
    const { title, content } = req.body

    if (!title) {
      return res.status(400).json({ success: false, error: "Title is required" })
    }

    const note = await notesService.createNote(userId, title, content)
    res.status(201).json({ success: true, data: note })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

export const updateNote = async (req, res) => {
  try {
    const userId = req.user.uid
    const noteId = req.params.id
    const { title, content } = req.body

    const note = await notesService.updateNote(noteId, userId, title, content)

    if (!note) {
      return res.status(404).json({ success: false, error: "Note not found" })
    }

    res.json({ success: true, data: note })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

export const deleteNote = async (req, res) => {
  try {
    const userId = req.user.uid
    const noteId = req.params.id

    const success = await notesService.deleteNote(noteId, userId)

    if (!success) {
      return res.status(404).json({ success: false, error: "Note not found" })
    }

    res.json({ success: true, message: "Note deleted successfully" })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}
