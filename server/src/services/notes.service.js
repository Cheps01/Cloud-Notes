import { db } from "../config/authConfig.js"

const NOTES_COLLECTION = "notes"

export const getUserNotes = async (userId) => {
  const notesRef = db.collection(NOTES_COLLECTION)
  const snapshot = await notesRef.where("userId", "==", userId).get()
  const notes = []
  snapshot.forEach((doc) => {
    notes.push({ id: doc.id, ...doc.data() })
  })

  return notes
}

export const getNoteById = async (noteId, userId) => {
  const noteRef = db.collection(NOTES_COLLECTION).doc(noteId)
  const doc = await noteRef.get()

  if (!doc.exists) {
    return null
  }

  const note = { id: doc.id, ...doc.data() }

  // Verify the note belongs to the user
  if (note.userId !== userId) {
    return null
  }

  return note
}

export const createNote = async (userId, title, content) => {
  const noteData = {
    userId,
    title,
    content,
    creationDate: new Date().toISOString(),
  }

  const docRef = await db.collection(NOTES_COLLECTION).add(noteData)

  return { id: docRef.id, ...noteData }
}

export const updateNote = async (noteId, userId, title, content) => {
  const noteRef = db.collection(NOTES_COLLECTION).doc(noteId)
  const doc = await noteRef.get()

  if (!doc.exists) {
    return null
  }

  const note = doc.data()

  // Verify the note belongs to the user
  if (note.userId !== userId) {
    return null
  }

  const updates = {}
  if (title !== undefined) updates.title = title
  if (content !== undefined) updates.content = content

  await noteRef.update(updates)

  return { id: noteId, ...note, ...updates }
}

export const deleteNote = async (noteId, userId) => {
  const noteRef = db.collection(NOTES_COLLECTION).doc(noteId)
  const doc = await noteRef.get()

  if (!doc.exists) {
    return false
  }

  const note = doc.data()

  // Verify the note belongs to the user
  if (note.userId !== userId) {
    return false
  }

  await noteRef.delete()
  return true
}
