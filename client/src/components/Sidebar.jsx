"use client"

const Sidebar = ({ notes, selectedNote, onSelectNote, loading }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  if (loading) {
    return (
      <aside className="w-80 bg-dark-card border-r border-dark-border p-4">
        <div className="flex items-center justify-center h-full">
          <div className="text-dark-text-secondary">Loading notes...</div>
        </div>
      </aside>
    )
  }

  return (
    <aside className="w-80 bg-dark-card border-r border-dark-border flex flex-col">
      <div className="p-4 border-b border-dark-border">
        <h2 className="text-lg font-semibold text-dark-text">Your Notes</h2>
        <p className="text-sm text-dark-text-secondary mt-1">
          {notes.length} {notes.length === 1 ? "note" : "notes"}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {notes.length === 0 ? (
          <div className="p-4 text-center text-dark-text-secondary">No notes yet. Create your first note!</div>
        ) : (
          <div className="divide-y divide-dark-border">
            {notes.map((note) => (
              <button
                key={note.id}
                onClick={() => onSelectNote(note)}
                className={`w-full text-left p-4 hover:bg-dark-bg transition-colors ${
                  selectedNote?.id === note.id ? "bg-dark-bg border-l-4 border-primary" : ""
                }`}
              >
                <h3 className="font-medium text-dark-text truncate mb-1">{note.title || "Untitled Note"}</h3>
                <p className="text-sm text-dark-text-secondary truncate mb-2">{note.content || "No content"}</p>
                <p className="text-xs text-dark-text-secondary">{formatDate(note.creationDate)}</p>
              </button>
            ))}
          </div>
        )}
      </div>
    </aside>
  )
}

export default Sidebar
