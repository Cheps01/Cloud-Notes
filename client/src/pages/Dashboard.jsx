"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import apiService from "../services/api.service"
import Sidebar from "../components/Sidebar"
import NoteEditor from "../components/NoteEditor"
import Header from "../components/Header"

const Dashboard = () => {
  const [notes, setNotes] = useState([])
  const [selectedNote, setSelectedNote] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const { getToken } = useAuth()

  useEffect(() => {
    // Set token getter for API service
    apiService.setTokenGetter(getToken)
    loadNotes()
  }, [getToken])

  const loadNotes = async () => {
    try {
      setLoading(true)
      const response = await apiService.getNotes()
      setNotes(response.data)

      // Select first note if available
      if (response.data.length > 0 && !selectedNote) {
        setSelectedNote(response.data[0])
      }
    } catch (err) {
      setError("Failed to load notes")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateNote = async () => {
    try {
      const response = await apiService.createNote("Untitled Note", "")
      const newNote = response.data
      setNotes([newNote, ...notes])
      setSelectedNote(newNote)
    } catch (err) {
      setError("Failed to create note")
      console.error(err)
    }
  }

  const handleSelectNote = (note) => {
    setSelectedNote(note)
  }

  const handleUpdateNote = async (id, title, content) => {
    try {
      const response = await apiService.updateNote(id, title, content)
      const updatedNote = response.data

      setNotes(notes.map((note) => (note.id === id ? updatedNote : note)))
      setSelectedNote(updatedNote)
    } catch (err) {
      setError("Failed to update note")
      console.error(err)
    }
  }

  const handleDeleteNote = async (id) => {
    try {
      await apiService.deleteNote(id)
      const updatedNotes = notes.filter((note) => note.id !== id)
      setNotes(updatedNotes)

      // Select another note or clear selection
      if (selectedNote?.id === id) {
        setSelectedNote(updatedNotes.length > 0 ? updatedNotes[0] : null)
      }
    } catch (err) {
      setError("Failed to delete note")
      console.error(err)
    }
  }

  return (
    <div className="h-screen flex flex-col bg-dark-bg">
      <Header onCreateNote={handleCreateNote} />

      {error && <div className="bg-red-500/10 border-b border-red-500 text-red-500 px-4 py-3">{error}</div>}

      <div className="flex-1 flex overflow-hidden">
        <Sidebar notes={notes} selectedNote={selectedNote} onSelectNote={handleSelectNote} loading={loading} />

        <main className="flex-1 overflow-hidden">
          {selectedNote ? (
            <NoteEditor note={selectedNote} onUpdate={handleUpdateNote} onDelete={handleDeleteNote} />
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <svg
                  className="mx-auto h-12 w-12 text-dark-text-secondary mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h3 className="text-xl font-medium text-dark-text mb-2">No note selected</h3>
                <p className="text-dark-text-secondary">
                  {notes.length === 0 ? "Create a new note to get started" : "Select a note from the sidebar"}
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default Dashboard
