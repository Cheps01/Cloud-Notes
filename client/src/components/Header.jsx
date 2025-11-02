"use client"

import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const Header = ({ onCreateNote }) => {
  const { logout, currentUser } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      navigate("/login")
    } catch (err) {
      console.error("Failed to log out", err)
    }
  }

  return (
    <header className="bg-dark-card border-b border-dark-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-dark-text">Cloud Notes</h1>
          <button
            onClick={onCreateNote}
            className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Note
          </button>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-dark-text-secondary">{currentUser?.email}</span>
          <button onClick={handleLogout} className="text-dark-text-secondary hover:text-dark-text transition-colors">
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
