import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

// ─────────────────────────────────────────────────────────────
//  Admin Page  –  Only accessible to users with role='admin'
//  (ProtectedRoute in App.jsx enforces this)
// ─────────────────────────────────────────────────────────────

const Admin = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
      <div className="">
        <button
          onClick={handleLogout}
          className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
        >
          Logout
        </button>
      </div>
  )
}

export default Admin