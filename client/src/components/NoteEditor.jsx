"use client"

import { useState, useEffect } from "react"

const NoteEditor = ({ note, onUpdate, onDelete }) => {
  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)
  const [isSaving, setIsSaving] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    setTitle(note.title)
    setContent(note.content)
  }, [note])

  const handleSave = async () => {
    if (title === note.title && content === note.content) {
      return
    }

    setIsSaving(true)
    try {
      await onUpdate(note.id, title, content)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    await onDelete(note.id)
    setShowDeleteConfirm(false)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="h-full flex flex-col">
      <div className="bg-dark-card border-b border-dark-border px-6 py-4 flex items-center justify-between">
        <div className="flex-1">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleSave}
            className="text-2xl font-semibold bg-transparent text-dark-text border-none outline-none w-full focus:ring-0"
            placeholder="Untitled Note"
          />
          <p className="text-sm text-dark-text-secondary mt-1">Created {formatDate(note.creationDate)}</p>
        </div>

        <div className="flex items-center gap-2">
          {isSaving && <span className="text-sm text-dark-text-secondary">Saving...</span>}
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            Save
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="text-red-500 hover:text-red-400 px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onBlur={handleSave}
          className="w-full h-full bg-transparent text-dark-text border-none outline-none resize-none focus:ring-0 text-lg leading-relaxed"
          placeholder="Start writing your note..."
        />
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-dark-card border border-dark-border rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold text-dark-text mb-2">Delete Note?</h3>
            <p className="text-dark-text-secondary mb-6">
              Are you sure you want to delete "{title || "Untitled Note"}"? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 rounded-lg border border-dark-border text-dark-text hover:bg-dark-bg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default NoteEditor
