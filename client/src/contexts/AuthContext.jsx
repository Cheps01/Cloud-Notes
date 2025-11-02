"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth"
import { auth } from "../config/authConfig.js"

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const register = async (email, password, username) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)

    // Register user data on backend
    const token = await userCredential.user.getIdToken()
    await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email, password, username }),
    })

    return userCredential
  }

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = () => {
    return signOut(auth)
  }

  const getToken = async () => {
    if (currentUser) {
      return await currentUser.getIdToken()
    }
    return null
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    register,
    login,
    logout,
    getToken,
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
