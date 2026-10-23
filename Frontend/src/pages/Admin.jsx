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
    <div className="min-h-screen bg-[#0d1520] text-white">
      {/* Header */}
      <div className="bg-[#121D27] px-10 py-6 flex justify-between items-center border-b border-[#c5a572]/30">
        <div>
          <h1 className="text-2xl font-serif text-[#c5a572]">☕ Coffee Shop — Admin Panel</h1>
          <p className="text-gray-400 text-sm mt-1">Welcome back, {user?.name || user?.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
        >
          Logout
        </button>
      </div>

      {/* Dashboard Cards */}
      <div className="px-10 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-[#121D27] border border-[#c5a572]/20 rounded-xl p-6">
            <p className="text-gray-400 text-sm">Role</p>
            <p className="text-2xl font-bold text-[#c5a572] mt-2 capitalize">{user?.role}</p>
          </div>
          <div className="bg-[#121D27] border border-[#c5a572]/20 rounded-xl p-6">
            <p className="text-gray-400 text-sm">Email</p>
            <p className="text-lg font-semibold mt-2 truncate">{user?.email}</p>
          </div>
          <div className="bg-[#121D27] border border-[#c5a572]/20 rounded-xl p-6">
            <p className="text-gray-400 text-sm">Status</p>
            <p className="text-lg font-semibold text-green-400 mt-2">✅ Logged In</p>
          </div>
        </div>

        <div className="bg-[#121D27] border border-[#c5a572]/20 rounded-xl p-8 text-center">
          <p className="text-4xl mb-4">🛠️</p>
          <h2 className="text-xl font-serif text-[#c5a572] mb-2">Admin Dashboard</h2>
          <p className="text-gray-400">Your admin panel content goes here — manage menu, bookings, blogs, etc.</p>
        </div>
      </div>
    </div>
  )
}

export default Admin